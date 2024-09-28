const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, role, password: hashedPassword });
    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: `User registered with username${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res
        .status(500)
        .json({ message: `user not found with username ${username}` });
    }
    const hasPasswordMatched = await bcrypt.compare(password, user.password);

    if (!hasPasswordMatched) {
      return res.status(500).json({ message: `Incorrect password` });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (err) {}
};

module.exports = { register, login };
