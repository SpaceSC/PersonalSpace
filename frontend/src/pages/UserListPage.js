import UserList from "../components/UserList";

function UserListPage({user, logout}) {
  return (
    <div>
      <UserList user={user} logout={logout}/>
    </div>
  );
}

export default UserListPage;
