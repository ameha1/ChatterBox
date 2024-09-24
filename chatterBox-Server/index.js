
const express = require('express');
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cors = require("cors")

const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const messageRoutes = require('./Routes/messageRoutes')

const { notFound, errorHandler } = require('./Middleware/errorMiddleware')

const app = express();

dotenv.config()

app.get('/',(req,res)=>{res.send('API is running in PORT 5000')});

const connectDB = async () => {

    try {

        const connect = await mongoose.connect(process.env.MONGO_URI) ;
        console.log('Server is connected to MongoDB ...');
        
    } catch (error) {

        console.log('Server is NOT connected to DataBase ', error.message);
    
    }

}

connectDB();

app.use(cors({
    origin : "*",
  }));

app.use(express.json());

app.use('/users',userRoutes)
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000

const server = app.listen(PORT,console.log('Server is running ...'))

const io = require("socket.io")(server, {
    cors: {
        origin:"*",
    },
    pingTimeout: 6000,
});

io.on("connection", (socket) => {
    socket.on("setup", (user) =>{
        socket.join(user.data._id);

        socket.emit("connected");
    })


socket.on("join chat", (room) => {
    socket.join(room);
});

socket.on("new mesage", (newMessageStatus) => {
    var chat = newMessageStatus.chat;
    if(!chat.users){
        return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
        if (user._id == newMessageStatus.sender._id) return;
    
        socket.in(user.id).emit("message received", newMessageReceived);
    });
});

});
