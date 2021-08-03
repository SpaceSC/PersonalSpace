import { useState, useEffect } from "react";

function PeopleInSpace({ user, setUser }) {
  const [spacePeople, setSpacePeople] = useState([]);

  useEffect(() => {
    const peopleInSpaceFetch = async () => {
      const response = await fetch("http://api.open-notify.org/astros.json");

      const data = await response.json();

      console.log(data);
      setSpacePeople(data.people);
    };
    peopleInSpaceFetch();
  }, []);

  const toggle = async () => {
    // const response = await fetch("/api/toggle-status", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": localStorage.getItem('myToken'),
    //   },
    //   body: JSON.stringify({ status: !user.apiStatuses.people_in_space, api: "people_in_space" }), // if key is same as value, use it once
    //   });
    // const data = await response.json();

    setUser({ ...user, apiStatuses: { ...user.apiStatuses, people_in_space: !user.apiStatuses.people_in_space } });
  };
  console.log(user);
  return (
    <div>
      {user.apiStatuses.people_in_space && (
        <div>
          <h2>How Many People Are In Space Right Now</h2>
          {!spacePeople.length && <h6>Loading PeopleInSpace...</h6>}
          {spacePeople.map((spacePerson, index) => (
            <p key={index}>{spacePerson.name}</p>
          ))}
        </div>
      )}

      <button onClick={toggle}>toggle status</button>
    </div>
  );
}

export default PeopleInSpace;
