const mongoose = require('mongoose');
const db = () => {mongoose.connect(process.env.MONGOURI,()=>{
    console.log("Db is Connected");
})}

module.exports = db;
