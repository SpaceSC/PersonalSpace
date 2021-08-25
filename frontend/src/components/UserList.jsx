import { useState, useEffect } from "react";
import DeleteAccount from "./DeleteAccount";

function UserList({ user, setUser, logout }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/user-list", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          }
        });

    const data = await response.json();

     console.log("users", data);

      setUsers(data);
    };

  useEffect(() => {
    fetchUsers();
      
  }, [])
  

  return (
    <div>
      <h2>Users</h2>
      {user && (
        <div>
          {!users.length && <h6>Loading users...</h6>}
          {users.map((listedUser, index) => (
            <div key={index}><img src={listedUser.picture} alt=""/>{listedUser.given_name}{listedUser.username && ` (${listedUser.username})`}{user.is_admin && <DeleteAccount user={user} selfAndAdmin={listedUser.google_id === user.google_id} userId={listedUser.google_id} fetchUsers={fetchUsers}/>}</div>
          ))}
        </div>
      )}

      
    </div>
  );
}

export default UserList;
