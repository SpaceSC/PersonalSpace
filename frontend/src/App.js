import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import jwt_decode from "jwt-decode";
import PeopleInSpace from "./components/PeopleInSpace";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const myToken = localStorage.getItem("myToken");
      if (myToken) {
        const response = await fetch("/api/check-logged-in", {
          headers: {
            Authorization: myToken,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return login(data.apiStatuses);
        }
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
      apiStatuses: apiStatuses,
    });
    console.log(apiStatuses);
  };

  const logout = () => {
    localStorage.removeItem("myToken");
    setUser(false);
  };

  return (
    <div>
      <div className="App">
        {!user && <button onClick={loginAuth}>Login</button>}
        {user && <button onClick={logout}>Log Out</button>}
        {user && <PeopleInSpace user={user} setUser={setUser} logout={logout} />}
      </div>

      <Router>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/login">
            <Login login={login} />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
