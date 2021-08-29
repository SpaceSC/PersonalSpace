import { useState, useEffect } from "react";
import Toggle from "./Toggle";

function PeopleInSpace({ user, setUser, logout }) {
  const [spacePeople, setSpacePeople] = useState([]);
  const apiName = "people_in_space";
 


  useEffect(() => {
    const peopleInSpaceFetch = async () => {
      const response = await fetch("http://api.open-notify.org/astros.json");

      const data = await response.json();

      setSpacePeople(data.people);
    };
    peopleInSpaceFetch();
  }, []);

  return (
    <div>
      <div className="titleContainer">
        <h2>How Many People Are In Space Right Now</h2>
        <Toggle apiName={apiName} />
      </div>
      {user.apiStatuses.people_in_space && (
        <div className="people">
          {!spacePeople.length && <h6>Loading PeopleInSpace...</h6>}
          {spacePeople.map((spacePerson, index) => (
            <p key={index}>{spacePerson.name} ({spacePerson.craft})</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PeopleInSpace;
