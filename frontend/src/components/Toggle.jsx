import { useContext } from "react";
import { AppContext } from "../AppContext";

function Toggle({apiName}) {
  const { user, setUser, logout } = useContext(AppContext);

  const toggle = async () => {
    const response = await fetch(`http://localhost:5000/api/toggle-api-status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
      body: JSON.stringify({ status: !user.apiStatuses[apiName], api: apiName }),
    });
    //If token is invalid/expired, log out user
    if (!response.ok) return logout();
    //const data = await response.json();

    setUser({ ...user, apiStatuses: { ...user.apiStatuses, [apiName]: !user.apiStatuses[apiName] } });

    const data = await response.json();

    console.log(data);
  };
 // console.log(user);
  return (
    <button className="showMoreBtn" onClick={toggle}>{user.apiStatuses[apiName] ? "-" : "+"}</button>
  );
}

export default Toggle;
