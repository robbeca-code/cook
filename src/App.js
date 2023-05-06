import "./App.css";
import React from "react";
import Home from "./routes/Home";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NonPage from "./routes/NonPage";
import ShaApp from "./routes/ShareAndApply";
import Apply from "./routes/Apply";
import { oneServing, dessert } from "./routes/Apply-data";
import ApplyContent from "./routes/ApplyContent";
import Share from "./routes/Share";
import { food, product } from "./routes/Share-data";
import ShareContent from "./routes/ShareContent";
import Recipe from "./routes/Recipe";
import Mypage from "./routes/Mypage";
import { tunaCan } from "./routes/Recipe-data";
import RecipeContent from "./routes/RecipeContent";
import Chat from "./routes/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  changeEmail,
  changePasswd,
  changeName,
  setLogin,
  toggleMenuBtn,
  changeTarget,
} from "./store";

function App() {
  const [clickedLoginBtn, setClickedLoginBtn] = useState(false);
  const [chats, setChats] = useState([]);

  const userName = useSelector((state) => {
    return state.loginInfo.name;
  });

  const isLogin = useSelector((state) => {
    return state.login;
  });

  const dispatch = useDispatch();

  return (
    <div className="app">
      <header className="appHeader">
        <nav className="toolBar">
          <div className="barItem">
            <button
              type="button"
              onClick={() => {
                dispatch(toggleMenuBtn());
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/public-assets/menu.png"}
                alt="menu icon"
                className="topIcon menu"
              />
            </button>
            <Link
              to="/"
              className="logo"
              onClick={() => {
                dispatch(changeTarget("home"));
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/public-assets/logo.png"}
                alt="logo"
              />
            </Link>
          </div>

          <div className="barItem">
            <Link to="#" className="search">
              <img
                src={process.env.PUBLIC_URL + "/public-assets/search.png"}
                alt="search icon"
                className="topIcon"
              />
            </Link>

            {isLogin ? (
              <CompletedLogin userName={userName} />
            ) : (
              <button
                type="button"
                className="loginBtn"
                onClick={() => {
                  clickedLoginBtn
                    ? setClickedLoginBtn(false)
                    : setClickedLoginBtn(true);
                }}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      {clickedLoginBtn ? (
        <LoginModal setClickedLoginBtn={setClickedLoginBtn} />
      ) : null}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NonPage />} />

        <Route path="/recipe" element={<Recipe />} />
        <Route path="/recipe/tunaCan" element={<RecipeContent />} />

        <Route path="/share-apply" element={<ShaApp />} />
        <Route path="/share-apply/apply" element={<Apply />} />
        <Route
          path="/share-apply/apply/:id"
          element={<ApplyContent chats={chats} setChats={setChats} />}
        />
        <Route path="/share-apply/share" element={<Share />} />
        <Route
          path="/share-apply/share/:id"
          element={<ShareContent chats={chats} setChats={setChats} />}
        />

        <Route path="/chat" element={<Chat chats={chats} />} />

        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
}

function LoginModal({ setClickedLoginBtn }) {
  let dispatch = useDispatch();

  const handleLoginBtn = () => {
    dispatch(setLogin());
    setClickedLoginBtn(false);
  };

  return (
    <div className="loginContainer">
      <article className="loginModal">
        <header className="title">
          <h1>로그인</h1>
        </header>

        <div className="loginItem">
          <strong>이메일</strong>
          <input
            type="email"
            onChange={(e) => dispatch(changeEmail(e.target.value))}
          />
        </div>

        <div className="loginItem">
          <strong>비밀번호</strong>
          <input
            type="password"
            onChange={(e) => dispatch(changePasswd(e.target.value))}
          />
        </div>

        <div className="loginItem">
          <strong>닉네임</strong>
          <input
            type="text"
            onChange={(e) => dispatch(changeName(e.target.value))}
          />
        </div>

        <button type="button" className="inputBtn" onClick={handleLoginBtn}>
          Login
        </button>
      </article>
    </div>
  );
}

function CompletedLogin({ userName }) {
  return (
    <div className="loginImgContainer">
      <img
        src={process.env.PUBLIC_URL + "/public-assets/userLogin.png"}
        alt="user image"
      />
      <span>{userName.length >= 2 ? userName.slice(0, 2) : userName}</span>
    </div>
  );
}

export default App;
