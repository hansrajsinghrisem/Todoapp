import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/db.js";
import router from "./routes/taskRoute.js";

dotenv.config()

const app = express();
app.use(cors({
  origin: "https://todoapp-frontend-qlh7.onrender.com",
}));
app.use(express.json());
const PORT = process.env.PORT

connectDB();

app.use('/api', router);

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})
