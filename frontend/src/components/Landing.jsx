
function Landing({ user, loginAuth }) {

  return (
    <div className="landingContainer">
      {!user && <h2>Personal Space</h2>}
      {!user && <div id="landing"></div>}
      {!user && <button id="landingLogin" className="showMoreBtn" onClick={loginAuth}>Login</button>}
    </div>
  );
}

export default Landing;
