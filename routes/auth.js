const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  console.log("Received registration request...");
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Store password in plain text
    });

    console.log("Attempting to save new user...");
    const savedUser = await newUser.save();
    console.log("User successfully saved:", savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  console.log("Received login request...");
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      console.log("User not found.");
      return res.status(401).json("Wrong username or password");
    }

    // Compare passwords directly since they are stored in plain text
    if (user.password !== req.body.password) {
      console.log("Invalid password.");
      return res.status(401).json("Wrong username or password");
    }

    console.log("User authenticated successfully.");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json(err);
  }
});

module.exports = router;
