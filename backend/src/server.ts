import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/db";
import authRoutes from "./routes/auth.route";
import noteRouutes from "./routes/note.controller";

const app = express();
const PORT = process.env.PORT ||5000;

app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles:true,
	tempFileDir:"/tmp",
}))

app.get("/", (req, res) => {
    return res.send("Hello, World!");
})

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRouutes);

app.listen(PORT, async() => {
    await dbConnect();
    console.log(`Server is running on port ${PORT}`);
});