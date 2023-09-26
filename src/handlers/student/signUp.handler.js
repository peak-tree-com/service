const sha = require("crypto");
const Student = require("../../models/student.model");
const user_sign_up = async (req, res) => {
  const { name, register_no, email, year, batch, password, coins } = req.body;

  const existingStudent = await Student.findOne({ email: email });

  if (existingStudent) {
    return res
      .status(400)
      .send({ msg: "User with same email already exists!" });
  }

  if (!name && !register_no && !email && !year && !batch && !password) {
    return res.status(406).send("All field are manditory");
  }
  const hashedPassword = sha
    .createHash("sha512")
    .update(password)
    .digest("hex");

  const student = new Student({
    name,
    register_no,
    email,
    year,
    batch,
    password: hashedPassword,
    coins
  });
  await student
    .save()
    .then((data) => {
      res.status(202).send({ data: data, message: "Created successfully" });
    })
    .catch((err) => {
      res.status(400).send({ err: err, message: "Cannot save" });
    });
};

module.exports = user_sign_up;
