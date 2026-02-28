import express from "express";
import Manager from "../models/manager.model.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const manager = new Manager({
    ...req.body,
    created_date: new Date().toISOString()
  });
  await manager.save();
  res.json({ message: "Manager Added" });
});

router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const data = await Manager.find().skip(skip).limit(limit);
  res.json(data);
});

router.put("/update/:id", auth, async (req, res) => {
  await Manager.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updated_date: new Date().toISOString()
  });
  res.json({ message: "Updated Successfully" });
});

router.delete("/delete/:id", auth, async (req, res) => {
  await Manager.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

router.post("/delete-multiple", auth, async (req, res) => {
  await Manager.deleteMany({ _id: { $in: req.body.ids } });
  res.json({ message: "Multiple Records Deleted" });
});

router.get("/search", auth, async (req, res) => {
  const keyword = req.query.keyword;

  const data = await Manager.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
      { designation: { $regex: keyword, $options: "i" } }
    ]
  });

  res.json(data);
});

export default router;