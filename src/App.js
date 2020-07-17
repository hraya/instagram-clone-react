import React from "react";
import Post from "./components/Post";
import "./css/App.css";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.pmg"
          alt="Insta Logo"
        />
      </div>
      <Post />
    </div>
  );
}

export default App;
