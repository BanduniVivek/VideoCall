import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import  { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";
import { user } from "./models/user.model.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", process.env.PORT || 8000);
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({ extended: true,limit : "40kb" } ));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoutes);

const start = async ()=>{
    const connectionDB = await mongoose.connect("mongodb+srv://Vivek:Vivek@videocall.vg8kbl7.mongodb.net/");
    console.log(`mongoDB connected to host ${connectionDB.connection.host}`);
    server.listen(app.get("port"), ()=>{
        console.log("server is running on port 8000");
    });
}

start();