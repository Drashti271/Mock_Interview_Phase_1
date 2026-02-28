import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import adminRoutes from "./routers/admin.route.js";
import managerRoutes from "./routers/manager.route.js"

const app = express();
const port = dotenv.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("MongoDB Connected"))
.catch(error => console.log(error));


app.use("/api/admin", adminRoutes);
app.use("/api/manager",managerRoutes);

app.listen(port , (error) => {
    if(!error){
        console.log("Server Started.");
        console.log("http://localhost:"+port);
    } else {
        console.log(error.message);
    }
});