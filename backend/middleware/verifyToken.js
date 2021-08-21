const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;
  //console.log("token", token);
  let verifiedToken;
  try {
    verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({message: "Unauthorized"});
  }
  //console.log("verified token", verifiedToken);
  res.locals.google_id = verifiedToken.google_id;
  res.locals.is_admin = verifiedToken.is_admin;
  next();
};
