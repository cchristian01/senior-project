require('dotenv').config();

const express = require('express');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, './.env')});


const mysql = require('mysql2');
const mysql2 = require('mysql2/promise')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const {sendEmail} = require('./sendEmail.cjs')



const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongoDB = mongoose.connection;
mongoDB.once('open', () => console.log('MongoDB connected for chat'));

const { Schema, model } = mongoose;
const messageSchema = new Schema({
    senderName: String,
    receiverName: String,
    content: String,
    timestamp: {type: Date, default: Date.now},
    delivered: {type: Boolean, default: false},

});

const Message = model('Message', messageSchema);

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET','POST']
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    const socketToUser = new Map();

    socket.on('user_connected', async (username) => {
        if(!username || typeof username !== 'string') return;

        onlineUsers.set(username, socket.id);
        socketToUser.set(socket.id, username);
        console.log(`User '${username}' is online`);


        const undelivered = await Message.find({receiverUsername: username, delivered: false});
        for(const msg of undelivered) {
            socket.emit('receive_message', msg);
            msg.delivered = true;
            await msg.save();
        }
    });

    socket.on('send_message', async({senderUsername, receiverUsername, content}) => {
        if(!senderUsername || !receiverUsername || !content) return;

        const message = await Message.create({senderUsername, receiverUsername, content});
        const receiverSocket = onlineUsers.get(receiverUsername);
        if(receiverSocket) {
            io.to(receiverSocket).emit('receive_message', message);
            message.delivered = true;
            await message.save();

            
        }
    });

    socket.on('disconnect', () => {
        const username = socketToUser.get(socket.id);
        if(username){
            onlineUsers.delete(username);
            socketToUser.delete(socket.id);
            console.log(`User '${username}' disconnected`);
        } 
        else {
            console.log(`Socket disconnected: ${socket.id}`);
        }
    });
});




const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlpwd224/YC',
    database: 'ln_remote_db',
 
});

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'sqlpwd224/YC',
    database: 'ln_remote_db',
    waitForConnections: true,
    connectionLimit: 15
});


db.connect((err) => {
    if(err) {
        console.log('Database connection error: ', err);
    }
    else {
        console.log('Connected to MySQL database');
    }
});


app.post('/api/login', (req, res) => {
    const {username, password} = req.body;

    const query = 'SELECT * FROM ln_users WHERE ln_username = ?';
    db.query(query, [username], (err, results) => {
        if(err) {
            
            return res.status(500).json({message: 'Error querying database' });
        }
        if(results.length === 0) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const user = results[0];
      
        bcrypt.compare(password, user.ln_pwd, (err, isMatch) => {
            if(err) {
                return res.status(500).json({message: 'Error comparing passwords' });
            }
            if(!isMatch) {
                return res.status(400).json({message: 'Invalid credentials'});
            }

            const token = jwt.sign({userId: user.id, username: user.ln_username}, 'jwt_secret_20', {
                expiresIn: '1h',
            });

            return res.json({message: 'Login successful', token });
        });
    });
});



app.post('/api/signup', (req, res) => {
    const { username, email, password, password2 } = req.body;
    if(password != password2) {
        return res.status(400).json({message: 'Passwords do not match'});

    }

    const checkUserQuery = 'SELECT * FROM ln_users WHERE ln_email = ?';
    const checkUserQuery2 = 'SELECT * FROM ln_users WHERE ln_username = ?';
    db.query(checkUserQuery, [email], (err, results) => {
        if(err) {
            return res.status(500).json({message: 'Error querying database'});
        }
        if(results.length > 0) {
            return res.status(400).json({message: 'Email already exists'});
        }
        
        db.query(checkUserQuery2, [username], (err, results) => {

            if(err) {
                return res.status(500).json({message: 'Error querying database'});

            }
            if(results.length > 0) {
                return res.status(400).json({message: 'Username already exists'});
            }

        

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if(err) {
                return res.status(500).json({message: 'Error hashing password'});
            }

            const insertUserQuery = 'INSERT INTO ln_users(ln_username, ln_email, ln_pwd) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [username, email, hashedPassword], (err, results) => {
                if(err) {
                    return res.status(500).json({message: 'Error inserting user data'});
                }
                res.status(201).json({message: 'User created successfully'});
            });
        });

        });
    });



});


app.post('/api/query-chain', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { subj, path, user } = req.body; // data sent from React

    // 🔹 1st Query
    const [rows1] = await connection.execute(
      'SELECT * FROM ln_subjects WHERE subject_name = ?',
      [subj]
    );
    const subjId = rows1[0]?.id;
    if (!subjId) return res.status(404).json({ error: 'Subject not found' });

    // 🔹 2nd Query
    const [rows2] = await connection.execute(
      'SELECT * FROM ln_paths WHERE path_name = ?',
      [path]
    );
    const pathId = rows2[0]?.id;

    // 🔹 3rd Query
    const [rows3] = await connection.execute(
      'SELECT * FROM ln_users WHERE ln_username = ?',
      [user]
    );
    const userId = rows3[0]?.id;

    // 🔹 4th Query using all previous data
    const [finalResult] = await connection.execute(
      'SELECT * FROM ln_progress WHERE progress_user_id = ? AND progress_path_id = ? AND progress_subject_id = ? ',
      [userId, pathId, subjId]
    );

    res.json({
      subjId,
      pathId,
      userId,
      result: finalResult
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release(); // release back to pool
  }
});


