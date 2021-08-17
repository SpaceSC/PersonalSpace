const fetch = require("node-fetch");
const Apod = require("../models/apodModel");

const apodHandler = async (date) => {

  let apod = await Apod.findOne({ date: date });

  if (!apod) {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT&date=${date}`
    );

    const data = await response.json();

    if (response.status === 400) {
      return res.status(400).json("Bad request");
    }

    if (!response.ok) {
      return res.status(503).json("Houston, we've had a problem");
    }

    apod = new Apod({
      date: data.date,
      explanation: data.explanation,
      media_type: data.media_type,
      title: data.title,
      url: data.url,
    });
    await apod.save();
  }

  return apod
}

exports.getToday = async (req, res) => {
  const today = new Date().toJSON().slice(0, 10);
  const apod = await apodHandler(today);
  res.json(apod);
};

exports.getByDate = async (req, res) => {
  const { date } = req.params;
  const apod = await apodHandler(date);
  res.json(apod);
};
