export const adminAuthMiddleware = (req, res, next) => {
  // Check if user session exists
  console.log(req.session);
  if (!req.session.user) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  // Check if user role is admin
  if (req.session.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Access denied. Admins only." });
  }

  next();
};
