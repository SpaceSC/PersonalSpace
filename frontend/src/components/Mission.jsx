
function Mission({ user }) {
  console.log(user.name);

  return (
    <div>
      <h2>Mission</h2>
      {user && (
        <div>
          <p>{user.given_name}</p>
          <p>
            `Dear {user.username ? user.username : user.given_name},

            Our mission is to let you create your personal space, where you can see space stuff that you're interested in.`
          </p>
        </div>
      )}

      
    </div>
  );
}

export default Mission;
