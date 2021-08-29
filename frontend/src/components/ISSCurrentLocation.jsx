import ISSOnGoogleMaps from "./ISSOnGoogleMaps";
import Toggle from "./Toggle";

function ISSCurrentLocation({ user, setUser, logout }) {
  const apiName = "iss_current_location";

  return (
    <div className="IssMain">
      <div className="titleContainer">
        <h2>My Favorite Space Station</h2>
        <Toggle apiName={apiName}/>
      </div>
      
      {user.apiStatuses.iss_current_location && (
        <ISSOnGoogleMaps />
      )}
    </div>
  );
}

export default ISSCurrentLocation;
