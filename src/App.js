import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Input } from "@material-ui/core";
import Post from "./components/Post";
import ImageUpload from "./components/ImageUpload.js";
import "./css/App.css";
import { db, auth } from "./firebase.js";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");

  const signup = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return authUser.user.updateProfile({
          displayName: username
        });
      })
      .catch(e => alert(e.message));

    setOpen(false);
  };

  const signin = event => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch(e => alert(e.message));

    setOpenSignIn(false);
  };

  const logout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
      } else {
        setUser("");
      }
    });
    return () => unsubscribe();
  }, [user, username]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setPosts(
          snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
          }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Insta Logo"
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={signup}>Sign Up</Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="Insta Logo"
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button onClick={signin}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="Insta Logo"
        />

        {user ? (
          <Button onClick={logout}> Logout</Button>
        ) : (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              user={user}
              postId={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
        </div>
        <div className="app__postsRight">
          {/* <InstagramEmbed
            url=""
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          /> **/}
        </div>
      </div>
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h4>Login to upload </h4>
      )}
    </div>
  );
}

export default App;
