const RandomFact = require("../models/randomFactModel");

exports.getRandomFact = async (req, res) => {
  // if (process.env.NODE_ENV !== "test") 
  // randomFactGenerator();

  // Get the count of all randomfacts
  const factCount = await RandomFact.countDocuments()

  // Get a random entry
  const random = Math.floor(Math.random() * factCount)

  // Again query all users but only fetch one offset by our random #
  const randomFact = await RandomFact.findOne().skip(random)

  if (!randomFact) return res.status(404).json({ message: "Fact not found" });

  return res.json(randomFact);
  
};