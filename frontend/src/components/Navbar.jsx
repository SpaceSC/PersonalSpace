import { Link } from "react-router-dom";
//import Logout from "./Logout";

function Navbar({ user, logout }) {
  return (
    <div>
      <div>
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user && (
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
        )}
        {!user && (
          <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=531055017285-g439thvkf4n03d55vu40aoi1a62sn0rd.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login&prompt=select_account" className="nav-link">
            Login
          </a>
        )}
        {user && (
          <Link to="/users" className="nav-link">
            Users
          </Link>
        )}
        {user && (
          <Link to="/users" className="nav-link" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
      <div>
        {user && <p>{user.name}</p> }
        {user && <img src={user.picture} alt=""/>}
      </div>
    </div>
  );
}

export default Navbar;
