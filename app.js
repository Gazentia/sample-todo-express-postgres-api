const express = require("express");
const todoSchema = require("./models/todo.model");
const userSchema = require("./models/user.model");

const todoRoutes = require("./routes/todo.route");
const userRoutes = require("./routes/user.route");
const sequelize = require("./utils/database");

const app = express();

app.use([express.json(), express.urlencoded({ extended: true })]); // Express >= 4.16.0

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

userSchema.hasMany(todoSchema, { constraints: true, onDelete: 'cascade' });
sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log("Error:", err.message));
