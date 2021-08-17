import { useState, useEffect } from "react";
import ISSOnGoogleMaps from "./ISSOnGoogleMaps";

function ISSCurrentLocation({ user, setUser, logout }) {
  const [spaceStation, setSpaceStation] = useState(false);
  const [issLat, setIssLat] = useState("");
  const [issLong, setIssLong] = useState("");

  useEffect(() => {
    const fetchSatellitesInSpace = async () => {
      const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");

      const data = await response.json();

      console.log(data);

      setSpaceStation(data);
      setIssLat(data.latitude);
      setIssLong(data.longitude);
    };

    const interval = setInterval(fetchSatellitesInSpace, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggle = async () => {
    const response = await fetch("/api/toggle-api-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("myToken"),
      },
      body: JSON.stringify({ status: !user.apiStatuses.iss_current_location, api: "iss_current_location" }), // if key is same as value, use it once
    });
    //If token is invalid/expired, log out user
    if (!response.ok) return logout();
    //const data = await response.json();

    setUser({
      ...user,
      apiStatuses: { ...user.apiStatuses, iss_current_location: !user.apiStatuses.iss_current_location },
    });

    const data = await response.json();

    console.log(data);
  };
  //console.log(user);
  return (
    <div>
      <h2>My Favorite Space Station</h2>
      {user.apiStatuses.iss_current_location && (
        <div>
          {!spaceStation && <h6>Loading Space Stations...</h6>}
          {spaceStation && (
            <div>
              <p>{spaceStation.name}</p>
              <p>NORAD ID: {spaceStation.id}</p>
              <p>{spaceStation.latitude}</p>
              <p>{spaceStation.longitude}</p>
            </div>
          )}
          <ISSOnGoogleMaps issLat={issLat} issLong={issLong}/>
        </div>
      )}
      <button onClick={toggle}>toggle status</button>
    </div>
  );
}

export default ISSCurrentLocation;
