import React from "react";
import style from "./Sidebar.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeTarget } from "../store";

function Sidebar() {
  const dispatch = useDispatch();
  const clickMenuBtn = useSelector((state) => state.clickMenu.status);
  const target = useSelector((state) => state.clickMenu.target);
  let sidebarStyle;

  if (!clickMenuBtn) {
    sidebarStyle = "hide-sidebar";
  } else {
    sidebarStyle = "hide-sidebar show";
  }

  return (
    <ol className={sidebarStyle}>
      <li>
        <Link
          to="/"
          className={cn(style.sideItem)}
          onClick={() => {
            dispatch(changeTarget("home"));
          }}
        >
          <div className={cn(style.sideIcon)}>
            <img
              src={
                target === "home"
                  ? "/cook/public-assets/nav/click-home.png"
                  : "/cook/public-assets/nav/home.png"
              }
              alt="home icon"
            />
          </div>
          <span
            className={
              target === "home"
                ? cn(style.sideTitle, style.click)
                : cn(style.sideTitle, style.link)
            }
          >
            홈
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/recipe"
          className={cn(style.sideItem)}
          onClick={() => {
            dispatch(changeTarget("recipe"));
          }}
        >
          <div className={cn(style.sideIcon)}>
            <img
              src={
                target === "recipe"
                  ? "/cook/public-assets/nav/click-recipe.png"
                  : "/cook/public-assets/nav/recipe.png"
              }
              alt="recipe icon"
            />
          </div>
          <span
            className={
              target === "recipe"
                ? cn(style.sideTitle, style.click)
                : cn(style.sideTitle, style.link)
            }
          >
            레시피
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/share-apply"
          className={cn(style.sideItem)}
          onClick={() => {
            dispatch(changeTarget("share"));
          }}
        >
          <div className={cn(style.sideIcon, style.main)}>
            <img src="/cook/public-assets/nav/main.png" alt="main icon" />
          </div>
          <span
            className={
              target === "share"
                ? cn(style.sideTitle, style.click)
                : cn(style.sideTitle, style.link)
            }
          >
            나눔/신청
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/chat"
          className={cn(style.sideItem)}
          onClick={() => {
            dispatch(changeTarget("chat"));
          }}
        >
          <div className={cn(style.sideIcon)}>
            <img
              src={
                target === "chat"
                  ? "/cook/public-assets/nav/click-chat.png"
                  : "/cook/public-assets/nav/chat.png"
              }
              alt="chatting icon"
            />
          </div>
          <span
            className={
              target === "chat"
                ? cn(style.sideTitle, style.click)
                : cn(style.sideTitle, style.link)
            }
          >
            채팅
          </span>
        </Link>
      </li>
      <li>
        <Link
          to="/mypage"
          className={cn(style.sideItem)}
          onClick={() => {
            dispatch(changeTarget("mypage"));
          }}
        >
          <div className={cn(style.sideIcon)}>
            <img
              src={
                target === "mypage"
                  ? "/cook/public-assets/nav/click-mypage.png"
                  : "/cook/public-assets/nav/mypage.png"
              }
              alt="mypage icon"
            />
          </div>
          <span
            className={
              target === "mypage"
                ? cn(style.sideTitle, style.click)
                : cn(style.sideTitle, style.link)
            }
          >
            마이페이지
          </span>
        </Link>
      </li>
    </ol>
  );
}

export default Sidebar;
