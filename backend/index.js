//Importing Packages
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {dbconn} = require('./src/connection/dbconn.js');
const userRoutes = require('./src/routes/UserRoute.js');

//use of package
const app = express();
dotenv.config();
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));
app.use(express.json());

//DATABASE CONNECTIVITY
dbconn();

//Authentication Route
app.use('/api/users', userRoutes);


//Port usage and server calling
const port = process.env.PORT;

app.listen(port, (req, res) => {
  console.log(`server successfully run on ${port}`);
});
