import React from 'react';
import style from './Sidebar.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Sidebar({isOpen, target}) {
  let sidebar;
  let [click, setClick] = useState(target);

  if(!isOpen) {
    sidebar = `hide-sidebar`;
  } else {
    sidebar = `hide-sidebar show`;
  }

  return(
    <ol className={sidebar}>
      <li>
        <Link to="/"  className={cn(style.sideItem)} 
        onClick={() => {
          setClick('home');
        }} >
          <div className={cn(style.sideIcon)}>
            <img src={click === 'home' ? '/public-assets/nav/click-home.png' : '/public-assets/nav/home.png'} alt="home icon" />
          </div>
          <span className={click === 'home' ? cn(style.sideTitle, style.click) : cn(style.sideTitle, style.link)}>홈</span>
        </Link>
      </li>
      <li>
        <Link to="/recipe"  className={cn(style.sideItem)}
        onClick={() => {
          setClick('recipe');
        }}>
          <div className={cn(style.sideIcon)}>
            <img src={click === 'recipe' ? '/public-assets/nav/click-recipe.png' : '/public-assets/nav/recipe.png'} alt="recipe icon"/>
          </div>
          <span className={click === 'recipe' ? cn(style.sideTitle, style.click) : cn(style.sideTitle, style.link)}>레시피</span>
        </Link>
      </li>
      <li>
        <Link to="/share-apply" className={cn(style.sideItem)} 
        onClick={() => {
          setClick('share');
        }}>
          <div className={cn(style.sideIcon, style.main)}>
            <img src="/public-assets/nav/main.png" alt="main icon" />
          </div>
          <span className={click === 'share' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>나눔/신청</span>
        </Link>
      </li>
      <li>
        <Link to="/" className={cn(style.sideItem)} 
        onClick={() => {
          setClick('chat');
        }}>
          <div className={cn(style.sideIcon)}>
            <img src={click === 'chat' ? '/public-assets/nav/click-chat.png' : '/public-assets/nav/chat.png'} alt="chatting icon"/>
          </div>
          <span className={click === 'chat' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>채팅</span>
        </Link>
      </li>
      <li>
        <Link to="/mypage" className={cn(style.sideItem)} 
        onClick={() => {
          setClick('mypage');
        }}>
          <div className={cn(style.sideIcon)}>
            <img src={click === 'mypage' ? '/public-assets/nav/click-mypage.png' : '/public-assets/nav/mypage.png'} alt="mypage icon"/>
          </div>
          <span className={click === 'mypage' ? cn(style.sideTitle, style.click): cn(style.sideTitle, style.link)}>마이페이지</span>
        </Link>
      </li>
    </ol>
  );
}

export default Sidebar;