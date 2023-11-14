/** email 검증을 위한 함수 */
function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/** 배열 형식 검증을 위한 함수 */
function validateArray(array) {
  return Array.isArray(array);
}

/** 사용자 검증 */
function validateUser(req, res, next) {
  const { name, email, password, roles, permissions, isActive } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "Name must be a string." });
  }

  if (!validateEmailFormat(email)) {
    return res.status(400).json({ error: "Invalid email format." });
  }

  if (req.method !== "PUT") {
    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Password must be a string." });
    }
  }

  if (roles && !validateArray(roles)) {
    return res.status(400).json({ error: "Roles must be an array." });
  }

  if (permissions && !validateArray(permissions)) {
    return res.status(400).json({ error: "Permissions must be an array." });
  }

  next();
}

module.exports = validateUser;
