import React from 'react';

function Nav() {

  return(
    <ol className="gnb">
      <li className="gnb-item">
        <img src="/public-assets/nav/click-home.png" alt="home icon"/>
        <span className="item-title click">홈</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/recipe.png" alt="recipe icon"/>
        <span className="item-title">레시피</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/main.png" alt="main icon"/>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/chat.png" alt="chatting icon"/>
        <span className="item-title">채팅</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/mypage.png" alt="mypage icon"/>
        <span className="item-title">마이페이지</span>
      </li>
    </ol>
  );
}

export default Nav;