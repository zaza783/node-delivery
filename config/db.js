const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    const dbURI = process.env.MONGODB_URL
    mongoose.connect(dbURI)
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log('Could not connect to MongoDB', err))

};

module.exports = connectDB;