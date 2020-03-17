const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const chalk = require('chalk');
const loggerFile = './server/log.csv';
const csvtojson = require('csvtojson');


const app = express();


app.use(morgan('dev'));


app.use((req, res, next) => {
  // write your logging code here

  // found each specific piece of log data to display in console below:
  var agent = req.headers['user-agent'].replace(',');
  console.log("agent -", (chalk.yellowBright(agent)));

  var time = new Date().toISOString();
  console.log("time -", (chalk.greenBright(time)));

  var method = req.method;
  console.log("method -", (chalk.cyanBright(method)));

  var resource = req.originalUrl;
  console.log("resource -", (chalk.blueBright(resource)));

  var version = req.protocol;
  console.log("version -", (chalk.magentaBright(version)));

  var status = res.statusCode;
  console.log("status -", (chalk.whiteBright(status)));

  // mimicking in console how data needs to display in log file :
  var logData = (`${agent},${time},${method},${resource},${version},${status}`);
  console.log(logData);


  // appends data to log file:
  fs.appendFile(loggerFile, agent + ',', function (err) {
    if (err) throw err;
    console.log('Agent Saved!');
  });

  fs.appendFile(loggerFile, time + ',', function (err) {
    if (err) throw err;
    console.log('Time Saved!');
  });

  fs.appendFile(loggerFile, method + ',', function (err) {
    if (err) throw err;
    console.log('Method Saved!');
  });

  fs.appendFile(loggerFile, resource + ',', function (err) {
    if (err) throw err;
    console.log('Resource Saved!');
  });

  fs.appendFile(loggerFile, version + ',', function (err) {
    if (err) throw err;
    console.log('Version Saved!');
  });

  fs.appendFile(loggerFile, status +'\n', function (err) {
    // indent after status value is needed to create new json row log data
    if (err) throw err;
    console.log('Status Saved!');
  });


  next();
});


app.get('/', (req, res) => {
  // write your code to respond "ok" here

  res.status(200).send('OK')
});


app.get('/logs', (req, res) => {
  // write your code to return a json object containing the log data here

  // utf8 converted raw buffer data to string of text
  fs.readFile('./server/log.csv', 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    // console.log(data);

    // converts csv to json:
csvtojson().fromFile(loggerFile).then(data => {
    console.log(data);
     res.status(200).send(data);
     res.end()
      });
   });
})

module.exports = app;
