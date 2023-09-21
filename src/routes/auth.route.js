const express = require("express");

const user_sign_up = require("../handlers/student/signUp.handler");
const user_sign_in = require("../handlers/student/signIn.handler");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/api/student/sign_up", user_sign_up);

router.post("/api/student/sign_in", user_sign_in);

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// get user data
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user._doc, token: req.token });
});

module.exports = router;
