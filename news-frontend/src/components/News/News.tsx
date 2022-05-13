import React from "react";

import "./News.css";

export interface NewsProps {
  title: string;
  user: any;
  date: string;
  postid: string;
  tags: string[];
}

const News: React.FC<NewsProps> = (props) => {
  return (
    <div
      className="News"
      onClick={() => {
        window.location.href = `/post/${props.postid}`;
      }}
    >
      <h3>{props.title}</h3>
      <div className="news-tags">
        {props.tags.map((tag) => {
          return (
            <span key={tag}>
              <p>{"#" + tag}</p>
            </span>
          );
        })}
      </div>
      <span>
        Posted on {props.date?.slice(0, 10)} by user {props.user.username}
      </span>
    </div>
  );
};

export default News;
