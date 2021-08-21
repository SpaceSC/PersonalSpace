import "./App.css";
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppContext } from "./AppContext";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";
import PeopleInSpace from "./components/PeopleInSpace";
import RandomFact from "./components/RandomFact";
import ISSCurrentLocation from "./components/ISSCurrentLocation";
import DeleteAccount from "./components/DeleteAccount";
import Apod from "./components/Apod";
import UserListPage from "./pages/UserListPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      const myToken = localStorage.getItem("myToken");
      if (myToken) {
        const response = await fetch("http://localhost:5000/api/check-logged-in", {
          headers: {
            Authorization: myToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return login(data.apiStatuses);
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
  const login = (apiStatuses) => {
    const decoded = jwt_decode(localStorage.getItem("myToken"));
    setUser({
      google_id: decoded.google_id,
      picture: decoded.picture,
      name: decoded.given_name,
      is_admin: decoded.is_admin,
      apiStatuses: apiStatuses,
    });
    console.log(apiStatuses);
  };

  const logout = () => {
    localStorage.removeItem("myToken");
    setUser(false);
  };

  const messageHandler = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <AppContext.Provider value={{user, messageHandler, logout}}>
      <div>
        <div className="App">
          <Navbar user={user} login={login} logout={logout} />
        </div>
        {message && <p>{message}</p>}
        <Switch>
          <Route exact path="/">
            {!user && <button onClick={loginAuth}>Login</button>}
            {user && <button onClick={logout}>Log Out</button>}
            {user && <RandomFact user={user} setUser={setUser} logout={logout} />}
            {user && <PeopleInSpace user={user} setUser={setUser} logout={logout} />}
            {user && <ISSCurrentLocation user={user} setUser={setUser} logout={logout} />}
            {user && <Apod user={user} setUser={setUser} logout={logout} />}
            {user && <DeleteAccount />}
          </Route>
          {/* <Route exact path="/profile">
          <Profile login={login} />
        </Route> */}
          <Route exact path="/login">
            <Login login={login} />
          </Route>
          <Route exact path="/profile">
            {user && <ProfilePage user={user} logout={logout} />}
          </Route>
          <Route exact path="/users">
            {user && <UserListPage user={user} logout={logout} />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </AppContext.Provider>
  );
}

export default App;
