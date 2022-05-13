/*
 * Custom component for new post creation page
 */
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import auth from "../../config/firebase.config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./NewPost.css";
import { useSelector } from "react-redux";
import { User } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../store/PostSlice";

const NewPost: React.FC = () => {
  const dispath = useDispatch();
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [currentTag, setCurrentTag] = React.useState("");
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const userState: User = useSelector((state: any) => state.user);

  // Check if user is logged in, otherwise redirect to login page
  // If user is not journalist, redirect to dashboard page
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "/login";
    }
    else{
      if(userState.role === 'user'){
        window.location.href = '/';
      }
    }
  });

  // Handle post creation
  const sendPost = () => {
    if (
      title.length === 0 ||
      tags.length === 0 ||
      editorState.getCurrentContent().hasText() === false
    ) {
      alert("Please fill all the fields");
      return;
    }
    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    const url = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? "http://localhost:8080/api/posts" : "/api/posts";
    console.log(url);

    auth.currentUser?.getIdToken().then((token) => {
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
          userid: auth.currentUser?.uid,
          tags: tags,
        }),
      }).then((res) => {
        console.log('AICIac');
        dispath(fetchPosts(''));
        setTimeout(() => {
          window.location.href = "/";
        }, 200);
      });
    });
  };

  return (
    <div className="NewPost">
      <div className="post-container">
        <Navbar />
        <div className="post-header">
          <div className="title-input">
            <h2>Post title:</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              sendPost();
            }}
          >
            Send
          </button>
        </div>
        <div className="tag-input">
          <h2>Post tags</h2>
          <div className="user-tags">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => {
                  // Remove tag from tags
                  setTags(tags.filter((t) => t !== tag));
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Tags"
            value={currentTag}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTags([...tags, currentTag]);
                setCurrentTag("");
              }
            }}
            onChange={(e) => {
              setCurrentTag(e.target.value);
            }}
          />
        </div>

        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClass"
          wrapperClassName="wrapperClass"
          editorClassName="editorClass"
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
};

export default NewPost;
