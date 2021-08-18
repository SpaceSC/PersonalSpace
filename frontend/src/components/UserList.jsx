import { useState, useEffect } from "react";

function UserList({ user, setUser, logout }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user-list", {
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
  
 

  // const toggle = async () => {
  //   const response = await fetch("/api/toggle-api-status", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Authorization": localStorage.getItem('myToken'),
  //     },
  //     body: JSON.stringify({ status: !user.apiStatuses.people_in_space, api: "people_in_space" }), // if key is same as value, use it once
  //     });
  //     //If token is invalid/expired, log out user
  //     if(!response.ok) return logout();
  //   //const data = await response.json();

  //   const data = await response.json();

  //   console.log(data);
  //   setUsers(data);
  // };
  //console.log(user);
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
