//Importing Packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {dbconn} = require('./src/connection/dbconn.js');

//use of package
const app = express();
dotenv.config();
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));


//DATABASE CONNECTIVITY
dbconn();


//Port usage and server calling
const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`server successfully run on ${port}`);
});
