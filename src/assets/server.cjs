const express = require('express');

const mysql = require('mysql2');
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
    database: 'ln_user_db'
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


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})