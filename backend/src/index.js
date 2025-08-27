import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import weatherRouter from "./routes/weather.js";

dotenv.config();

const app = express();


app.use(cors({
    origin: "http://localhost:5173"
}));


app.use("/api", weatherRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
