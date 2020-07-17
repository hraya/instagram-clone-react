import React from "react";
import "../css/Post.css";

const Post = () => {
  return (
    <div>
      <h3>Username</h3>
      <img
        className="post__image"
        src="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
        alt="img"
      />

      <h4>caption under image</h4>
    </div>
  );
};

export default Post;