import PeopleInSpace from "./PeopleInSpace";
import RandomFact from "./RandomFact";
import ISSCurrentLocation from "./ISSCurrentLocation";
import Apod from "./Apod";

function Home({ loginAuth, user, setUser, logout }) {
  
  return (
    <div className="homeContainer">
      {user && <RandomFact user={user} setUser={setUser} logout={logout} />}
      {user && <PeopleInSpace user={user} setUser={setUser} logout={logout} />}
      {user && <ISSCurrentLocation user={user} setUser={setUser} logout={logout} />}
      {user && <Apod user={user} setUser={setUser} logout={logout} />}
    </div>
  );
}

export default Home;
