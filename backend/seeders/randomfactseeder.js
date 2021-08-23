const randomFactGenerator = async () => {
  
  const isRandomFact = await RandomFact.findOne();
 
  if(isRandomFact) return;

  const randomFacts = [
    {
      fact: "Astronomers sometimes categorize Neptune and Uranus as ice giants because they are composed of heavier unstable substances. Saturn and Jupiter mostly consist of hydrogen and helium.",
      source: "fungenerators.com",
    },
    {
      fact: "When a supernova occurs it shoots atoms by the billions in every direction. These atoms form beautiful nebulae (clouds of dust, gases, hydrogen and helium).",
      source: "fungenerators.com",
    },
    {
      fact: "Neptune has at least 14 moons, with the largest being Triton, discovered by William Lassell in 1846 one day after the discovery of Neptune. The most distant moon of Neptune is Neso which takes 26 years to make one trip around the planet.",
      source: "fungenerators.com",
    },
    {
      fact: "Uranus is named after the Greek mythological figure Ouranos, the God of the sky.",
      source: "fungenerators.com",
    },
    {
      fact: "It was confirmed by Hubble Space Telescope observations that Ganymede has a thin atmosphere that appears to contain oxygen. The oxygen is likely freed as water ice on the surface is broken apart into oxygen and hydrogen by solar radiation. The atmosphere is far too thin to support life as we know it.",
      source: "fungenerators.com",
    },
  ];
  await RandomFact.insertMany(randomFacts);
};