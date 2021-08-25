import Mission from "../components/Mission";

function MissionPage({user, logout}) {
  return (
    <div>
      <Mission user={user}/>
    </div>
  );
}

export default MissionPage;
