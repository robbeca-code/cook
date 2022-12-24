import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import style from './Mypage.module.css';
import cn from "classnames";

function Mypage({isOpen, login, setLogin, setLoginBtn, setShowUser}) {
  let target = 'mypage';
  let [tab, setTab] = useState(0);

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <header className={cn(style.header)}>
        <div className={cn(style.userImg)}>
          <img src="/public-assets/mypage/userImg.png" alt="user profile"/>
        </div>
        <div className={cn(style.userInfo)}>
          <h1>{login}</h1>
          <p>저렴한 가격으로 나눔해요~ 반갑습니다~~~</p>
          <img src="/public-assets/mypage/userManner.png" alt="user manner" />
        </div>
      </header>

      <div className={cn(style.tabContainer)}>
        <button type="button" className={
          tab === 0 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
        } onClick={() => {setTab(0)}}>판매 물품</button>
        <button type="button" className={
          tab === 1 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
        } onClick={() => {setTab(1)}}>관심 나눔</button>
        <button type="button" className={
          tab === 2 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
        } onClick={() => {setTab(2)}}>관심 신청</button>
        <button type="button" className={
          tab === 3 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
        } onClick={() => {setTab(3)}}>관심 레시피</button>
      </div>

      <article className={cn(style.list)}>
        {
          <GetTab tab={tab} />
        }
      </article>
    </section>
  );
}

function GetTab({tab}) {
  if(tab === 0) {
    return(<ShowPage />);
  }
}

function ShowPage() {
  return(
    <section className={cn(style.grid)}>
      <article className={cn(style.item)}>
        <div className={cn(style.imgContainer)}>
          <img src="/public-assets/share-content/food1.png" alt="나눔" />
        </div>
        <h2>사과 나눔 합니다~</h2>
        <strong>가격없음</strong>
        <span>다람이</span>
      </article>
    </section>
  );
}
export default Mypage;