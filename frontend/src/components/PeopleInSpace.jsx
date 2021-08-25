import { useState, useEffect } from "react";

function PeopleInSpace({ user, setUser, logout }) {
  const [spacePeople, setSpacePeople] = useState([]);

  useEffect(() => {
    const peopleInSpaceFetch = async () => {
      const response = await fetch("http://api.open-notify.org/astros.json");

      const data = await response.json();

     //console.log(data);

      setSpacePeople(data.people);
    };
    peopleInSpaceFetch();
  }, []);

  const toggle = async () => {
    const response = await fetch("http://localhost:5000/api/toggle-api-status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
      body: JSON.stringify({ status: !user.apiStatuses.people_in_space, api: "people_in_space" }), // if key is same as value, use it once
      });
      //If token is invalid/expired, log out user
      if(!response.ok) return logout();
    //const data = await response.json();

    setUser({ ...user, apiStatuses: { ...user.apiStatuses, people_in_space: !user.apiStatuses.people_in_space } });

    const data = await response.json();

    console.log(data);
  };
  //console.log(user);
  return (
    <div>
      <h2>How Many People Are In Space Right Now</h2>
      {user.apiStatuses.people_in_space && (
        <div className="people">
          {!spacePeople.length && <h6>Loading PeopleInSpace...</h6>}
          {spacePeople.map((spacePerson, index) => (
            <p key={index}>{spacePerson.name}</p>
          ))}
        </div>
      )}

      <button className="showMoreBtn" onClick={toggle}>{user.apiStatuses.people_in_space ? "-" : "+"}</button>
    </div>
  );
}

export default PeopleInSpace;
