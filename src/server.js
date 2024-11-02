const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Watsachol1110',   
    database: 'numerDB'  
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});



app.get('/api/data', (req, res) => {
    const sqlQuery = 'SELECT * FROM NumerFormula';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});


app.get('/api/data/search', (req, res) => {
    const { name, id_fomula } = req.query;


    if (!name || !id_fomula) {
        return res.status(400).send('Name and id_fomula are required');
    }

    const sqlQuery = 'SELECT * FROM NumerFormula WHERE name = ? AND id_fomula = ?';
    db.query(sqlQuery, [name, id_fomula], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        

        if (results.length > 0) {
            return res.json(results[0]); 
        } else {
            return res.status(404).send('No formula found for the provided id and id_fomula');
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
