import { useState, useEffect } from "react";

function UserList({ user, setUser, logout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:5000/api/user-list", {
            headers: {
              "Content-Type": "application/json",
              "Authorization": localStorage.getItem('myToken'),
            }
          });
  
      const data = await response.json();
  
       console.log("users", data);
  
        setUsers(data);
      };
      fetchUsers();
  }, [])
  

  return (
    <div>
      <h2>Users</h2>
      {user && (
        <div>
          {!users.length && <h6>Loading users...</h6>}
          {users.map((user, index) => (
            <p key={index}>{user.given_name}{user.username && ` (${user.username})` }</p>
          ))}
        </div>
      )}

      
    </div>
  );
}

export default UserList;
