import { useState, useEffect } from "react";
import Toggle from "./Toggle";

function PeopleInSpace({ user }) {
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
    <div className="peopleMain">
      <div className="titleContainer">
        <h2>People In Space</h2>
        <Toggle apiName={apiName} />
      </div>
      {user.apiStatuses.people_in_space && (
        <div className="peopleContainer">
          <h3 className="peopleDescription">How Many People Are On Space Stations Right Now</h3>
          <div className="lists">
            {!spacePeople.length && <h6>Loading PeopleInSpace...</h6>}
            <div className="peopleIss station">
              <div className="craft">ISS</div>
              {spacePeople
                .filter((spacePerson) => spacePerson.craft === "ISS")
                .map((spacePerson, index) => (
                  <p key={index}>{spacePerson.name}</p>
                ))}
            </div>
            <div className="peopleTiangong station">
              <div className="craft">Tiangong</div>
              {spacePeople
                .filter((spacePerson) => spacePerson.craft === "Tiangong")
                .map((spacePerson, index) => (
                  <p key={index}>{spacePerson.name}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeopleInSpace;
