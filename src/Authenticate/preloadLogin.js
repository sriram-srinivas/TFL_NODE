const express = require('express');
const app = express();
const cors = require('cors');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(cookieParser());
app.use(session({
    genid: req => uuidv4(),
    secret:  "TFLA",
    resave: true,
    saveUninitialized: true,
    uniqueID:1,
    cookie: { path:'/',
    _expires: null,
    originalMaxAge: null,
    httpOnly: true,
    secure: false}
}));

const url = 'mongodb://localhost:27017';
const dbName = 'frameworkConfigDB';
const collectionName = 'MarkConfig'; 

app.get('/preLoadLogin',(req,res) =>{
    let uniqueID = req.session.uniqueID;
    console.log("start",req.session.uniqueID,req.sessionID);
    let originURL =req.headers.origin.toString();
    const pattern="(?<=http:\/\/)(.*?)(?=:)";
    originURL = originURL.match(pattern)[0];    
    const findQuery={"Mark":0,"AttributeType":"DomainURL","AttributeName":originURL,
    "Active":"Y",};
    let result=[];
    const selectParam ={'AttributeValue':1,'_id':0};
    MongoClient.connect(url, function(err, client) {
        client.db(dbName).collection(collectionName).findOne(findQuery,selectParam,function(errors, items) {
            assert.equal(null, errors);
            if(items){
                if(uniqueID){
                    result = {"exceptionStatus":"Success","Mark":items.AttributeValue,"uniqueID":uniqueID};
                }else{
                    let newID = uuidv4();
                    req.session.uniqueID = newID;
                    console.log("else UUID",req.session.uniqueID);
                    result = {"exceptionStatus":"Success","Mark":items.AttributeValue,"uniqueID":newID};
                }
            }else{
                result={"exception":"Host URL not Authorised","exceptionStatus":"Failed"}
            }
            client.close();
            res.send(result);
            });
        
        });

});

app.listen(4000);