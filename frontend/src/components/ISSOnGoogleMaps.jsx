import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import customMarker from "../img/iss-marker.png";

function ISSOnGoogleMaps() {
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
    fetchSatellitesInSpace();

    const interval = setInterval(fetchSatellitesInSpace, 2000);
    // cleanup runs when component is not rendered, it stops fetching
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  const center = {
    lat: Number(issLat),
    lng: Number(issLong),
  };
  //console.log(user);
  return (
    <div>
      {!spaceStation && <h6>Loading Space Station...</h6>}
      {spaceStation && (
        <div>
          <p>{spaceStation.name}</p>
          <p>NORAD ID: {spaceStation.id}</p>
          <p>{spaceStation.latitude}</p>
          <p>{spaceStation.longitude}</p>
        </div>
      )}
      <LoadScript googleMapsApiKey="AIzaSyCtJXTfBMyZbYS1w5MopUzSYWMO9mYFDLw">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={2}>
          <Marker icon={customMarker} position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default ISSOnGoogleMaps;
