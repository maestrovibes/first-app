import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";

const app = express();
app.use(express.json());

app.use("/api/users", router);


mongoose
.connect("mongodb+srv://mern123:mern123@cluster0.g8ewav6.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => app.listen(5000))
.then(() => 
    console.log("Connected to database and listening to port 5000")
)
.catch((err) => console.log(err));

