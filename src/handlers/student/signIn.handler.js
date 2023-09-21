const jsw = require("jsonwebtoken");
const Student = require("../../models/student.model");
const sha = require("crypto");
// import { StatusCodes } from ;
const { StatusCodes } = require("http-status-codes");
const user_sign_in = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (!user) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ error: "Student Doesn't Exist" });
  }

  const ismatch = sha.createHash("sha512").update(password).digest("hex");

  if (ismatch !== user.password) {
    return res.status(StatusCodes.UNAUTHORIZED).json("Password is incorrect");
  }

  const token = jsw.sign({ id: user._id }, "passwordKey");
  res.json({ token, ...user._doc });
};

module.exports = user_sign_in;
