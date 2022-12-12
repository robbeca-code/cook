import React from 'react';
import style from './sha-app.module.css';
import cn from 'classnames';
import {Link} from 'react-router-dom';
import { useState } from 'react';

function ShaApp() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header className={cn(style.appHeader)}>
        <nav className={cn(style.toolBar)}>
          <button type="button" onClick={() => {
            setIsOpen(!isOpen);
          }}>
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className={cn(style.topIcon, style.menu)} />
          </button>
          <Link to="/">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
              alt="logo"
              className={cn(style.logo)} />
          </Link>
          
          <Link to="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className={cn(style.topIcon, style.search)} />
          </Link>
        </nav>
      </header>
      
      <aside>
        <Sidebar isOpen={isOpen} />
      </aside>

      <section className={cn(style.container)}>
        <article class={cn(style.content)}>
          <header className={cn(style.contentTitle)}>
            <h1>| 나눔 |</h1>
          </header>
          <ul className={cn(style.itemsList)}>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/item.png" alt="The ingredients button" />
              </button>
              <h2>식재료</h2>
            </li>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/pork.png" alt="The ingredients button" />
              </button>
              <h2>식기 및 도구</h2>
            </li>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/book.png" alt="The ingredients button" />
              </button>
              <h2>관련 도서</h2>
            </li>
          </ul>
        </article>

        <article className={cn(style.content)}>
          <header className={cn(style.contentTitle)}>
            <h1>| 신청 |</h1>
          </header>
          <ul className={cn(style.itemsList)}>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/one-person.png" alt="The ingredients button" />
              </button>
              <h2>1인분</h2>
            </li>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/desert.png" alt="The ingredients button" />
              </button>
              <h2>디저트</h2>
            </li>
            <li className={cn(style.item)}>
              <button type="button" className={cn(style.btn, style.imgContainer)}>
                <img src="/public-assets/sha_app/big-food.png" alt="The ingredients button" />
              </button>
              <h2>대용량</h2>
            </li>
          </ul>
        </article>

        <article className={cn(style.recommendedUsers)}>
          <header className={cn(style.contentTitle)}>
            <h1>공유 유저 추천</h1>
          </header>
          <ul className={cn(style.itemsList)}>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>길구</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>인디안밥</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>푸드파이터</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>갈비천국</span>
            </li>
          </ul>
        </article>

        <aside className={cn(style.ad)}>
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
      <li className={cn(style.sideItem)}>
        <Link to="/">
          <img src="/public-assets/nav/home.png" alt="home icon" className={cn(style.sideIcon)}/>
          <span className={cn(style.sideTitle, style.link)}>홈</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>레시피</span>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/share-application" className={cn(style.link)}>
          <img src="/public-assets/nav/main.png" alt="main icon" className={cn(style.sideIcon, style.main)}/>
          <span className={cn(style.sideTitle, style.click)}>나눔/신청</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <img src="/public-assets/nav/chat.png" alt="chatting icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>채팅</span>
      </li>
      <li className={cn(style.sidebItem)}>
        <img src="/public-assets/nav/mypage.png" alt="mypage icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>마이페이지</span>
      </li>
    </ol>
  );
}

export default ShaApp;