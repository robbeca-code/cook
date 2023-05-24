import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import { food, product } from "./Share-data";
import style from "./Share.module.css";
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Share() {
  const [tab, setTab] = useState("food");
  const [clickedPlusBtn, setClickedPlusBtn] = useState(false);
  const userName = useSelector((state) => state.loginInfo.name);

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
            tab === "food" ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
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
            tab === "product" ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
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
            tab === "book" ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
          }
          onClick={() => {
            setTab("book");
          }}
        >
          <h1>관련도서</h1>
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
  if (tab === "food") {
    return <ShareList data={food} />;
  }
  if (tab === "product") {
    return <ShareList data={product} />;
  }
}

function ShareList({ data }) {
  return data.map((item, i) => {
    if (item.title !== "") {
      return (
        <Link
          to={item.url}
          className={cn(style.itemContainer, style.link)}
          key={i}
        >
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt="나눔" />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
              {item.title.length >= 10
                ? item.title.slice(0, 11).concat("...")
                : item.title}
            </h2>
            <strong>
              {item.cost >= 0
                ? item.cost.toLocaleString("ko-KR") + "원"
                : item.cost}
            </strong>
            <span>{item.location}</span>
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

function InputModal({ clickedPlusBtn, setClickedPlusBtn }) {
  const options = ["종류 선택", "식재료", "식기 및 도구", "관련도서"];
  const fileInput = useRef(null);
  const [selectedkind, setSelectedKind] = useState("종류 선택");
  let title = "";
  let content = "";
  let cost = "가격없음";
  const author = useSelector((state) => state.loginInfo.name);

  const clickUploadBtn = () => {
    fileInput.current.click();
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

  const handleCost = (e) => {
    let value = e.target.value;

    if (typeof parseInt(value) === "number") {
      cost = parseInt(value);
    } else {
      cost = "가격없음";
    }
  };

  const inputData = () => {
    setClickedPlusBtn(false);

    if (food[0].kind === selectedkind) {
      const index = food.length - 1;
      food[index].title = title;
      food[index].content = content;
      food[index].cost = cost;
      food[index].author = author;
    }
    if (product[0].kind === selectedkind) {
      const index = product.length - 1;
      product[index].title = title;
      product[index].content = content;
      product[index].cost = cost;
      product[index].author = author;
    }
  };

  const showAlert = () => {
    return alert("나눔 정보를 다 입력해주세요. (가격 제외)");
  };

  if (clickedPlusBtn) {
    return (
      <article className={cn(style.inputModalContainer)}>
        <header className={cn(style.modalTitle)}>
          <h1>나눔 하기</h1>
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
            placeholder="제목을 입력해주세요."
            onChange={handleTitle}
            className={cn(style.modalItem)}
          />

          <input
            type="text"
            placeholder="가격을 입력해주세요.(선택)"
            onChange={handleCost}
            className={cn(style.modalItem)}
          />

          <textarea
            onChange={handleContent}
            placeholder="내용을 입력해주세요."
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

export default Share;
