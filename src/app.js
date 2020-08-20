const chalk = require('chalk');
const dictionary = require('./context/dictionary');
const path = require('path');
const express = require('express');
const app = express();

const defaultPage = path.join(__dirname,'..','/webapp/');
app.use(express.static(defaultPage));

app.get('/logan',(req,res) =>{
    res.send("<h1>The name is Logan</h1>");
});

app.listen(3000);