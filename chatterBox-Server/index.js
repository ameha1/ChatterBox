
const express = require('express');
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require('./Routes/userRoutes')

const app = express();

dotenv.config()

app.get('/',(req,res)=>{res.send('API is running in PORT 5000')});

const connectDB = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI) ;
        console.log('server connected successfully!');
        
    } catch (error) {

        console.log('server is NOT connected to DataBase', error.message);
    
    }

}

connectDB();

app.use(cors({
    origin : "*",
  }));

app.use(express.json());

app.use('/users',userRoutes)


const PORT = process.env.PORT || 5000

app.listen(PORT,console.log('Server is running ...'))
