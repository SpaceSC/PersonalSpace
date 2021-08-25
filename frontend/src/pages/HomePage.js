import Home from "../components/Home";

function HomePage({user, setUser, logout, loginAuth}) {
  return (
    <div>
      {user && <Home user={user} setUser={setUser} logout={logout} loginAuth={loginAuth}/>}
    </div>
  );
}

export default HomePage;
