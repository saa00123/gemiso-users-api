const express = require("express");
const router = express.Router();

/** 사용 가능한 권한 배열 */
const availablePermissions = [
  { id: 1, name: "create" },
  { id: 2, name: "read" },
  { id: 3, name: "update" },
  { id: 4, name: "delete" },
];

/** 권한 조회 */
router.get("/:id/permissions", (req, res) => {
  const { id } = req.params;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res
      .status(404)
      .json({ error: "Permissions for the given user ID not found." });
  }

  res.status(200).json({ permissions: user.permissions || [] });
});

/** 권한 할당 */
router.post("/:id/permissions", (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  if (!Array.isArray(permissions)) {
    return res.status(400).json({ error: "Invalid permission IDs format." });
  }

  const user = global.users.find((u) => u.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ error: "User ID does not exist." });
  }

  user.permissions = user.permissions || [];

  const validPermissionNames = availablePermissions
    .filter((permission) => permissions.includes(permission.id))
    .map((permission) => permission.name);

  user.permissions = [
    ...new Set([...user.permissions, ...validPermissionNames]),
  ];

  res.status(201).json({ message: "Permissions updated successfully." });
});

/** 권한 변경 */
router.put("/:id/permissions", (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "User ID not found." });
  }

  const validPermissionNames = availablePermissions
    .filter((permission) => permissions.includes(permission.id))
    .map((permission) => permission.name);

  const isSamePermissions =
    validPermissionNames.length === user.permissions.length &&
    validPermissionNames.every((permission) =>
      user.permissions.includes(permission),
    );

  if (isSamePermissions) {
    return res
      .status(400)
      .json({ error: "No changes detected in permissions." });
  }

  user.permissions = validPermissionNames;
  res.status(200).json({ message: "Permissions updated successfully." });
});

/** 권한 제거 */
router.delete("/:id/permissions", (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;
  const user = global.users.find((u) => u.id === parseInt(id));

  if (!user) {
    return res.status(404).json({ error: "User ID does not exist." });
  }

  const validPermissionNames = availablePermissions
    .filter((permission) => permissions.includes(permission.id))
    .map((permission) => permission.name);

  user.permissions = user.permissions.filter(
    (permission) => !validPermissionNames.includes(permission),
  );

  res.status(200).json({ message: "Permissions removed successfully." });
});

/** 전체 사용자에게 권한 부여 */
router.post("/permissions", (req, res) => {
  const { permissions } = req.body;

  const validPermissionNames = availablePermissions
    .filter((permission) => permissions.includes(permission.id))
    .map((permission) => permission.name);

  global.users.forEach((user) => {
    user.permissions = user.permissions || [];
    const newPermissions = [
      ...new Set([...user.permissions, ...validPermissionNames]),
    ];
    user.permissions = newPermissions;
  });

  res
    .status(201)
    .json({ message: "Permissions added successfully to all users." });
});

/** 전체 사용자 권한 제거 */
router.delete("/permissions", (req, res) => {
  const { permissions } = req.body;

  const validPermissionNames = availablePermissions
    .filter((permission) => permissions.includes(permission.id))
    .map((permission) => permission.name);

  global.users.forEach((user) => {
    user.permissions = user.permissions || [];
    user.permissions = user.permissions.filter(
      (permission) => !validPermissionNames.includes(permission),
    );
  });

  res
    .status(200)
    .json({ message: "Permissions removed successfully from all users." });
});

module.exports = router;
