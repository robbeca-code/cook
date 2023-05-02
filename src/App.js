import "./App.css";
import React from "react";
import Home from "./routes/Home";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NonPage from "./routes/NonPage";
import ShaApp from "./routes/Sha-App";
import Apply from "./routes/Apply";
import { oneServing, dessert } from "./routes/Apply-data";
import ApplyContent from "./routes/ApplyContent";
import Share from "./routes/Share";
import { food, product } from "./routes/Share-data";
import ShareContent from "./routes/ShareContent";
import Recipe from "./routes/Recipe";
import Mypage from "./routes/Mypage";
import { recipe, tunaCan } from "./routes/Recipe-data";
import RecipeContent from "./routes/RecipeContent";
import Chat from "./routes/Chat";
import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePasswd, changeNick, setShowUser } from "./store";

function App() {
  let [isOpen, setIsOpen] = useState(false);
  let [loginBtn, setLoginBtn] = useState(false);
  let [chat, setChat] = useState([]);
  let nickname = useSelector((state) => {
    return state.login.nickname;
  });
  let showUser = useSelector((state) => {
    return state.showUser;
  });

  return (
    <div className="app">
      <header className="appHeader">
        <nav className="toolBar">
          <div className="barItem">
            <button
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/public-assets/menu.png"}
                alt="menu icon"
                className="topIcon menu"
              />
            </button>
            <Link to="/" className="logo">
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

            {showUser ? (
              <UserImg login={nickname} />
            ) : (
              <button
                type="button"
                className="loginBtn"
                onClick={() => {
                  loginBtn ? setLoginBtn(false) : setLoginBtn(true);
                }}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </header>

      {loginBtn ? <LoginModal setLoginBtn={setLoginBtn} /> : null}

      <Routes>
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route path="*" element={<NonPage />} />

        <Route
          path="/recipe"
          element={<Recipe isOpen={isOpen} data={recipe} />}
        />
        <Route
          path="/recipe/tunaCan"
          element={<RecipeContent isOpen={isOpen} data={tunaCan} />}
        />

        <Route path="/share-apply" element={<ShaApp isOpen={isOpen} />} />
        <Route
          path="/share-apply/apply"
          element={
            <Apply isOpen={isOpen} oneServing={oneServing} dessert={dessert} />
          }
        />
        <Route
          path="/share-apply/apply/:id"
          element={
            <ApplyContent
              isOpen={isOpen}
              chat={chat}
              setChat={setChat}
              oneServing={oneServing}
              dessert={dessert}
            />
          }
        />
        <Route
          path="/share-apply/share"
          element={<Share isOpen={isOpen} food={food} product={product} />}
        />
        <Route
          path="/share-apply/share/:id"
          element={
            <ShareContent
              isOpen={isOpen}
              chat={chat}
              setChat={setChat}
              food={food}
              product={product}
            />
          }
        />

        <Route path="/chat" element={<Chat isOpen={isOpen} chat={chat} />} />

        <Route
          path="/mypage"
          element={
            <Mypage
              isOpen={isOpen}
              food={food}
              product={product}
              oneServing={oneServing}
              dessert={dessert}
              recipe={tunaCan}
            />
          }
        />
      </Routes>
    </div>
  );
}

function LoginModal({ setLoginBtn }) {
  let dispatch = useDispatch();

  const clickLoginBtn = () => {
    dispatch(setShowUser());
    setLoginBtn(false);
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
            onChange={(e) => dispatch(changeNick(e.target.value))}
          />
        </div>

        <button type="button" className="inputBtn" onClick={clickLoginBtn}>
          Login
        </button>
      </article>
    </div>
  );
}

function UserImg({ login }) {
  return (
    <div className="loginImgContainer">
      <img
        src={process.env.PUBLIC_URL + "/public-assets/userLogin.png"}
        alt="user image"
      />
      <span>{login.length >= 2 ? login.slice(0, 2) : login}</span>
    </div>
  );
}

export default App;
