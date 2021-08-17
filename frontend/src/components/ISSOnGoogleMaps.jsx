import { GoogleMap, LoadScript, TrafficLayer, Marker } from "@react-google-maps/api";
import customMarker from "../img/iss-marker.png";

function ISSOnGoogleMaps({ issLat, issLong }) {
  const containerStyle = {
    width: "300px",
    height: "300px",
  };

  // const center = {
  //   lat: -17.8,
  //   lng: 178
  // };
  const center = {
    lat: Number(issLat),
    lng: Number(issLong)
  };
  //console.log(user);
  return (
    <LoadScript googleMapsApiKey="AIzaSyCtJXTfBMyZbYS1w5MopUzSYWMO9mYFDLw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
      >
        <Marker
          icon={customMarker}
          position={center}
        />
        <TrafficLayer /> renders traffic info
      </GoogleMap>
    </LoadScript>
  );
}

export default ISSOnGoogleMaps;
