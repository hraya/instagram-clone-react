import React from "react";
import Post from "./components/Post";
import "./css/App.css";

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Insta Logo"
        />
      </div>
      <Post
        username="bossman"
        caption="This is coming from props"
        imageUrl="https://www.freecodecamp.org/news/content/images/size/w2000/2020/02/Ekran-Resmi-2019-11-18-18.08.13.png"
      />
    </div>
  );
}

export default App;
