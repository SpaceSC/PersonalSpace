import { useState, useEffect } from "react";

function Apod({ user, setUser, logout }) {
  const [apod, setApod] = useState(false);
  const [date, setDate] = useState(false);

   // set today's date for max date
  const today = new Date().toJSON().slice(0,10);
  console.log(today);

  useEffect(() => {
    const fetchApodWithDate = async () => {
      let url =
      "/api/apod";
    if (date && date !== today) {
      url += "/" + date;
    }
      const response = await fetch(url, {
        headers: {
          Authorization: localStorage.getItem("myToken"),
        },
      });

      const data = await response.json();

      //console.log(data);

      setApod(data);
    };
    fetchApodWithDate();
  }, [date]);// eslint-disable-line

  const toggle = async () => {
    const response = await fetch("/api/toggle-api-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("myToken"),
      },
      body: JSON.stringify({ status: !user.apiStatuses.apod, api: "apod" }), // if key is same as value, use it once
    });
    //If token is invalid/expired, log out user
    if (!response.ok) return logout();
    //const data = await response.json();

    setUser({
      ...user,
      apiStatuses: { ...user.apiStatuses, apod: !user.apiStatuses.apod },
    });

    const data = await response.json();

    console.log(data);
  };
  //console.log(user);
  return (
    <div>
      <h2>NASA APOD</h2>
      {user.apiStatuses.apod && (
        <div>
          <p>{apod.title}</p>
          <p>{apod.explanation}</p>
        <div className="dateContainer">
          <label htmlFor="pickDate">Pick a day:</label>
          <input
            type="date"
            id="pickDate"
            name="pickDate"
            min="1995-06-16"
            max={today}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        {/*conditional rendering*/}
        {apod.media_type === "video" && (
          <iframe width="960" height="540" src={apod.url}></iframe>
        )}
        {apod.media_type === "image" && (
          <img width="560" src={apod.url}></img>
        )}
        </div>
      )}
      <button onClick={toggle}>toggle status</button>
    </div>
  );
}

export default Apod;
