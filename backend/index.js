//Importing Packages
const express = require("express");
const dotenv = require("dotenv");

//use of package
const app = express();
dotenv.config();

const port = process.env.PORT;

app.listen(port,(req,res)=>{
    console.log(`server successfully run on ${port}`);
})