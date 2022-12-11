import React from 'react';
import './sha-app.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function ShaApp() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
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

      <section className="container">
        <article class="content">
          <header className="content-title">
            <h1>| 나눔 |</h1>
          </header>
          <ul className="items-list">
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/item.png" alt="The ingredients button" />
              </button>
              <h2>식재료</h2>
            </li>
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/pork.png" alt="The ingredients button" />
              </button>
              <h2>식기 및 도구</h2>
            </li>
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/book.png" alt="The ingredients button" />
              </button>
              <h2>관련 도서</h2>
            </li>
          </ul>
        </article>

        <article className="content">
          <header className="content-title">
            <h1>| 신청 |</h1>
          </header>
          <ul className="items-list">
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/one-person.png" alt="The ingredients button" />
              </button>
              <h2>식재료</h2>
            </li>
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/desert.png" alt="The ingredients button" />
              </button>
              <h2>식기 및 도구</h2>
            </li>
            <li className="item">
              <button type="button" className="btn img-container">
                <img src="/public-assets/sha_app/big-food.png" alt="The ingredients button" />
              </button>
              <h2>관련 도서</h2>
            </li>
          </ul>
        </article>

        <article className="recommended-users">
          <header className="content-title">
            <h1>공유 유저 추천</h1>
          </header>
          <ul className="items-list">
            <li className="item">
              <div className="img-container">
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className="user-name">길구</span>
            </li>
            <li className="item">
              <div className="img-container">
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className="user-name">인디안밥</span>
            </li>
            <li className="item">
              <div className="img-container">
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className="user-name">푸드파이터</span>
            </li>
          </ul>
        </article>

        <aside className="ad">
          <img src="/public-assets/sha_app/event-ad.png" alt="" />
        </aside>
      </section>
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
          <img src="/public-assets/nav/home.png" alt="home icon" className="side-icon"/>
          <span className="side-title link">홈</span>
        </Link>
      </li>
      <li className="side-item">
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className="side-icon"/>
        <span className="side-title">레시피</span>
      </li>
      <li className="side-item">
        <Link to="/share-application" className="link">
          <img src="/public-assets/nav/main.png" alt="main icon" className="side-icon main"/>
          <span className="side-title click">나눔/신청</span>
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

export default ShaApp;