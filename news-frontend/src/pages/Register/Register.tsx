/*
 * Custom component for register page
 */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faUser,
  faLongArrowRight,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";
import HeaderImg from "../../assets/user.png";

import "./Register.css";
import auth from "../../config/firebase.config";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/UserSlice";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("user");
  const [error, setError] = React.useState("");

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.includes("@")) {
      setError("Username cannot contain @");
      return;
    }
    // If credentials are valid, create a new user 
    const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8080/api/users" : "/api/users";
    auth
      .createUserWithEmailAndPassword(username + "@newsapp.demo", password)
      .then((res) => {
        console.log(res);
        auth.currentUser?.getIdToken().then((token) => {
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userid: auth.currentUser?.uid,
              username: username,
              role: role,
            }),
          }).then((res) => {
            auth.onAuthStateChanged((user) => {
              if (user) {
                dispatch(fetchUser(user.uid));
                window.location.href = "/";
              }
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
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
          <h1>Register</h1>
          <img src={HeaderImg} alt="" />
        </div>
        <div className="input">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="input">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <span>
            <FontAwesomeIcon icon={faLock} />
          </span>
        </div>
        <div className="input">
          <select
            onChange={(e) => {
              setRole(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="user" selected>User</option>
            <option value="journalist">Journalist</option>
          </select>
          <span>
            <FontAwesomeIcon icon={faClipboard} />
          </span>
        </div>
        <a href="/login">Login with an existing account</a>
        <button type="submit">
          <FontAwesomeIcon icon={faLongArrowRight} />
        </button>
        {error.length > 0 && (
          <div className="error-box">
            <p>{error}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
