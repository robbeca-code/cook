import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { oneServing, dessert } from "./Apply-data";
import style from "./Share.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Application() {
  let [tab, setTab] = useState("oneServing");
  let [plus, setPlus] = useState(false);
  let login = useSelector((state) => state.login.nickname);

  const handlePlusBtn = () => {
    if (login === "") {
      alert("로그인을 해주세요.");
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
            tab === "oneServing" ? cn(style.tab, style.click) : cn(style.tab)
          }
          onClick={() => {
            setTab("oneServing");
          }}
        >
          <h1>1인분</h1>
        </button>
        <button
          type="button"
          className={
            tab === "dessert" ? cn(style.tab, style.click) : cn(style.tab)
          }
          onClick={() => {
            setTab("dessert");
          }}
        >
          <h1>디저트</h1>
        </button>
        <button
          type="button"
          className={tab === "big" ? cn(style.tab, style.click) : cn(style.tab)}
          onClick={() => {
            setTab("big");
          }}
        >
          <h1>대용량</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>
        {<ClickTab tab={tab} oneServing={oneServing} dessert={dessert} />}
      </section>

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
  if (tab === "oneServing") {
    return <ApplyList data={oneServing} />;
  }
  if (tab === "dessert") {
    return <ApplyList data={dessert} />;
  }
}

function ApplyList({ data }) {
  return data.map((item, i) => {
    if (item.title != "") {
      return (
        <Link to={item.url} className={cn(style.item, style.link)} key={i}>
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt={item.img_alt} />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
              {item.title.length >= 10
                ? item.title.slice(0, 11).concat("...")
                : item.title}
            </h2>
            <div className={cn(style.subInfo)}>
              <span>{item.location}</span>
            </div>
            <div className={cn(style.author)}>
              <span>작성자: {item.author}</span>
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
  const options = ["종류 선택", "1인분", "디저트", "대용량"];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
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

  const inputData = () => {
    setPlus(false);

    if (oneServing[0].kind === kind) {
      const index = oneServing.length - 1;
      oneServing[index].title = title;
      oneServing[index].content = content;
      oneServing[index].author = author;
    }
    if (dessert[0].kind === kind) {
      const index = dessert.length - 1;
      dessert[index].title = title;
      dessert[index].content = content;
      dessert[index].author = author;
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

export default Application;
