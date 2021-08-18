import ISSOnGoogleMaps from "./ISSOnGoogleMaps";

function ISSCurrentLocation({ user, setUser, logout }) {
  

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
        <ISSOnGoogleMaps />
      )}
      <button onClick={toggle}>toggle status</button>
    </div>
  );
}

export default ISSCurrentLocation;