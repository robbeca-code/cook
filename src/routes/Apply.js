import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { oneServing, dessert } from "./Apply-data";
import style from "./Share.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Application() {
  let [tab, setTab] = useState("oneServing");
  let [clickedPlusBtn, setClickedPlusBtn] = useState(false);
  let userName = useSelector((state) => state.loginInfo.name);

  const handlePlusBtn = () => {
    if (!clickedPlusBtn) {
      setClickedPlusBtn(true);
    } else {
      setClickedPlusBtn(false);
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
            tab === "oneServing"
              ? cn(style.tabBtn, style.click)
              : cn(style.tabBtn)
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
            tab === "dessert" ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
          }
          onClick={() => {
            setTab("dessert");
          }}
        >
          <h1>디저트</h1>
        </button>
        <button
          type="button"
          className={
            tab === "big" ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
          }
          onClick={() => {
            setTab("big");
          }}
        >
          <h1>대용량</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>
        <MatchTap tab={tab} />
      </section>

      <button
        type="button"
        className={cn(style.plusBtn)}
        onClick={() => {
          if (userName === "") {
            return alert("로그인을 해주세요.");
          } else {
            return handlePlusBtn();
          }
        }}
      >
        <img src="/cook/public-assets/one-content/plus.png" alt="plus button" />
      </button>

      <InputModal
        clickedPlusBtn={clickedPlusBtn}
        setClickedPlusBtn={setClickedPlusBtn}
      />
    </section>
  );
}

function MatchTap({ tab }) {
  if (tab === "oneServing") {
    return <ApplyList data={oneServing} />;
  }
  if (tab === "dessert") {
    return <ApplyList data={dessert} />;
  }
}

function ApplyList({ data }) {
  return data.map((item, i) => {
    if (item.title !== "") {
      return (
        <Link
          to={item.url}
          className={cn(style.itemContainer, style.link)}
          key={i}
        >
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt={item.img_alt} />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
              {item.title.length >= 10
                ? item.title.slice(0, 11).concat("...")
                : item.title}
            </h2>
            <span>{item.location}</span>

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

function InputModal({ clickedPlusBtn, setClickedPlusBtn }) {
  const options = ["종류 선택", "1인분", "디저트", "대용량"];
  const fileInput = useRef(null);
  const [selectedkind, setSelectedKind] = useState("종류 선택");
  let title;
  let content;
  let img;
  const author = useSelector((state) => state.loginInfo.name);

  const clickUploadBtn = () => {
    fileInput.current.click();
  };

  const changeFileInput = (e) => {
    img = e.target.files;
  };

  const handleKind = (e) => {
    setSelectedKind(e.target.value);
  };

  const handleTitle = (e) => {
    title = e.target.value;
  };

  const handleContent = (e) => {
    content = e.target.value;
  };

  const inputData = () => {
    setClickedPlusBtn(false);

    if (oneServing[0].kind === selectedkind) {
      const index = oneServing.length - 1;
      oneServing[index].title = title;
      oneServing[index].content = content;
      oneServing[index].author = author;
    }
    if (dessert[0].kind === selectedkind) {
      const index = dessert.length - 1;
      dessert[index].title = title;
      dessert[index].content = content;
      dessert[index].author = author;
    }
  };

  const showAlert = () => {
    return alert("나눔 정보를 다 입력해주세요. (가격 제외)");
  };

  if (clickedPlusBtn) {
    return (
      <article className={cn(style.inputModalContainer)}>
        <header className={cn(style.modalTitle)}>
          <h1>신청 하기</h1>
        </header>

        <form className={cn(style.modalItems)}>
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

          <select
            onChange={handleKind}
            value={selectedkind}
            className={cn(style.modalItem)}
          >
            {options.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <input
            type="text"
            onChange={handleTitle}
            className={cn(style.modalItem)}
          />

          <textarea
            onChange={handleContent}
            className={cn(style.modalItem, style.textarea)}
          ></textarea>

          <button
            type="button"
            onClick={() => {
              if (
                selectedkind === "종류 선택" ||
                title === "" ||
                content === ""
              ) {
                showAlert();
              } else {
                inputData();
              }
            }}
            className={cn(style.inputBtn)}
          >
            입력
          </button>
        </form>
      </article>
    );
  } else {
    return null;
  }
}

export default Application;
