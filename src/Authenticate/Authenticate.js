const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'FourLetters';

let result=[];
MongoClient.connect(url, (err, client)=> {
    client.db(dbName).collection('Temp').find({}).limit(10).toArray().then( items =>{
          result =items;
          console.log(items);
      }).catch(error =>{
        console.log("error",error);
      });
    
    });
var http = require('http');
const data ={"Title":"First Response json","Message":"Hello Bub"};
http.createServer(function (req, res) {

res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Request-Method', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
res.setHeader('Access-Control-Allow-Headers', '*');
  res.writeHead(200, {'Content-Type': 'text/json'});
  res.write(JSON.stringify(result));
  res.end();
}).listen(8080);
