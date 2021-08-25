
function Mission({ user }) {
  console.log(user.name);

  return (
    <div className="missionContainer">
      <h2>Mission</h2>
      {user && (
        <div className="mission">
          <p>{user.given_name}</p>
          <p>
            Dear {user.username ? user.username : user.given_name},<br/>
            Our mission is to let you create your personal space, where you can access space stuff that you're interested in.
          </p>
        </div>
      )}

      
    </div>
  );
}

export default Mission;
