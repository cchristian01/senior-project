const express = require('express');

const mysql = require('mysql2');
const mysql2 = require('mysql2/promise')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


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
    connectionLimit: 10
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

        const [rows3] = await connection.execute(
            'SELECT SUM(points_earned) AS current_points FROM ln_progress WHERE progress_user_id = ? AND progress_path_id = ?',
            [user, path]
        );
        const points_sum = rows3[0]?.current_points;
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})