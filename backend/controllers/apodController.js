const fetch = require("node-fetch");
const Apod = require("../models/apodModel");

const apodHandler = async (date) => {

  let apod = await Apod.findOne({ date: date });

  if (!apod) {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=JZLWuJDR9crbBSjYEFfoziVpdkNQq6FNywPhfzdT&date=${date}`
    );

    const data = await response.json();
    //console.log(data);
    if (response.status === 400) {
      
      // throw generates an error
      throw {status: 400, message: "Bad request"};
    }

    if (!response.ok) {
      throw {status: 503, message: "Houston, we've had a problem"};
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
  // const today = new Date().toJSON().slice(0, 10);

  var dt = new Date();

  dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);

  var offset = -240;
  var edtDate = new Date(dt.getTime() + offset*60*1000);
  
  const today = edtDate.toJSON().slice(0, 10);
  let apod;

  try {
    apod = await apodHandler(today);
  } catch (err) {
    return res.status(err.status).json({message: err.message});
  }
  res.json(apod);
};

exports.getByDate = async (req, res) => {
  const { date } = req.params;
  let apod;

  try {
    apod = await apodHandler(date);
  } catch (err) {
    return res.status(err.status).json({message: err.message});
  }
  res.json(apod);
};

exports.getRandomApod = async (req, res) => {
  const minTimestamp = new Date("1995-06-16").getTime();
  const maxTimestamp = Date.now();

  const randomTimestamp = Math.random() * (maxTimestamp - minTimestamp) + minTimestamp;

  const randomDate = new Date(randomTimestamp).toJSON().slice(0, 10);

  console.log(randomDate);
  
  let apod;

  try {
    apod = await apodHandler(randomDate);
  } catch (err) {
    return res.status(err.status).json({message: err.message});
  }
  res.json(apod);
};
