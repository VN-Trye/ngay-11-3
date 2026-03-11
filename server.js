const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());


// CONNECT MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/testdb")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


// ROUTES
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");

app.use("/users", userRoutes);
app.use("/roles", roleRoutes);


// START SERVER
app.listen(3000, () => {
    console.log("Server running on port 3000");
});