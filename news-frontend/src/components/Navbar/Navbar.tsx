import React from "react";
import auth from "../../config/firebase.config";
import { useSelector } from "react-redux";

import "./Navbar.css";

const Navbar: React.FC = () => {
  const userRole = useSelector((state: any) => state.user.role);
  return (
    <div className="dashboard-header">
      <h1 onClick={()=>{window.location.href="/"}}>News app</h1>
      <div className="dashboard-header-right">
        {userRole === "journalist" ? (
          <p
            onClick={() => {
              window.location.href = "/new-post";
            }}
          >
            New post
          </p>
        ) : <div></div>}
        <p
          onClick={() => {
            auth.signOut();
          }}
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Navbar;
