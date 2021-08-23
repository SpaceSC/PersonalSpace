import Home from "../components/Home";

function ProfilePage({user, setUser, logout, loginAuth}) {
  return (
    <div>
      {user && <Home user={user} setUser={setUser} logout={logout} loginAuth={loginAuth}/>}
    </div>
  );
}

export default ProfilePage;
