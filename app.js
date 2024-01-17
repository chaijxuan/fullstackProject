//app.js
const express = require('express');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:false}));


  const mainRoute = require('../bed-ca2-junxuan000/src/routes/mainRout');
app.use("/", mainRoute);

module.exports = app;