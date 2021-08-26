import "./SCSS/style.scss";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { AppContext } from "./AppContext";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";
import UserListPage from "./pages/UserListPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import MissionPage from "./pages/MissionPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  let history = useHistory();
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");



  useEffect(() => {
    const checkLoggedIn = async () => {
      const myToken = localStorage.getItem("myToken");
      if (myToken) {
        const response = await fetch("http://localhost:5000/api/check-logged-in", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("myToken")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return login(data.apiStatuses, data.username);
        }
        if (response.status === 404) logout();
      }
    };
    checkLoggedIn();
  }, []);

  // redirects browser to url
  const loginAuth = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=531055017285-g439thvkf4n03d55vu40aoi1a62sn0rd.apps.googleusercontent.com&scope=openid%20email%20profile&redirect_uri=http%3A//localhost:3000/login&prompt=select_account`;
  };

  // decode token
  const login = (apiStatuses, username) => {
    const decoded = jwt_decode(localStorage.getItem("myToken"));
    setUser({
      google_id: decoded.google_id,
      picture: decoded.picture,
      name: decoded.given_name,
      is_admin: decoded.is_admin,
      apiStatuses: apiStatuses,
      username: username
    });
    console.log(apiStatuses);
  };

  const logout = () => {
    localStorage.removeItem("myToken");
    setUser(false);
    history.push("/");
  };

  const messageHandler = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <AppContext.Provider value={{user, setUser, messageHandler, logout}}>
      <div className="app">
        <div>
          <Navbar user={user} login={login} logout={logout} />
        </div>
        {message && <p>{message}</p>}
        {/* {!user && <div id="landing"></div>}
        {!user && <button className="showMoreBtn" onClick={loginAuth}>Login</button>} */}
        <Switch>
          <Route exact path="/">
            {!user && <LandingPage user={user} loginAuth={loginAuth}/>}
            <HomePage user={user} setUser={setUser} login={login} loginAuth={loginAuth} logout={logout}/>
          </Route>
          <Route exact path="/login">
            <Login login={login} />
          </Route>
          <Route exact path="/profile">
            {user && <ProfilePage user={user} setUser={setUser} logout={logout} />}
          </Route>
          <Route exact path="/users">
            {user && <UserListPage user={user} logout={logout} />}
          </Route>
          <Route exact path="/mission">
            {user && <MissionPage user={user}/>}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
