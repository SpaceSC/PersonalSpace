import { useState } from "react";

function SetUsername({ user, setUser, logout }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const postUsername = async () => {
    const response = await fetch("/api/set-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('myToken'),
      },
      body: JSON.stringify({ username }), // if key is same as value, use it once
      });
      //If token is invalid/expired, log out user
      
    //const data = await response.json();

    const data = await response.json();
    
    if(response.status === 400) return setMessage(data.message)
    if(response.status === 401) return logout();
    if(response.status === 406) return setMessage(data.message)

    setUser({ ...user, username });
    
    setUsername("");
    setMessage("");
  };
  //console.log(user);
  return (
    <div>
      {user && (
        <div>
          <p>{user.username}</p>
          <p>{message}</p>
          <input type="text" placeholder="New username" value={username} onInput={(e) => setUsername(e.target.value)} />
        </div>
      
      )}
      <button onClick={postUsername}>Set username</button>
    </div>
  )
}

export default SetUsername;
