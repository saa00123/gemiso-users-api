const express = require("express");
const router = express.Router();

/** 사용자 인증 */
router.post("/authenticate", (req, res) => {
  const { email, password } = req.body;
  const user = global.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (user && user.password === password) {
    const token = "your_generated_token";
    res.status(200).json({ token });
  } else {
    res.status(400).json({ error: "Invalid email or password." });
  }
});

module.exports = router;
