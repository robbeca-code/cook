import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { food, product } from "./Share-data";
import style from "./Share.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Share() {
  let [tab, setTab] = useState("food");
  let [plus, setPlus] = useState(false);
  let login = useSelector((state) => state.login.nickname);

  const handlePlusBtn = () => {
    if (login === "") {
      alert("로그인을 해주세요.");
      return;
    } else {
      setPlus(true);
    }
  };

  return (
    <section className={cn(style.container)}>
      <aside>
        <Sidebar />
      </aside>

      <header className={cn(style.tabContainer)}>
        <button
          type="button"
          className={
            tab === "food" ? cn(style.tab, style.click) : cn(style.tab)
          }
          onClick={() => {
            setTab("food");
          }}
        >
          <h1>식재료</h1>
        </button>
        <button
          type="button"
          className={
            tab === "product" ? cn(style.tab, style.click) : cn(style.tab)
          }
          onClick={() => {
            setTab("product");
          }}
        >
          <h1>식기 및 도구</h1>
        </button>
        <button
          type="button"
          className={
            tab === "book" ? cn(style.tab, style.click) : cn(style.tab)
          }
          onClick={() => {
            setTab("book");
          }}
        >
          <h1>관련도서</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>{<ClickTab tab={tab} />}</section>

      <button
        type="button"
        className={cn(style.plusBtn)}
        onClick={handlePlusBtn}
      >
        <img src="/cook/public-assets/one-content/plus.png" alt="plus button" />
      </button>

      <PlusContent plus={plus} setPlus={setPlus} />
    </section>
  );
}

function ClickTab({ tab }) {
  if (tab === "food") {
    return <ShareList data={food} />;
  }
  if (tab === "product") {
    return <ShareList data={product} />;
  }
}

function ShareList({ data }) {
  return data.map((item, i) => {
    if (item.title != "") {
      return (
        <Link to={item.url} className={cn(style.item, style.link)} key={i}>
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt="나눔" />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
              {item.title.length >= 10
                ? item.title.slice(0, 11).concat("...")
                : item.title}
            </h2>
            <div className={cn(style.subInfo)}>
              <strong>
                {item.cost != "가격없음" ? item.cost.concat("원") : item.cost}
              </strong>
              <span>{item.location}</span>
            </div>
            <div className={cn(style.author)}>
              <span>
                작성자:&nbsp;
                {item.author.length >= 5
                  ? item.author.slice(0, 5)
                  : item.author}
              </span>
            </div>
          </div>
        </Link>
      );
    } else {
      return null;
    }
  });
}

function PlusContent({ plus, setPlus }) {
  const options = ["종류 선택", "식재료", "식기 및 도구", "관련도서"];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
  let cost;
  let img;
  let author = useSelector((state) => state.login.nickname);

  const clickUploadBtn = () => {
    fileInput.current.click();
  };

  const changeFileInput = (e) => {
    img = e.target.files;
  };

  const handleKind = (e) => {
    kind = e.target.value;
  };

  const handleTitle = (e) => {
    title = e.target.value;
  };

  const handleContent = (e) => {
    content = e.target.value;
  };

  const handleCost = (e) => {
    cost = e.target.value;
  };

  const inputData = () => {
    setPlus(false);

    if (food[0].kind === kind) {
      const index = food.length - 1;
      food[index].title = title;
      food[index].content = content;
      food[index].cost = cost;
      food[index].author = author;
    }
    if (product[0].kind === kind) {
      const index = product.length - 1;
      product[index].title = title;
      product[index].content = content;
      product[index].cost = cost;
      product[index].author = author;
    }
  };

  if (plus) {
    return (
      <article className={cn(style.inputModal)}>
        <header className={cn(style.modalTitle)}>
          <h1>나눔 하기</h1>
        </header>

        <div className={cn(style.modalItem)}>
          <button
            type="button"
            onClick={clickUploadBtn}
            className={cn(style.uploadBtn)}
          >
            <img
              src="/cook/public-assets/share-content/input-img.png"
              alt="file upload button"
            />
          </button>
          <input
            type="file"
            ref={fileInput}
            accept=".png, .jpg"
            onChange={changeFileInput}
            className={cn(style.hidden)}
          />
        </div>

        <div className={cn(style.modalItem)}>
          <strong>종류</strong>
          <select
            onChange={handleKind}
            value={options[0]}
            className={cn(style.itemSize)}
          >
            {options.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <div className={cn(style.modalItem)}>
          <strong>제목</strong>
          <input
            type="text"
            onChange={handleTitle}
            className={cn(style.itemSize)}
          />
        </div>
        <div className={cn(style.modalItem)}>
          <strong>가격</strong>
          <input
            type="text"
            onChange={handleCost}
            className={cn(style.itemSize)}
          />
        </div>
        <div className={cn(style.modalItem)}>
          <strong>내용</strong>
          <textarea
            onChange={handleContent}
            className={cn(style.itemSize, style.textarea)}
          ></textarea>
        </div>

        <button
          type="button"
          onClick={inputData}
          className={cn(style.inputBtn)}
        >
          입력
        </button>
      </article>
    );
  } else {
    return null;
  }
}

export default Share;
