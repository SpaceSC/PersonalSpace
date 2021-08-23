import { useState, useEffect } from "react";
import PeopleInSpace from "./PeopleInSpace";
import RandomFact from "./RandomFact";
import ISSCurrentLocation from "./ISSCurrentLocation";
import DeleteAccount from "./DeleteAccount";
import Apod from "./Apod";

function Home({ loginAuth, user, setUser, logout }) {
  
  return (
    <div>
      {!user && <button onClick={loginAuth}>Login</button>}
      {user && <button onClick={logout}>Log Out</button>}
      {user && <RandomFact user={user} setUser={setUser} logout={logout} />}
      {user && <PeopleInSpace user={user} setUser={setUser} logout={logout} />}
      {user && <ISSCurrentLocation user={user} setUser={setUser} logout={logout} />}
      {user && <Apod user={user} setUser={setUser} logout={logout} />}
      {user && <DeleteAccount />}
    </div>
  );
}

export default Home;
