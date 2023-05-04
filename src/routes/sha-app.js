import React from "react";
import style from "./Sha-App.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function ShaApp() {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>

      <section className={cn(style.container)}>
        <article class={cn(style.content)}>
          <header className={cn(style.contentTitle)}>
            <h1>| 나눔 |</h1>
          </header>
          <ul className={cn(style.itemsList)}>
            <li className={cn(style.item)}>
              <Link to="/share-apply/share">
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/item.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
              <h2>식재료</h2>
            </li>
            <li className={cn(style.item)}>
              <Link to="/share-apply/share">
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/pork.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
              <h2>식기 및 도구</h2>
            </li>
            <li className={cn(style.item)}>
              <Link to="/share-apply/share">
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/book.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
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
              <Link to="/share-apply/apply" className={cn(style.link)}>
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/one-person.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
              <h2>1인분</h2>
            </li>
            <li className={cn(style.item)}>
              <Link to="/share-apply/apply" className={cn(style.link)}>
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/dessert.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
              <h2>디저트</h2>
            </li>
            <li className={cn(style.item)}>
              <Link to="/share-apply/apply" className={cn(style.link)}>
                <button
                  type="button"
                  className={cn(style.btn, style.imgContainer)}
                >
                  <img
                    src="/cook/public-assets/sha_app/big-food.png"
                    alt="The ingredients button"
                  />
                </button>
              </Link>
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
                <img src="/cook/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>길구</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/cook/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>인디안밥</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/cook/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>푸드파이터</span>
            </li>
            <li className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src="/cook/public-assets/sha_app/non-img.png" alt="" />
              </div>
              <span className={cn(style.userName)}>갈비천국</span>
            </li>
          </ul>
        </article>

        <aside className={cn(style.ad)}>
          <img src="/cook/public-assets/sha_app/event-ad.png" alt="" />
        </aside>
      </section>
    </div>
  );
}

export default ShaApp;
