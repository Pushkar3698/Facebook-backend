const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../secret/secret");

exports.signup = async (req, res, next) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      dobDate,
      dobMonth,
      dobYear,
    } = req.body;

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message:
          "This email address already exists,try with a different email address",
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      firstname,
      lastname,

      createdAt: new Date(),
      bDay: dobDate,
      bMonth: dobMonth,
      bYear: dobYear,
      email,
      password: cryptedPassword,
      gender,
    });

    await newUser.save();

    res.status(200).json({ message: "Registeration Success ! please login" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  let loadedUser;

  User.findOne({ email })
    .then((res) => {
      if (!res) {
        const error = new Error("could not find the account");
        error.status = 400;
        throw error;
      }
      loadedUser = res;
      return bcrypt.compare(password, res.password);
    })
    .then((val) => {
      if (!val) {
        const error = new Error("Wrong Password Entered");
        error.status = 400;
        throw error;
      }

      const token = jwt.sign(
        { userId: loadedUser._id.toString(), email: loadedUser.email },
        secret,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch((err) => res.status(400).json(err));
};
