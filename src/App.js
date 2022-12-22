import './App.css';
import React from 'react';
import Home from './routes/Home';
import { useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import NonPage from './routes/NonPage';
import ShaApp from './routes/sha-app';
import OneServing from './routes/OneServing';
import servingList from './routes/OneServing-data';
import Content from './routes/One-Content';
import Share from "./routes/Share";
import {food, product} from './routes/Share-data';
import ShareContent from './routes/ShareContent';

function App() {
  let [isOpen, setIsOpen] = useState(false);
  let [login, setLogin] = useState('');
  let [loginBtn, setLoginBtn] = useState(false);
  let [showUser, setShowUser] = useState(false);

  return (
    <div className="app">
      <header className="appHeader">
        <nav className="toolBar">
          <button type="button" onClick={() => {
            setIsOpen(!isOpen);
          }}>
            <img
              src={process.env.PUBLIC_URL + "/public-assets/menu.png"}
              alt="menu icon"
              className="topIcon menu" />
          </button>
          <Link to="/" className="logo">
            <img 
              src={process.env.PUBLIC_URL + "/public-assets/logo.png"}
              alt="logo" />
          </Link>
          <div className="loginBox">
            <Link to="#" className="search">
              <img 
                src={process.env.PUBLIC_URL + "/public-assets/search.png"}
                alt="search icon"
                className="topIcon" />
            </Link>

            {
              showUser 
              ? <UserImg login={login} /> 
              : <button type="button" className="loginBtn" onClick={() => {
                loginBtn ? setLoginBtn(false) : setLoginBtn(true)
              }}>
                Login
              </button>
            }
            
          </div>
        </nav>
      </header>

      {
        loginBtn 
        ? <LoginModal setLogin={setLogin} setShowUser={setShowUser} setLoginBtn={setLoginBtn} /> 
        : null
      }

      <Routes>
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route path="*" element={<NonPage />} />
        <Route path="/share-application" element={<ShaApp isOpen={isOpen} />} />
        <Route path="/share-application/one-serving" element={<OneServing isOpen={isOpen} data={servingList} />} />
        <Route path="/share-application/one-serving/:id" element={<Content isOpen={isOpen} data={servingList} />} />
        <Route path="/share-application/share" element={<Share isOpen={isOpen} food={food} product={product} />} />
        <Route path="/share-application/share/:id" element={<ShareContent isOpen={isOpen} food={food} product={product}/>} />
      </Routes>
    </div>
  );
}


function LoginModal({setLogin, setShowUser, setLoginBtn}) {

  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const clickLoginBtn = () => {
    setShowUser(true);
    setLoginBtn(false);
  }

  return(
    <div className="loginContainer">
      <article className="loginModal">
        <header className="title">
          <h1>로그인</h1>
        </header>

        <div className="loginItem">
          <strong>이메일</strong>
          <input type="email" />
        </div>
        
        <div className="loginItem">
          <strong>비밀번호</strong>
          <input type="password" />
        </div>
        
        <div className="loginItem">
          <strong>닉네임</strong>
          <input type="text" onChange={handleLogin} />
        </div>

        <button type="button" className="inputBtn" onClick={clickLoginBtn}>
          Login
        </button>
      </article>
    </div>
  );
}

function UserImg({login}) {
  return(
    <div className="loginImgContainer">
      <img src={process.env.PUBLIC_URL + "/public-assets/userLogin.png"} alt="user image" />
      <span>
        {
          login.length >= 2 ? login.slice(0, 2) : login
        }
      </span>
    </div>
  );
}

export default App;
