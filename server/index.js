import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import Applicant from "./models/applicant.model.js";

const app = express();
app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose
  .connect(
    `mongodb+srv://aman22feb2004:${process.env.MONGODB_URI}@cluster0.c2acp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("error connecting to the database", err);
  });

app.post("/apply", upload.single("resume"), async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      state,
      pin,
      address,
      gender,
      skills,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const existingApplicant = await Applicant.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingApplicant) {
      if (existingApplicant.email === email) {
        return res.status(400).json({ error: "Email is already in use" });
      }
      if (existingApplicant.phone === phone) {
        return res
          .status(400)
          .json({ error: "Phone number is already in use" });
      }
    }

    const applicant = new Applicant({
      firstName,
      lastName,
      email,
      phone,
      state,
      pin,
      address,
      gender,
      skills: skills.split(",").map((skill) => skill.trim()),
      resume: req.file.buffer,
    });

    await applicant.save();
    res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("server is listening on port: 5000");
});
