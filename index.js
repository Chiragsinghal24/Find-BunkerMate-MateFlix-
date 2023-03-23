import express from "express";
import mongoose from "mongoose";
import User from "./model/user.model.js";
const app = express();


//my edit
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/add", async (req, res) => {
  const { name, phone, cgpa, programme, year, branch } = req.body;
  try {
    const user = await User.create({
      name,
      phone,
      cgpa,
      programme,
      year,
      branch,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get("/api/getData", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.post("/api/validate", async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone });
    if (user) res.json({ success: true });
    else res.json({ success: false });
  } catch (error) {
    res.status(500).json(error);
  }
});

mongoose.connect(
  "mongodb+srv://admin:bunker123@cluster0.wlikjj0.mongodb.net/?retryWrites=true&w=majority"
);

const db = mongoose.connection;

db.on("error", () => {
  console.log("Unable to connect to database");
});
db.on("open", () => {
  console.log("Successfully connected to mongodb");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
