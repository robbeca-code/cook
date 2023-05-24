import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import style from "./Mypage.module.css";
import cn from "classnames";
import { oneServing, dessert } from "./Apply-data";
import { food, product } from "./Share-data";
import { tunaCan } from "./Recipe-data";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteApplyMark, deleteShareMark, deleteRecipeMark } from "../store";

function Mypage() {
  const [tab, setTab] = useState(0);
  const userName = useSelector((state) => state.loginInfo.name);
  const isLogin = useSelector((state) => state.login);

  return (
    <section className={cn(style.container)}>
      <aside>
        <Sidebar />
      </aside>

      {!isLogin ? (
        <div className={cn(style.alertContainer)}>
          <img src="/cook/public-assets/mypage/login-alert.png" alt="" />
          <h1>Login을 한 다음 진행해주세요</h1>
        </div>
      ) : (
        <div>
          <header className={cn(style.header)}>
            <div className={cn(style.userImgContainer)}>
              <img
                src="/cook/public-assets/mypage/userImg.png"
                alt="user profile"
              />
            </div>
            <div className={cn(style.userInfoContainer)}>
              <h2>{userName}</h2>
              <p>저렴한 가격으로 나눔해요~ 반갑습니다~~~</p>
              <img
                src="/cook/public-assets/mypage/userManner.png"
                alt="user's manner gauge"
              />
            </div>
          </header>

          <div className={cn(style.tabContainer)}>
            <button
              type="button"
              className={
                tab === 0 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
              }
              onClick={() => {
                setTab(0);
              }}
            >
              판매 물품
            </button>

            <button
              type="button"
              className={
                tab === 1 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
              }
              onClick={() => {
                setTab(1);
              }}
            >
              관심 나눔
            </button>

            <button
              type="button"
              className={
                tab === 2 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
              }
              onClick={() => {
                setTab(2);
              }}
            >
              관심 신청
            </button>

            <button
              type="button"
              className={
                tab === 3 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
              }
              onClick={() => {
                setTab(3);
              }}
            >
              관심 레시피
            </button>
          </div>

          <MatchTap tab={tab} />
        </div>
      )}
    </section>
  );
}

function MatchTap({ tab }) {
  let shareMark = useSelector((state) => state.mark.shares);
  const ApplyMarks = useSelector((state) => state.mark.applys);
  let recipeMarks = useSelector((state) => state.mark.recipes);

  if (tab === 1 && shareMark.length > 0) {
    return (
      <section className={cn(style.grid)}>
        {<ShowContent id={shareMark} data={food} kind="share" />}
        {<ShowContent id={shareMark} data={product} kind="share" />}
      </section>
    );
  }

  if (tab === 2 && ApplyMarks.length > 0) {
    return (
      <section className={cn(style.grid)}>
        {<ShowContent id={ApplyMarks} data={oneServing} kind="apply" />}
        {<ShowContent id={ApplyMarks} data={dessert} kind="apply" />}
      </section>
    );
  }

  if (tab === 3 && recipeMarks.length > 0) {
    return (
      <section className={cn(style.grid)}>
        {<ShowContent id={recipeMarks} data={tunaCan} kind="recipe" />}
      </section>
    );
  }
}

const showItemCost = (cost) => {
  if (cost === undefined) {
    return null;
  } else if (cost === "가격없음") {
    return <strong>{cost}</strong>;
  } else if (cost > 0) {
    return <strong>{cost.toLocaleString("ko-KR") + "원"}</strong>;
  }
};

function ShowContent({ id, data, kind }) {
  const dispatch = useDispatch();

  const deleteMark = (dataId) => {
    if (kind === "apply") {
      dispatch(deleteApplyMark(dataId));
    }
    if (kind === "share") {
      dispatch(deleteShareMark(dataId));
    }
    if (kind === "recipe") {
      dispatch(deleteRecipeMark(dataId));
    }
  };

  return data.map((data, i) => {
    if (id.indexOf(data.id) > -1) {
      return (
        <article className={cn(style.itemContainer)} key={i}>
          <Link to={data.url} className={cn(style.link)}>
            <div className={cn(style.imgContainer)}>
              <img src={data.img} alt={data.img_alt} />
            </div>
          </Link>
          <div className={cn(style.itemInfoContainer)}>
            <h3>
              {data.title.length > 10
                ? data.title.slice(0, 11).concat("...")
                : data.title}
            </h3>
            {showItemCost(data.cost)}
            <span>{"작성자: ".concat(data.author)}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              deleteMark(data.id);
            }}
          >
            <FontAwesomeIcon icon={faClose} className={cn(style.removeBtn)} />
          </button>
        </article>
      );
    } else {
      return null;
    }
  });
}

export default Mypage;
