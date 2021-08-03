import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="App">
     
      </div>

      <Router>
        <Switch>
          <Route exact path="/" />
          <Route exact path="/login" />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
