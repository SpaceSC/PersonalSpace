function FilterUsers({ users, setFilteredUsers }) {

  const filterHandler = (e) => {
    setFilteredUsers(users.filter(user => user.given_name.toLocaleLowerCase("hu").includes(e.target.value.toLocaleLowerCase("hu")) || user.username.toLocaleLowerCase("hu").includes(e.target.value.toLocaleLowerCase("hu"))));

  }
  
  console.log(users);
  return (
    <div className="filterUsersContainer">
      <p>Search</p>
      <input type="text" placeholder="Name or username" onInput={filterHandler}/>
    </div>
  );
}

export default FilterUsers;
