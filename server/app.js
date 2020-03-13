const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();


app.use(morgan('dev'));

app.use((req, res, next) => {
// write your logging code here

});

app.get('/', (req, res) =>{
// write your code to respond "ok" here
res.status(200).send('OK')
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
 res.status(200).send("logs")
});

module.exports = app;
