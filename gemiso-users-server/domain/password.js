const express = require("express");
const router = express.Router();

/** 비밀번호 관리 */
router.put("/:id/password", (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;
  const userIndex = global.users.findIndex(
    (user) => user.id === parseInt(id) && user.password === password,
  );

  if (userIndex > -1) {
    global.users[userIndex].password = newPassword;
    res.status(200).json({ message: "Password updated successfully." });
  } else {
    res.status(400).json({ error: "Invalid old password provided." });
  }
});

module.exports = router;
