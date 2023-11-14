const express = require("express");
const router = express.Router();
const validateUser = require("./validate");

/** 비밀번호를 제외한 사용자 정보 반환하는 함수 */
function getUserWithoutPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/** 사용자 검색 기능 */
router.get("/search", (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: "Invalid query parameters for search." });
  }

  const filteredUsers = global.users
    .filter((user) => user.name.includes(query) || user.email.includes(query))
    .map(getUserWithoutPassword);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  res.status(200).json({
    results: paginatedUsers,
    total: filteredUsers.length,
    page,
    limit,
  });
});

/** 사용자 목록 조회 및 필터링을 통한 사용자 조회 */
router.get("/", (req, res) => {
  const { role } = req.query;

  const filteredUsers = global.users
    .filter((user) => {
      return !role || (user.roles && user.roles.includes(role));
    })
    .map(getUserWithoutPassword);

  res.status(200).json({ users: filteredUsers });
});

/** 사용자 조회 */
router.get("/:id", (req, res) => {
  const user = global.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res
      .status(404)
      .json({ error: "User data not found for the given ID." });
  }
  const userWithoutPassword = getUserWithoutPassword(user);
  res.status(200).json(userWithoutPassword);
});

/** 사용자 생성 */
router.post("/", validateUser, (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Invalid user data." });
  }
  const newUser = { id: global.users.length + 1, name, email, password };
  global.users.push(newUser);
  res.status(201).json(newUser);
});

/** 사용자 정보 업데이트 */
router.put("/:id", validateUser, (req, res) => {
  const userIndex = global.users.findIndex(
    (u) => u.id === parseInt(req.params.id),
  );
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found." });

  const existingUser = global.users[userIndex];
  const { name, email } = req.body;

  if (
    name &&
    existingUser.name === name &&
    email &&
    existingUser.email === email
  ) {
    return res.status(400).json({ error: "No new information to update." });
  }

  if (name) global.users[userIndex].name = name;
  if (email) global.users[userIndex].email = email;

  res.status(200).json(global.users[userIndex]);
});
/** 사용자 삭제 */
router.delete("/:id", (req, res) => {
  const userIndex = global.users.findIndex(
    (u) => u.id === parseInt(req.params.id),
  );
  if (userIndex === -1)
    return res.status(404).json({ error: "User not found." });

  global.users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
