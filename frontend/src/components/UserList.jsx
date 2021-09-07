import { useState, useEffect } from "react";
import DeleteAccount from "./DeleteAccount";
import FilterUsers from "./FilterUsers";

function UserList({ user }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/api/user-list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("myToken")}`,
      },
    });

    const data = await response.json();

    console.log("users", data);

    setUsers(data);
    setFilteredUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {user && (
        <div className="filterUsersContainer">
          <FilterUsers users={users} setFilteredUsers={setFilteredUsers} />
          {!users.length && <h6>Loading users...</h6>}
          {!filteredUsers.length && <h6>No such user found in the database</h6>}
          {filteredUsers.map((listedUser, index) => (
            <div key={index}>
              <div className="listedUser">
                <img src={listedUser.picture} alt="" />
                {listedUser.given_name}
                {listedUser.username && ` (${listedUser.username})`}
              </div>
              {user.is_admin && (
                <DeleteAccount
                  user={user}
                  selfAndAdmin={listedUser.google_id === user.google_id}
                  userId={listedUser.google_id}
                  fetchUsers={fetchUsers}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
