/*
 * Custom component for login page
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLongArrowRight, faUser } from "@fortawesome/free-solid-svg-icons";
import auth from "../../config/firebase.config";
import HeaderImg from "../../assets/user.png";

import "./Login.css";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/UserSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email.includes("@")){
      setError("Username cannot contain @");
      return;
    }
    auth
      .signInWithEmailAndPassword(email + "@newsapp.demo", password)
      .then((res) => {
        dispatch(fetchUser(res.user?.uid));
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="Login">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="header">
          <h1>Login</h1>
          <img src={HeaderImg} alt="" />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span>
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
        </div>
        <a href="/register">Create an account</a>
        <button type="submit">
          <FontAwesomeIcon icon={faLongArrowRight} />
        </button>
        {
          error.length > 0 && (
            <div className="error-box">
              <p>{error}</p>
            </div>
          )
        }
      </form>
    </div>
  );
};

export default Login;
