/*const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME  
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


module.exports = (req, res) => {

    cors()(req, res, () => {
        if (req.method === 'GET' && req.url === '/api/data') {
            const sqlQuery = 'SELECT * FROM NumerFormula';
            db.query(sqlQuery, (err, results) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(results);
                }
            });
        } else if (req.method === 'GET' && req.url.startsWith('/api/data/search')) {
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
        } else {
            res.status(404).send('Endpoint not found');
        }
    });
};
*/