const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Contact = require("./models/Contact");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB Error: ", err));

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ success: true, msg: "Message received!" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Something went wrong." });
  }
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));