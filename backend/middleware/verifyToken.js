const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  //console.log("token", token);
  let verifiedToken;
  try {
    const token = authorization.split(" ")[1]
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
  //console.log("verified token", verifiedToken);
  res.locals.google_id = verifiedToken.google_id;
  res.locals.is_admin = verifiedToken.is_admin;
  next();
};
