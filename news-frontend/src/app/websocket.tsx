import React from "react";
import { useDispatch, useSelector } from "react-redux";
import auth from "../config/firebase.config";
import { fetchPosts } from "../store/PostSlice";

const WebSocketProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  if (!auth.currentUser) {
    console.log(auth.currentUser);
    return <>{children}</>;
  }
  const url =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "ws://localhost:8081/ws"
      : "ws://" + window.location.hostname + ":8081/ws";
  const socket = new WebSocket(url);

  socket.addEventListener("open", () => {
    console.log("connected");
  });
  socket.addEventListener("message", (event) => {
    if (auth.currentUser) {
      dispatch(fetchPosts(user.tags));
    }
    console.log("New post!");
  });

  return <>{children}</>;
};

export default WebSocketProvider;
