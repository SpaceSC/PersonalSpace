import { useState, useEffect } from "react";

function PeopleInSpace() {
  const [spacePeople, setSpacePeople] = useState([]);

  useEffect(() => {

    const peopleInSpaceFetch = async () => {
      const response = await fetch( "http://api.open-notify.org/astros.json" );

      const data = await response.json();

      console.log(data);
      setSpacePeople(data.people);
    };
    peopleInSpaceFetch();
  }, []);

  return (
    <div>
      <h2>How Many People Are In Space Right Now</h2>
      {!spacePeople.length && <h6>Loading PeopleInSpace...</h6>}
      { spacePeople.map((spacePerson) => 
          <p>{spacePerson.name}</p>
      )}
     
    </div>
  );
}

export default PeopleInSpace;
