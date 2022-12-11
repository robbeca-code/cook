import './App.css';
import React from 'react';
import Home from './routes/Home';
import { useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import NonPage from './routes/nonPage';
import ShaApp from './routes/sha-app';

function App() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <nav className="tool-bar">
          <button type="button" onClick={() => {
            setIsOpen(!isOpen);
          }}>
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className="top-icon menu" />
          </button>
          <Link to="/">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
              alt="logo"
              className="logo" />
          </Link>
          
          <Link to="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className="top-icon search" />
          </Link>
        </nav>
      </header>
      
      <aside>
        <Sidebar isOpen={isOpen} />
      </aside>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NonPage />} />
        <Route path="/share-application" element={<ShaApp />} />
      </Routes>
    </div>
  );
}

function Sidebar(props) {
  let isOpen;

  if(!props.isOpen) {
    isOpen = 'hide-sidebar';
  } else {
    isOpen = 'hide-sidebar show';
  }

  return(
    <ol className={isOpen}>
      <li className="side-item">
        <Link to="/">
          <img src="/public-assets/nav/click-home.png" alt="home icon" className="side-icon"/>
          <span className="side-title click">홈</span>
        </Link>
      </li>
      <li className="side-item">
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className="side-icon"/>
        <span className="side-title">레시피</span>
      </li>
      <li className="side-item">
        <Link to="/share-application" className="link">
          <img src="/public-assets/nav/main.png" alt="main icon" className="side-icon main"/>
          <span className="side-title">나눔/신청</span>
        </Link>
      </li>
      <li className="side-item">
        <img src="/public-assets/nav/chat.png" alt="chatting icon" className="side-icon"/>
        <span className="side-title">채팅</span>
      </li>
      <li className="gnsideb-item">
        <img src="/public-assets/nav/mypage.png" alt="mypage icon" className="side-icon"/>
        <span className="side-title">마이페이지</span>
      </li>
    </ol>
  );
}

export default App;
