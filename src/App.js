import "./App.css";
import React from "react";
import Home from "./routes/Home";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NonPage from "./routes/NonPage";
import ShaApp from "./routes/ShareAndApply";
import Apply from "./routes/Apply";
import ApplyContent from "./routes/ApplyContent";
import Share from "./routes/Share";
import ShareContent from "./routes/ShareContent";
import Recipe from "./routes/Recipe";
import Mypage from "./routes/Mypage";
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
          <div className="toolBarItems">
            <button
              className="toolBarIcon"
              type="button"
              onClick={() => {
                dispatch(toggleMenuBtn());
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/public-assets/menu.png"}
                alt="menu icon"
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

          <div>
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
                로그인
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
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.loginInfo.email);
  const userPassWord = useSelector((state) => state.loginInfo.passwd);
  const userName = useSelector((state) => state.loginInfo.name);

  const handleLoginBtn = () => {
    dispatch(setLogin());
    setClickedLoginBtn(false);
  };

  const showAlert = () => {
    return alert("로그인 정보를 다 입력해주세요.");
  };

  return (
    <div className="loginContainer">
      <article className="loginModal">
        <header className="title">
          <h1>로그인</h1>
        </header>

        <form className="loginItems">
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            autoComplete="on"
            className="loginItem"
            onChange={(e) => dispatch(changeEmail(e.target.value))}
          />

          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="on"
            className="loginItem"
            onChange={(e) => dispatch(changePasswd(e.target.value))}
          />

          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            autoComplete="on"
            className="loginItem"
            onChange={(e) => dispatch(changeName(e.target.value))}
          />

          <button
            type="button"
            className="submitBtn"
            onClick={() => {
              if (userEmail === "" || userPassWord === "" || userName === "") {
                return showAlert();
              } else {
                return handleLoginBtn();
              }
            }}
          >
            로그인
          </button>
        </form>
      </article>
    </div>
  );
}

function CompletedLogin({ userName }) {
  return (
    <div className="loginImgContainer">
      <img
        src={process.env.PUBLIC_URL + "/public-assets/userLogin.png"}
        alt="user img"
      />
      <span>{userName.length >= 2 ? userName.slice(0, 2) : userName}</span>
    </div>
  );
}

export default App;
