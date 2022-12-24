import React from 'react';
import style from './Sidebar.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar({isOpen, target}) {
  let sidebar;
  let [click, setClick] = useState({target});

  if(!isOpen) {
    sidebar = `hide-sidebar`;
  } else {
    sidebar = `hide-sidebar show`;
  }

  return(
    <ol className={sidebar}>
      <li className={cn(style.sideItem)}>
        <Link to="/" onClick={() => {
          setClick('home');
        }}>
          <img src={click === 'home' ? '/public-assets/nav/click-home.png' : '/public-assets/nav/home.png'} alt="home icon" className={cn(style.sideIcon, style.click)} />
          <span className={click === 'home' ? cn(style.sideTitle, style.click) : cn(style.sideTitle, style.link)}>홈</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/recipe" onClick={() => {
          setClick('recipe');
        }}>
          <img src={click === 'recipe' ? '/public-assets/nav/click-recipe.png' : '/public-assets/nav/recipe.png'} alt="recipe icon" className={cn(style.sideIcon)}/>
          <span className={click === 'recipe' ? cn(style.sideTitle, style.click) : cn(style.sideTitle, style.link)}>레시피</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/share-application" onClick={() => {
          setClick('share');
        }}>
          <img src="/public-assets/nav/main.png" alt="main icon" className={cn(style.sideIcon, style.main)}/>
          <span className={click === 'share' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>나눔/신청</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/" onClick={() => {
          setClick('chat');
        }}>
          <img src={click === 'chat' ? '/public-assets/nav/click-chat.png' : '/public-assets/nav/chat.png'} alt="chatting icon" className={cn(style.sideIcon)}/>
          <span className={click === 'chat' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>채팅</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/mypage" onClick={() => {
          setClick('mypage');
        }}>
          <img src={click === 'mypage' ? '/public-assets/nav/click-mypage.png' : '/public-assets/nav/mypage.png'} alt="mypage icon" className={cn(style.sideIcon)}/>
          <span className={click === 'mypage' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>마이페이지</span>
        </Link>
      </li>
    </ol>
  );
}

export default Sidebar;