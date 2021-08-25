import Landing from "../components/Landing";

function HomePage({user, loginAuth}) {
  return (
    <div className="landingPage">
      {!user && <Landing user={user} loginAuth={loginAuth}/>}
    </div>
  );
}

export default HomePage;
