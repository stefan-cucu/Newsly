/*
 * Custom component for post view page
 */
import React from "react";
import { useParams } from "react-router-dom";
import { NewsPost } from "../../store/PostSlice";
import draftToHtml from "draftjs-to-html";
import Navbar from "../../components/Navbar/Navbar";
import auth from "../../config/firebase.config";

import "./Post.css";
import { useSelector } from "react-redux";

const Post: React.FC = () => {
  const params = useParams();
  const postId = params.id;
  const post = useSelector((state: any) => state.post.posts.find((post: NewsPost) => post.postid === postId));

  // Check if user is logged in, otherwise redirect to login page
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/login";
    }
  });

  return (
    <div className="Post">
      <div className="post-container">
        <Navbar />
        <h2>{post.title}</h2>
        <p>Created by {post.user.username} at {post.createdAt}</p>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{
            __html: draftToHtml(JSON.parse(post.content)),
          }}
        ></div>
      </div>
    </div>
  );
};

export default Post;
