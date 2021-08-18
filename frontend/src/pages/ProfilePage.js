import SetUsername from "../components/SetUsername";

function ProfilePage({user, setUser, logout}) {
  return (
    <div>
      {user && <SetUsername user={user} setUser={setUser} logout={logout}/>}
    </div>
  );
}

export default ProfilePage;
