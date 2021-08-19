const RandomFact = require("../models/randomFactModel");

exports.getRandomFact = async (req, res) => {
  
  // const fact = new RandomFact({
  //   fact: "Astronomers sometimes categorize Neptune and Uranus as ice giants because they are composed of heavier unstable substances. Saturn and Jupiter mostly consist of hydrogen and helium.",
  //   source: "fungenerators.com",
  // });
  // await fact.save();

  // Get the count of all users
  const factCount = await RandomFact.countDocuments()

  // Get a random entry
  const random = Math.floor(Math.random() * factCount)

  // Again query all users but only fetch one offset by our random #
  const randomFact = await RandomFact.findOne().skip(random)

  if (!randomFact) return res.status(404).json({ message: "Fact not found" });

  return res.json(randomFact);
  
};