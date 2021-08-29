import { Link } from "react-router-dom";
import logo from "../img/logo.png";

function Navbar({ user, logout }) {
  return (
    <div className="navContainer">
      <div className="navLinkContainer">
        <Link to="/" className="nav-link">
          <img id="logo" src={logo} alt="logo"></img>
        </Link>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user && (
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        )}
        {!user && (
          <a href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${encodeURIComponent(process.env.REACT_APP_CLIENT_ID)}&scope=openid%20email%20profile&redirect_uri=${encodeURIComponent(process.env.REACT_APP_REDIRECT_URI)}&prompt=select_account`} className="nav-link">
            Login
          </a>
        )}
        {user && (
          <Link to="/users" className="nav-link">
            Users
          </Link>
        )}
        {user && (
          <Link to="/mission" className="nav-link">
            Mission
          </Link>
        )}
        {user && (
          <Link to="/" className="nav-link" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
      <div className="userContainer">
        {user && <p>{user.username ? user.username : user.name}</p> }
        {user && <img src={user.picture} alt=""/>}
      </div>
    </div>
  );
}

export default Navbar;
