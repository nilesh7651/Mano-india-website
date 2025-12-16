const artistOnly = (req, res, next) => {
  if (req.user && req.user.role === "artist") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Artists only" });
};

module.exports = artistOnly;
