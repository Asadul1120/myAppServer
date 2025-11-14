require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");

// Models
const chat = require("./models/chat"); // ⬅️ তুমি এটা না দিলে error হবে

// Routes
const messageRoute = require("./routers/usersMessge");
const chatRoute = require("./routers/chatRoutes");
const  userRoute = require("./routers/userRoute");



const app = express();
const server = http.createServer(app); // ⬅️ Correct way to use http server

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/message", messageRoute);
app.use("/userChat", chatRoute);
app.use("/user", userRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5173/adminchat",
      "http://localhost:5173/userchat",
    ], // React app
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      const savedMessage = await Message.create(data);
      io.emit("receive_message", savedMessage);
    } catch (error) {
      console.error("❌ Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Portfolio Server is Running!");
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).send("Something broke!");
});

// Start the server (✅ use `server.listen` instead of `app.listen`)
const PORT = process.env.PORT || 3045;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
