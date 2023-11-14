const express = require("express");
const cors = require("cors");
const userRouter = require("./domain/user");
const authRouter = require("./domain/auth");
const passwordRouter = require("./domain/password");
const permissionsRouter = require("./domain/permissions");
const rolesRouter = require("./domain/roles");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/users", authRouter);
app.use("/users", passwordRouter);
app.use("/users", permissionsRouter);
app.use("/users", rolesRouter);

/** 더미 데이터 */
class User {
  constructor(id, name, email, password, roles = [], permissions = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.permissions = permissions;
  }
}

global.users = [];

global.users.push(
  new User(1, "User1", "user1@example.com", "password1", ["admin"], ["create"]),
);
global.users.push(
  new User(2, "User2", "user2@example.com", "password2", ["user"], ["delete"]),
);

/** 서버 시작 */
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
