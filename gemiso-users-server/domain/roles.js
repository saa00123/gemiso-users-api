const express = require("express");
const router = express.Router();

/** 사용 가능한 역할 배열 */
const availableRoles = [
  { id: 1, name: "admin" },
  { id: 2, name: "user" },
  { id: 3, name: "editor" },
];

/** 역할 조회 */
router.get("/:id/roles", (req, res) => {
  const { id } = req.params;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res
      .status(404)
      .json({ error: "Roles for the given user ID not found." });
  }

  res.status(200).json({ roles: user.roles || [] });
});

/** 역할 할당 */
router.post("/:id/roles", (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;

  if (!Array.isArray(roles)) {
    return res.status(400).json({ error: "Invalid roles IDs format." });
  }

  const user = global.users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "User ID does not exist." });
  }

  user.roles = user.roles || [];

  const validRolesNames = availableRoles
    .filter((role) => roles.includes(role.id))
    .map((role) => role.name);

  user.roles = [...new Set([...user.roles, ...validRolesNames])];

  res.status(201).json({ message: "Roles updated successfully." });
});

/** 역할 변경 */
router.put("/:id/roles", (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "User ID not found." });
  }

  const validRolesNames = availableRoles
    .filter((role) => roles.includes(role.id))
    .map((role) => role.name);

  const isSameRoles =
    validRolesNames.length === user.roles.length &&
    validRolesNames.every((role) => user.roles.includes(role));

  if (isSameRoles) {
    return res.status(400).json({ error: "No changes detected in roles." });
  }

  user.roles = validRolesNames;
  res.status(200).json({ message: "Roles updated successfully." });
});

/** 역할 제거 */
router.delete("/:id/roles", (req, res) => {
  const { id } = req.params;
  const { roles } = req.body;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "User ID does not exist." });
  }

  const validRolesNames = availableRoles
    .filter((role) => roles.includes(role.id))
    .map((role) => role.name);

  user.roles = user.roles.filter((role) => !validRolesNames.includes(role));

  res.status(200).json({ message: "Roles removed successfully." });
});

module.exports = router;
