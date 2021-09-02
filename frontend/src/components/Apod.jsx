import { useState, useEffect } from "react";
import Toggle from "./Toggle";

function Apod({ user, setUser, logout }) {
  const [apod, setApod] = useState(false);
  const [date, setDate] = useState(false);
  const [message, setMessage] = useState("");
  const apiName = "apod";

  // set today's date for max date
  // const today = new Date().toJSON().slice(0, 10);
  
  var dt = new Date();

  dt.setTime(dt.getTime()+dt.getTimezoneOffset()*60*1000);

  var offset = -240;
  var edtDate = new Date(dt.getTime() + offset*60*1000);
  
  const today = edtDate.toJSON().slice(0, 10);

  const fetchApodWithDate = async (isRandom) => {
    let url;
    if (isRandom) {
      url = "http://localhost:5000/api/random-apod";
    } else {
      url = "http://localhost:5000/api/apod";
      if (date && date !== today) {
        url += "/" + date;
      }
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
    setMessage(data.message);
    setApod(false);
    return
    }
      

    setMessage("");
    setApod(data);
  };

  useEffect(() => {
    fetchApodWithDate();
  }, [date]); // eslint-disable-line

  return (
    <div className="apodMain">
      <div className="titleContainer">
      <h2>NASA APOD</h2>
        <Toggle apiName={apiName} />
      </div>
      {user.apiStatuses.apod && (
        <div className="apodContainer">
          {message && <p>{message}</p>}
          <h3 className="apiDescription">{apod.title}</h3>
          <p className="apodText">{apod.explanation}</p>
          
          <div className="imgWrapper">
            {/*conditional rendering*/}
            {apod.media_type === "video" && <iframe src={apod.url} title="apod"></iframe>}
            {apod.media_type === "image" && <img src={apod.url} alt=""/>}
          </div>
          <div className="dateContainer">
            <label htmlFor="pickDate">Pick a day:</label>
            <input
              value={apod.date || ""}
              type="date"
              id="pickDate"
              name="pickDate"
              min="1995-06-16"
              max={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="showMoreBtn" onClick={() => fetchApodWithDate(true)}>random apod</button>
        </div>
      )}
    </div>
  );
}

export default Apod;
