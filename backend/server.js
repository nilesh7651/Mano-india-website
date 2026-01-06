require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        "\x1b[33m%s\x1b[0m",
        "★ Developed by Nilesh Kumar"
      );
      console.log(
        "\x1b[90m%s\x1b[0m",
        " Contact: nileshsingh7651@gmail.com"
      );
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
