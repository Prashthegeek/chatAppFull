// const express = require("express");
// const dotenv = require('dotenv'); // This must be at the top before connectDb
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

// dotenv.config({
// 	path: "./.env",
// });
// const app = express();

// app.use(express.json()); // to accept json data

// // app.get("/", (req, res) => {
// //   res.send("API Running!");
// // });

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

// // --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// // --------------------------deployment------------------------------

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT ;
// connectDB();
// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",  //frontend url(if deployed ,then give the deployed url)
//     // credentials: true,
//   },
// });
 
// io.on("connection", (socket) => { 
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected"); 
//   });
 
//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   }); 
//   socket.on("typing", (room) => socket.in(room).emit("typing")); 
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
 
//   //Send the message to everyone in the room(can be group id)

//   socket.on("new message", (newMessageRecieved) => { 
//     //console.log(newMessageRecieved)
//     const chat = newMessageRecieved.chat;  //in the field chat of newMessageReceived, we have chat (which contains an Id ,the Id of chat), console.log karke deke le(yaha par log karoge,then , since, server hai, so, terminal me result after sending the message in the frontend)
 
//     if (!chat.users) return console.log("chat.users not defined");
      
//     chat.users.forEach((user) => {
//       if (user._id === newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message received", newMessageRecieved);
//     }); 
// });


//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   }); 
// });







const express = require("express");
const dotenv = require('dotenv'); // This must be at the top before connectDb
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");

dotenv.config({
	path: "./.env",
});
const app = express();

app.use(express.json()); // to accept json data



// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use('/uploads', express.static(path.join(__dirname,'../uploads')));  //This ensures that any file in the uploads directory is accessible via the /uploads route. For example, a file stored as uploads/image-12345.png would be accessible at http://localhost:5000/uploads/image-12345.png (assuming your server runs on port 5000).


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1,"frontend", "build", "index.html")) 
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
  // app.get("*", (req, res) =>
  //   res.sendFile(path.resolve(__dirname1, "frontend" , "index.html"))
  // );
}

// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT ;
connectDB();
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: ["https://chatappfull.onrender.com", "http://localhost:3000"],   //ek yaha change karo and next singleChat.js me const socket = io(https://chatappfull.onrender.com), do , the link of the server deployed link , frontend me backend deployed the link do and backend me frontend deployed ka link do(can also give development link also, also can give a single link (if both frontend and backend are deployed in the same link ))
    // credentials: true,
  },
});
 
io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected"); 
  });
 
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  }); 
  socket.on("typing", (room) => socket.in(room).emit("typing")); 
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
 
  //Send the message to everyone in the room(can be group id)

  socket.on("new message", (newMessageRecieved) => { 
    //console.log(newMessageRecieved)
    const chat = newMessageRecieved.chat;  //in the field chat of newMessageReceived, we have chat (which contains an Id ,the Id of chat), console.log karke deke le(yaha par log karoge,then , since, server hai, so, terminal me result after sending the message in the frontend)
 
    if (!chat.users) return console.log("chat.users not defined");
     
    chat.users.forEach((user) => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
});


  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
