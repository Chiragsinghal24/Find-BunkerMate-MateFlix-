import express from "express";
import mongoose from "mongoose";
import User from "./model/user.model.js";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
dotenv.config();

const app = express();
app.use(cors({ origin: "https://mateflix.onrender.com/" }));

app.use(express.static("public"));

const limit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // limit each IP to 100 requests per windowMs
});

app.use(limit);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/add", async (req, res) => {
  const { name, phone, cgpa, programme, year, branch } = req.body;
  try {
    // Check if user already exists
    const userExists = await User.findOne({ phone });
    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    // Check if phone number is valid
    if (phone.length !== 10) {
      res.status(400).json({ error: "Invalid phone number" });
      return;
    }
    // Check if phone number is indian
    if (!phone.match(/^[6-9]\d{9}$/)) {
      res.status(400).json({ error: "Invalid phone number" });
      return;
    }
    // Check if cgpa is valid
    if (cgpa < 0 || cgpa > 10) {
      res.status(400).json({ error: "Invalid cgpa" });
      return;
    }
    // Check if name is valid
    if (name.length < 3) {
      res.status(400).json({ error: "Invalid name" });
      return;
    }
    // Check if year is valid
    if (year < 1 || year > 5) {
      res.status(400).json({ error: "Invalid year" });
      return;
    }
    // Check if cgpa is valid
    if (cgpa.toString().match(/[a-z]/i)) {
      res.status(400).json({ error: "Invalid cgpa"});
      return;
    }
    const user = await User.create({
      name,
      phone,
      cgpa: Math.round(cgpa * 100) / 100,
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

app.delete("/api/delete", async (req, res) => {
  try {
    const { name } = req.body;
    const users = await User.find({ name });
    await User.deleteMany({ name });
    res.status(200).json({message:"Users Deleted Successfully",users});
  } catch (error) {
    res.status(500).json(error);
  }
});

app.delete("/api/deleteDuplicates", async (req,res)=>{
  try {
    // Delete all users with same phone number
    const users = await User.find();
    const phoneNumbers = users.map(user=>user.phone);
    const duplicatePhoneNumbers = phoneNumbers.filter(phone=>phoneNumbers.indexOf(phone)!==phoneNumbers.lastIndexOf(phone));
    await User.deleteMany({phone:{$in:duplicatePhoneNumbers}});
    res.status(200).json({message:"Duplicate Users Deleted Successfully"});
  } catch (error) {
    res.status(500).json(error);
  }
})

app.delete("/api/deleteInvalid", async(req,res)=>{
  try{
    // Delete users with invalid phone numbers
    const users = await User.find();
    const invalidUsers = users.filter(user=>user.phone.length!==10);
    let invalidPhoneNumbers = invalidUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:invalidPhoneNumbers}});
    // Delete users with non-indian phone numbers using regex
    const nonIndianUsers = users.filter(user=>!user.phone.match(/^[6-9]\d{9}$/));
    let nonIndianPhoneNumbers = nonIndianUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:nonIndianPhoneNumbers}});
    // Delete users with invalid cgpa
    const invalidCgpaUsers = users.filter(user=>user.cgpa<0 || user.cgpa>10);
    let invalidCgpaPhoneNumbers = invalidCgpaUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:invalidCgpaPhoneNumbers}});
    // Delete users with invalid name
    const invalidNameUsers = users.filter(user=>user.name.length<3);
    const invalidNamePhoneNumbers = invalidNameUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:invalidNamePhoneNumbers}});
    // Delete users with invalid year
    const invalidYearUsers = users.filter(user=>user.year<1 || user.year>5);
    const invalidYearPhoneNumbers = invalidYearUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:invalidYearPhoneNumbers}});
    // Delete users with cgpa with alphabets
    const invalidCgpaAlphabetUsers = users.filter(user=>user.cgpa.toString().match(/[a-z]/i));
    const invalidCgpaAlphabetPhoneNumbers = invalidCgpaAlphabetUsers.map(user=>user.phone);
    await User.deleteMany({phone:{$in:invalidCgpaAlphabetPhoneNumbers}});
    res.status(200).json({message:"Invalid Users Deleted Successfully"});
  } catch(error){
    res.status(500).json(error)
  }
})

mongoose.connect(
  process.env.MONGODB_URI
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