app.post('/api/update-score', async (req, res) => {
    const {subj, path, user, newScore, update} = req.body;
    const connection = await pool.getConnection();
    try {

        const [rows1] = await connection.execute(
            'SELECT * FROM ln_subjects WHERE id = ?',
            [subj]
        );
        const subjPoints = rows1[0]?.subject_total_points;

        const [rows2] = await connection.execute(
            'SELECT * FROM ln_paths WHERE id = ?',
            [path]
        );
        const pathPoints = rows2[0]?.path_total_points;
        const subjPercentage = parseFloat(newScore/subjPoints);


        const pathPercentage = parseFloat(newScore/pathPoints);
    if(update) {
    const [insert] = await connection.execute(
        'INSERT INTO ln_progress VALUES(?,?,?,?,?,?)',
        [user, path, subj, newScore, subjPercentage, pathPercentage ]
    
    );
}
else {
    const [updatePointsVal] = await connection.execute(
        'UPDATE ln_progress SET points_earned = ? WHERE progress_user_id = ? AND progress_path_id = ? AND progress_subject_id = ?',
        [newScore, user, path, subj]
    );

    const [updateSubjVal] = await connection.execute(
        'UPDATE ln_progress SET subject_value = ? WHERE progress_user_id = ? AND progress_path_id = ? AND progress_subject_id = ?',
        [subjPercentage, user, path, subj]
    );
    const [updatePathVal] = await connection.execute(
        'UPDATE ln_progress SET path_value = ? WHERE progress_user_id = ? AND progress_path_id = ? AND progress_subject_id = ?',
        [pathPercentage, user, path, subj]
    );
}

    }
    catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    connection.release(); 
  }

});


app.post('/api/chat-search', async(req, res) => {
        const {search_val} = req.body; 
    const connection = await pool.getConnection();
    try {
        [rows1] = await connection.execute(
            'SELECT ln_username FROM ln_users WHERE ln_username LIKE ? ',
            [`%${search_val}%`]
        );


        res.json(rows1
        );
    }
    catch(err) {
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }finally {
        connection.release();
    }

});


app.get('/api/get-leaders', async (req, res) => {
    const connection = await pool.getConnection();
    try{

        const [rows] = await connection.execute(
            'SELECT ln_username, ln_score FROM ln_users ORDER BY ln_score DESC LIMIT 5'
        );
        res.json(rows);
    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Sever Error'});
    }finally{
        connection.release();
    }
});

app.post('/api/get-percentage', async(req, res) => {
    const {name, path} = req.body;
    const connection = await pool.getConnection();
    try {
    const [rows1] = await connection.execute(
        'SELECT * FROM ln_users WHERE ln_username = ?',
        [name]
    );

    const user_id = rows1[0]?.id;

    const [rows2] = await connection.execute(
        'SELECT * FROM ln_paths WHERE path_name = ?',
        [path]
    );

    const path_id = rows2[0]?.id;

    const [rows3] = await connection.execute(
        'SELECT * FROM ln_progress WHERE progress_user_id = ? AND progress_path_id = ? LIMIT 1',
        [user_id, path_id]
    );
        res.json(rows3);
    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }
    finally {
        connection.release();
    }
});

app.post('/api/get-score', async (req, res) => {
    const {name} = req.body;
    const connection = await pool.getConnection();
    try{

        const [rows] = await connection.execute(
            'SELECT ln_score FROM ln_users WHERE ln_username = ?',
            [name]
        );

        res.json(rows);
    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }finally{
        connection.release();
    }
});

app.post('/api/new-user-score', async (req, res) => {
    const {name} = req.body;
    const connection = await pool.getConnection();
    try{

        [rows1] = await connection.execute(
            'SELECT id FROM ln_users WHERE ln_username = ?',
            [name]
        );
        const id = rows1[0]?.id;

        [rows2] = await connection.execute(
            'SELECT SUM(points_earned) AS "score" FROM ln_progress WHERE progress_user_id = ?',
            [id]
        );

        const score = rows2[0]?.score;

        [rows3] = await connection.execute(
            'UPDATE ln_users SET ln_score = ? WHERE ln_username = ?',
            [score, name]
        );
        res.json(score);
    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Sever Error'});
    }finally{
        connection.release();
    }
});


app.post("/forgot-password", async (req, res) => {
     const {mail} = req.body;
    const connection = await pool.getConnection();
    try{

        const [rows] = await connection.execute(
            'SELECT * FROM ln_users WHERE ln_email = ?',
            [mail]
        );
        const userEmail = rows[0]?.ln_email;
        console.log(process.env.JWT_SECRET);
        const user = rows[0];
        if(!userEmail) return res.status(400).json("Email not found");
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "15m"});
        const link =  `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await sendEmail(userEmail, "Reset Password", `<a href="${link}">{link}</a>`);
        res.json("Reset email sent!");

    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }finally{
        connection.release();
    }
});



app.post("/reset-password/:token", async (req, res) => {
     const {name, password} = req.body;
    const connection = await pool.getConnection();
    try{
        const {id} = jwt.verify(req.params.token, process.env.JWT_SECRET);

        const [rows] = await connection.execute(
            'SELECT * FROM ln_users WHERE ln_username = ?',
            [name]
        );
       const user = rows[0];
        if (!user) return res.status(400).json("User not found");
        const newPassword = await bcrypt.hash(password, 10);
        const [rows1] = await connection.execute(
            'UPDATE ln_users SET ln_pwd = ? WHERE ln_username = ?',
            [newPassword, name]
        );
        res.json("Password Updated!");

    }
    catch(err){
        console.log('Error: ', err.message);
        res.status(500).json({error: 'Internal Server Error'});
    }finally{
        connection.release();
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});