import './App.css';
import React from 'react';
import Home from './pages/Home';
import {Routes, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="tool-bar">
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className="top-icon menu" />
          </a>
          <Link to="/">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
              alt="logo"
              className="logo" />
          </Link>
          
          <a href="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className="top-icon search" />
          </a>
        </nav>
      </header>
      <aside>
        <Nav />
      </aside>
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

function Nav() {

  return(
    <ol className="slidebar">
      <li className="gnb-item">
        <img src="/public-assets/nav/click-home.png" alt="home icon" className="gnb-icon"/>
        <span className="gnb-title click">홈</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className="gnb-icon"/>
        <span className="gnb-title">레시피</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/main.png" alt="main icon" className="gnb-icon main"/>
        <span className="gnb-title">나눔/신청</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/chat.png" alt="chatting icon" className="gnb-icon"/>
        <span className="gnb-title">채팅</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/mypage.png" alt="mypage icon" className="gnb-icon"/>
        <span className="gnb-title">마이페이지</span>
      </li>
    </ol>
  );
}
export default App;
