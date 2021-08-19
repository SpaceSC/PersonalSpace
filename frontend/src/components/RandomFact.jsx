import { useState, useEffect } from "react";

function RandomFact({ user, setUser, logout }) {
  const [randomFact, setRandomFact] = useState([]);

  const randomFactFetch = async () => {
    const response = await fetch("/api/random-fact", {
      headers: {
        Authorization: localStorage.getItem("myToken"),
      },
    });

    const data = await response.json();

    //console.log(data);

    setRandomFact(data);
  };

  useEffect(() => {
    randomFactFetch();
  }, []);

  const toggle = async () => {
    const response = await fetch("/api/toggle-api-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("myToken"),
      },
      body: JSON.stringify({ status: !user.apiStatuses.random_fact, api: "random_fact" }), // if key is same as value, use it once
    });
    //If token is invalid/expired, log out user
    if (!response.ok) return logout();
    //const data = await response.json();

    setUser({ ...user, apiStatuses: { ...user.apiStatuses, random_fact: !user.apiStatuses.random_fact } });

    const data = await response.json();

    console.log(data);
  };
  //console.log(user);
  return (
    <div>
      <h2>Random fact</h2>
      {user.apiStatuses.random_fact && (
        <div>
          <div>
            {!randomFact && <h6>Loading random fact...</h6>}
            <h3>{randomFact.fact}</h3>
            <p>{randomFact.source}</p>
          </div>
          <button onClick={randomFactFetch}>new fact</button>
        </div>
      )}

      <button onClick={toggle}>toggle status</button>
    </div>
  );
}

export default RandomFact;
