const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const loggerFile = './server/log.csv';
const chalk = require('chalk');


const app = express();


app.use(morgan('dev'));

var log = [];

var logger = {
    Agent:'',
    Time:'',
    Method:'',
    Resource:'',
    Version:'',
    Status:''
  }

app.use((req, res, next) => {
// write your logging code here

// found each specific piece of log data to display in console below
var agent = req.headers['user-agent']
console.log("agent -", (chalk.yellowBright(agent)));

var time = new Date().toISOString();
console.log("time -",(chalk.greenBright(time)));

var method = req.method;
console.log("method -", (chalk.cyanBright(method)));

var resource = req.originalUrl;
console.log("resource -",(chalk.blueBright(resource)));


var version = req.protocol;
console.log("version -",(chalk.magentaBright(version)));

var status = res.statusCode;
console.log("status -", (chalk.whiteBright(status)));

// mimicking how data needs to display below
var logData =(`${agent},${time},${method},${resource},${version},${status}`);
console.log(logData);


// appends data to log file
fs.appendFile(loggerFile, agent +', ', function (err) {
  if (err) throw err;
    console.log('Saved!');
});

fs.appendFile(loggerFile, time +', ', function (err) {
if (err) throw err;
console.log('Saved!');
  });

fs.appendFile(loggerFile, method +', ', function (err) {
if (err) throw err;
  console.log('Saved!');
  });

fs.appendFile(loggerFile, resource +', ', function (err) {
if (err) throw err;
  console.log('Saved!');
  });

fs.appendFile(loggerFile, version +', ', function (err) {
if (err) throw err;
  console.log('Saved!');
  });

fs.appendFile(loggerFile, status, function (err) {
if (err) throw err;
  console.log('Saved!');
  });


next();
});


app.get('/', (req, res) =>{
// write your code to respond "ok" here
res.status(200).send('OK')
});


app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
res.json([loggerFile])


res.status(200).send("logs");
});

module.exports = app;
