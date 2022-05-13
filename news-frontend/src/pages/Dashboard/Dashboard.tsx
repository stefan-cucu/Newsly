/*
 * Custom component for dashboard page
 */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import News from "../../components/News/News";
import auth from "../../config/firebase.config";
import { fetchPosts, NewsPost } from "../../store/PostSlice";
import { addTags, fetchUser, User } from "../../store/UserSlice";

import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.post.posts);
  const user = useSelector((state: any) => state.user);

  // Check if user is logged in, otherwise redirect to login page
  auth.onAuthStateChanged((auth) => {
    if (!auth) {
      window.location.href = "/login";
    }
    else{
      dispatch(fetchUser(auth.uid));
    }
  });

  // Fetch posts from database every time the user tags are changed
  React.useEffect(() => {
    if (auth.currentUser) {
      console.log(user.userid);
      dispatch(fetchPosts(user.tags));
    }
  }, [user]);

  return (
    <div className="Dashboard">
      <div className="dashboard-container">
        <Navbar />
        {user.role === "user" && (<TagInput />)}
        <div className="grid-container">
          {posts.map((post: NewsPost) => {
            return (
              <News
                key={post.postid}
                title={post.title}
                user={post.user}
                date={post.createdAt}
                postid={post.postid}
                tags={post.tags.split("#")}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

/*
 * Custom component for user hashtag input
 * Available only for normal users
 */
const TagInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [currentTag, setCurrentTag] = React.useState("");

  return (
    <div className="tag-input">
      <h2>User tags</h2>
      <div className="user-tags">
        {user.tags.split("#").map((tag: string) => {
          if (tag === "") return;
          return (
            <span
              key={tag}
              onClick={() => {
                dispatch(addTags(user.tags.replace("#" + tag, "")));
              }}
            >
              <p>{"#" + tag}</p>
            </span>
          );
        })}
      </div>
      <input
        type="text"
        placeholder="Add a tag"
        value={currentTag}
        onChange={(e) => {
          setCurrentTag(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setCurrentTag("");
            dispatch(addTags(user.tags + "#" + currentTag));
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
