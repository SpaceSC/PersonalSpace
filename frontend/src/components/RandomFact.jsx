import { useState, useEffect } from "react";
import Toggle from "./Toggle";

function RandomFact({ user, setUser, logout }) {
  const [randomFact, setRandomFact] = useState([]);
  const apiName = "random_fact";

  const randomFactFetch = async () => {
    const response = await fetch("http://localhost:5000/api/random-fact", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("myToken")}`
      },
    });

    const data = await response.json();

    //console.log(data);

    setRandomFact(data);
  };

  useEffect(() => {
    randomFactFetch();
  }, []);

  //console.log("random", user);

  return (
    <div className="factMain">
      <div className="titleContainer">
        <h2>Random fact</h2>
        <Toggle apiName={apiName} />
      </div>
      {user.apiStatuses.random_fact && (
        <div className="factContainer">
          <div className="fact">
            {!randomFact && <h6>Loading random fact...</h6>}
            <h3>{randomFact.fact}</h3>
            <p>Source: {randomFact.source}</p>
          </div>
          <button className="showMoreBtn" onClick={randomFactFetch}>new fact</button>
        </div>
      )}
    </div>
  );
}

export default RandomFact;
