const router = require("express").Router();
const User = require("../models/users.Message");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      user.name = req.body.name;
      user.subject = req.body.subject;
      user.message.push(req.body.message);
      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } else {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
