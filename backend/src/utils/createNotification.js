const Notification = require("../models/Notification");

module.exports = async (userId, title, message) => {
  await Notification.create({
    user: userId,
    title,
    message,
  });
};
