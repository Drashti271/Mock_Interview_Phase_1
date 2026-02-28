import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js"

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const exist = await Admin.findOne({ email });
  if (exist) return res.json({ message: "Email already registered" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const admin = new Admin({
    username,
    email,
    password: hashPassword,
    created_date: new Date().toISOString()
  });

  await admin.save();
  res.json({ message: "Admin Registered Successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) return res.json({ message: "Invalid Email" });

  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) return res.json({ message: "Invalid Password" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

export default router;