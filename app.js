const fs = require('fs');
const request = require('request');

const url1 = 'https://api.quadrigacx.com/v2/ticker?book=btc_cad';
const url2 = 'https://api.quadrigacx.com/v2/ticker?book=eth_btc';
const url3 = 'https://api.quadrigacx.com/v2/ticker?book=eth_cad';

setInterval(callTickerData, 60000);

function callTickerData() {
  request.get(url1, (error, response, body) => {
    json = JSON.parse(body);
    date = new Date().toISOString();
    let template = `${date},btc_cad,${json.last},${json.ask},${json.bid},${json.volume}`;
    writeLog(template);
  });
  request.get(url2, (error, response, body) => {
    json = JSON.parse(body);
    date = new Date().toISOString();
    let template = `${date},eth_btc,${json.last},${json.ask},${json.bid},${json.volume}`;
    writeLog(template);
  });
  request.get(url3, (error, response, body) => {
    json = JSON.parse(body);
    date = new Date().toISOString();
    let template = `${date},eth_cad,${json.last},${json.ask},${json.bid},${json.volume}`;
    writeLog(template);
  });
}

function writeLog(logStr) {
  let currentDate = new Date();
  let logName = currentDate.toDateString().replace(/ /g, '-');
  const logFile = `./logs/${logName}.csv`;

  checkCreateLog(logFile);

  fs.appendFile(logFile, logStr + '\n', function (err) {
    if (err) throw err;
  });
}

function checkCreateLog(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.appendFile(filePath, 'Date,Pair,Price,Ask,Bid,Volume\n', function (err) {
      if (err) throw err;
    });
  }
}
