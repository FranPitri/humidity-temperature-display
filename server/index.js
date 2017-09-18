const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const dbConfig = require('./config')
const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
})

app.use(cors())

app.get('/', function (req,res){ res.send('hola') })

app.get('/getData', function (req, res) {
    connection.query('SELECT temperature, humidity, time FROM Logs ORDER BY time DESC LIMIT 1;', function (err, rows) {
        if (err) throw err;
        res.json({
            temperature: rows[0].temperature,
            humidity: rows[0].humidity,
            time: rows[0].time
        })
    })
})




app.listen(8000, function () {
    console.log('Listening on port 8000!')
})