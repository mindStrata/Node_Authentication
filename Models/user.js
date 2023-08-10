const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/Authentication";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((error) => {
    console.error(`Connection Failed : ${error}`);
  });

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [2, "Invalid name"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    min: [7, "Not a strong password"],
  },
});

// Model
const User = new mongoose.model("user", userSchema);
module.exports = User;
