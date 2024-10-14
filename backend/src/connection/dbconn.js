const mongoose = require("mongoose");

exports.dbconn = () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URL);
        console.log("mongoDB is connected");
    }catch(e){
        console.log("mongoDB is not connected");
    }
};



