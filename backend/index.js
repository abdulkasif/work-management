  //Importing Packages
  const express = require("express");
  const dotenv = require("dotenv");
  const cors = require("cors");
  const bodyParser = require("body-parser");
  const {dbconn} = require('./src/connection/dbconn.js');
  const userRoutes = require('./src/routes/UserRoute.js');
  const HomeRoutes =require('./src/routes/HomeRoute.js')

  //use of package
  const app = express();
  dotenv.config();
  app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
      const allowedOrigins = ['https://rjvn06q4-5173.inc1.devtunnels.ms', 'https://rjvn06q4-8080.inc1.devtunnels.ms'];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {  // Allow requests with no origin (e.g., mobile apps)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
  app.use(express.json());
  app.use(bodyParser.text());

  //DATABASE CONNECTIVITY
  dbconn();

  //Authentication Route
  app.use('/api/users', userRoutes);

  app.use('/api/home',HomeRoutes);


  //Port usage and server calling
  const port = process.env.PORT;

  app.listen(port, (req, res) => {
    console.log(`server successfully run on ${port}`);
  });
