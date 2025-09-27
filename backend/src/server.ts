import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/db";
import authRoutes from "./routes/auth.route";

const app = express();
const PORT = process.env.PORT ||5000;

app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}))

app.get("/", (req, res) => {
    return res.send("Hello, World!");
})

app.use("/api/auth", authRoutes);

app.listen(PORT, async() => {
    await dbConnect();
    console.log(`Server is running on port ${PORT}`);
});