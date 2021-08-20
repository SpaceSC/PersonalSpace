import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login({ login }) {
  let history = useHistory();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    //console.log(code);

    if (!code) {
      return history.push("/");
    }

    const loginPost = async () => {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }), // if key is same as value, use it once
      });
      const data = await response.json();

      //console.log(data); // the token
      if (!data.token) {
        return history.push("/");
      }
      localStorage.setItem("myToken", data.token);
      login(data.apiStatuses);

      history.push("/"); // can be used in javascript, redirects to home like Link would (inside return), or like Redirect would
    };
    loginPost();
  }, []); // eslint-disable-line 
  // disables warning in browser

  return <div>Loading...</div>;
}

export default Login;
