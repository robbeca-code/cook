import React, { useState } from "react";
import Sidebar from "./Sidebar";
import style from "./RecipeContent.module.css";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { inputRecipeMark, deleteRecipeMark } from "../store";
import { tunaCan } from "./Recipe-data";

function RecipeContent() {
  let bookmarkLength;
  (bookmarkLength = []).length = tunaCan.length;
  bookmarkLength.fill(false);

  const [bookmark, setBookmark] = useState(bookmarkLength);

  const dispatch = useDispatch();

  const userName = useSelector((state) => state.loginInfo.name);

  const handleLevel = (level) => {
    if (level === "하") {
      return "/cook/public-assets/recipe/level-b.png";
    } else if (level === "중") {
      return "/cook/public-assets/recipe/level-m.png";
    } else {
      return "/cook/public-assets/recipe/level-t.png";
    }
  };

  const handleBookmarkBtn = (id, index) => {
    let copyBookmark = [...bookmark];

    if (!bookmark[index]) {
      copyBookmark[index] = true;
      setBookmark(copyBookmark);
      dispatch(inputRecipeMark(id));
    } else if (bookmark[index]) {
      copyBookmark[index] = false;
      setBookmark(copyBookmark);
      dispatch(deleteRecipeMark(id));
    }
  };

  return (
    <section className={cn(style.container)}>
      <aside>
        <Sidebar />
      </aside>

      <header className={cn(style.containerTitle)}>
        <h1>참치통조림</h1>
      </header>

      <section className={cn(style.grid)}>
        {tunaCan.map((item, i) => {
          return (
            <article className={cn(style.itemContainer)} key={i}>
              <div className={cn(style.imgContainer)}>
                <img src={item.img} alt={item.img_alt} />
                <button
                  type="button"
                  className={cn(style.bookmark)}
                  onClick={() => {
                    if (userName == "") {
                      alert("로그인을 해주세요.");
                      return;
                    } else {
                      handleBookmarkBtn(item.id, i);
                    }
                  }}
                >
                  {!bookmark[i] ? (
                    <img
                      src="/cook/public-assets/recipe/bookmark.png"
                      alt="bookmark button"
                    />
                  ) : (
                    <img
                      src="/cook/public-assets/recipe/click-bookmark.png"
                      alt="click bookmark button"
                    />
                  )}
                </button>
              </div>
              <strong>{item.title}</strong>
              <div className={cn(style.itemInfo)}>
                <div className={cn(style.item)}>
                  <img
                    src="/cook/public-assets/recipe/heart.png"
                    className={cn(style.subInfoImg)}
                    alt="like"
                  />
                  <span>{item.heart}</span>
                </div>
                <div className={cn(style.item)}>
                  <img src={handleLevel(item.level)} alt="level" />
                  <span>{item.level}</span>
                </div>
                <div className={cn(style.item)}>
                  <img src="/cook/public-assets/recipe/timer.png" alt="time" />
                  <span>{item.time}</span>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </section>
  );
}

export default RecipeContent;
