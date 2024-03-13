const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoutes");
const socket = require("socket.io");
const path = require('path');

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: ", err.message);
  });

const app = express();
const corsOptions = {
  origin: 'https://chatchit.onrender.com',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.ORIGIN,
    credentials: true,
  },
});


global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

// ----------Deployement--------
const __dirname1 = path.resolve();
if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname1,"../client/build")));

    app.get('*',(req,res) =>{
      res.sendFile(path.resolve(__dirname1,"..","client","build","index.html"));
    });
}  
else{
    app.get("/",(req,res) =>{
      res.send("API is Running Successfully");
    })
}
