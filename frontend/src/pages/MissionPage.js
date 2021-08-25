import Mission from "../components/Mission";

function UserListPage({user, logout}) {
  return (
    <div>
      <Mission user={user}/>
    </div>
  );
}

export default UserListPage;
