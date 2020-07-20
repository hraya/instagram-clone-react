import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase.js";
import "../css/Post.css";

const Post = ({ username, postId, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot(snapshot => {
          setComments(snapshot.docs.map(doc => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Avatar"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="img" />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
        {console.log(comments)}
      </h4>
    </div>
  );
};

export default Post;
