import express from "express"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import roomsRoute from "./routes/rooms.js"
import hotelsRoute from "./routes/hotels.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
const mongo = "mongodb+srv://booking:booking123@cluster0.zcffy6y.mongodb.net/Booking?retryWrites=true&w=majority";

const connect = async()=>{
    try {
        await mongoose.connect(mongo);
        console.log("DB Connected")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Disconnected DB")
})
mongoose.connection.on("connected",()=>{
    console.log("Connected DB")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMsg,
        stack: err.stack 
    })
})
app.post("/api/logout", (req, res) => {
    res.clearCookie("access_token").status(200).json({ message: "Logged out successfully" });
  });
app.listen(5000, ()=>{
    connect();
    console.log("Backend on");
})
