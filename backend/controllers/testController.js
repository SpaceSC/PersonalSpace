exports.test = async (req, res) => {
  res.json({message: "My test endpoint"});
}

exports.error500Test = async (req, res) => {
  // res.json({message: "My test endpoint"});
  throw {message: "My test server error endpoint"}
}