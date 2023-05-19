import React, { useState, useEffect } from "react";
import { food, product } from "./Share-data";
import Sidebar from "./Sidebar";
import style from "./ShareContent.module.css";
import cn from "classnames";
import { useParams } from "react-router-dom";
import Clock from "react-live-clock";
import { useDispatch, useSelector } from "react-redux";
import { inputShareMark, deleteShareMark } from "../store";

function ShareContent({ chats, setChats }) {
  const { id } = useParams();
  const [chatBtn, setChatBtn] = useState(false);
  const [data, setData] = useState("");

  return (
    <section>
      <aside>
        <Sidebar />
      </aside>
      {<Content id={id} setChatBtn={setChatBtn} setData={setData} />}
      {chatBtn ? (
        <ChatModal
          data={data}
          chats={chats}
          setChats={setChats}
          setChatBtn={setChatBtn}
        />
      ) : null}
    </section>
  );
}

function Content({ id, setChatBtn, setData }) {
  if (food.findIndex((data) => data.id === id) !== -1) {
    const data = food.filter((data) => data.id === id);

    // data의 [{...}] 자료형을 {...} 자료형으로 데이터를 보내기 위해서 data[0]을 사용했습니다.
    return (
      <ShowContent data={data[0]} setData={setData} setChatBtn={setChatBtn} />
    );
  }

  if (product.findIndex((data) => data.id === id) !== -1) {
    const data = product.filter((data) => data.id === id);
    return (
      <ShowContent data={data[0]} setData={setData} setChatBtn={setChatBtn} />
    );
  }
}

function ShowContent({ data, setData, setChatBtn }) {
  const [clickedLikeBtn, setClickedLikeBtn] = useState(false);
  const userName = useSelector((state) => state.loginInfo.name);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleLikeBtn = () => {
    if (!clickedLikeBtn) {
      setClickedLikeBtn(true);
      dispatch(inputShareMark(data.id));
    } else {
      setClickedLikeBtn(false);
      dispatch(deleteShareMark(data.id));
    }
  };

  const handleChatBtn = () => {
    setChatBtn(true);
  };

  const showAlert = () => {
    alert("로그인을 해주세요.");
  };

  return (
    <article className={cn(style.container)}>
      <header className={cn(style.imgContainer)}>
        <img src={data.img} alt={data.kind} />
      </header>
      <div className={cn(style.userInfoContainer)}>
        <div className={cn(style.userMainInfo)}>
          <div className={cn(style.imgContainer)}>
            <img src={data.user_img} alt={data.author} />
          </div>
          <div className={cn(style.textContainer)}>
            <strong>{data.author}</strong>
            <span>{data.location}</span>
          </div>
        </div>
        <div className={cn(style.userMannerInfo)}>
          <img
            src="/cook/public-assets/one-content/manner.png"
            alt="user manner gauge"
          />
        </div>
      </div>

      <div className={cn(style.contentContainer)}>
        <h1>{data.title}</h1>
        <strong>
          {data.cost >= 0
            ? data.cost.toLocaleString("ko-KR") + "원"
            : data.cost}
        </strong>
        <p>{data.content}</p>
      </div>

      <div className={cn(style.barBackgroundContainer)}>
        <aside className={cn(style.barContainer)}>
          <div className={cn(style.leftItem)}>
            <button
              type="button"
              className={cn(style.likeBtn)}
              onClick={() => {
                if (userName === "") {
                  return showAlert();
                } else {
                  return handleLikeBtn();
                }
              }}
            >
              {!clickedLikeBtn ? (
                <img
                  src="/cook/public-assets/one-content/heart.png"
                  alt="like button"
                />
              ) : (
                <img
                  src="/cook/public-assets/one-content/click-heart.png"
                  alt="click like button"
                />
              )}
            </button>
            <span>종류: {data.kind}</span>
          </div>
          <button
            type="button"
            className={cn(style.chatBtn)}
            onClick={() => {
              if (userName === "") {
                return showAlert();
              } else {
                return handleChatBtn();
              }
            }}
          >
            채팅하기
          </button>
        </aside>
      </div>
    </article>
  );
}

function ChatModal({ data, chats, setChats, setChatBtn }) {
  const [message, setMessage] = useState("");

  const [chatInfo, setChatInfo] = useState({
    authorProfilePicture: "",
    title: "",
    author: "",
    kind: "",
    messages: [],
  });

  // 채팅하는 게시물의 정보를 담는 코드입니다.
  useEffect(() => {
    if (chats.findIndex((c) => c.title === data.title) === -1) {
      chatInfo.authorProfilePicture = data.user_img;
      chatInfo.title = data.title;
      chatInfo.author = data.author;
      chatInfo.kind = `나눔: ${data.kind}`;
    }
  }, [data.title]);

  // 닫기 버튼을 눌렀을 때 최종적으로 채팅의 전체 데이터가 저장되는 함수입니다.
  const handleCloseBtn = () => {
    if (chats.findIndex((c) => c.title === chatInfo.title) > -1) {
      let copyChat = [...chats];
      setChats(copyChat);
    } else {
      let copyChat = [...chats];
      copyChat.push(chatInfo);
      setChats(copyChat);
    }

    resetChatInfo();
    setChatBtn(false);
  };

  const resetChatInfo = () => {
    const reset = {
      authorProfilePicture: "",
      title: "",
      author: "",
      kind: "",
      messages: [],
    };
    setChatInfo(reset);
  };

  const handleInput = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitBtn = () => {
    // chat에 이미 정보가 들어있을 때 -> 채팅 정보만 추가한다.
    if (chats.findIndex((c) => c.title === chatInfo.title) > -1) {
      let i = chats.findIndex((c) => c.title === chatInfo.title);
      chats[i].messages.push(message);
    }

    // 처음 채팅했을 때
    else {
      inputMessage(message);
    }
  };

  const inputMessage = (message) => {
    chatInfo.messages.push(message);
    setMessage("");
  };

  return (
    <div className={cn(style.absolute)}>
      <article className={cn(style.chatContainer)}>
        <header className={cn(style.header)}>
          <div className={cn(style.imgContainer)}>
            <img src={data.img} alt="상품 이미지" />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
              {data.title.length > 10
                ? data.title.slice(0, 12).concat("...")
                : data.title}
            </h2>
            <strong>{data.author}</strong>
          </div>
          <button
            type="button"
            className={cn(style.closeBtn)}
            onClick={handleCloseBtn}
          >
            <img
              src="/cook/public-assets/apply-content/close.png"
              alt="close button"
            />
          </button>
        </header>

        <article className={cn(style.chatList)}>
          <aside className={cn(style.dateContainer)}>
            <span className={cn(style.date)}>
              <Clock
                format={"YYYY-MM-DD"}
                ticking={false}
                timezone={"Asia/Seoul"}
              />
            </span>
          </aside>
          <div className={cn(style.userChatList)}>
            {<ShowChatList messages={chatInfo.messages} />}
          </div>
        </article>
        <form className={cn(style.inputContainer)}>
          <input
            type="text"
            value={message}
            onChange={handleInput}
            placeholder="내용입력"
          />
          <button
            type="button"
            onClick={() => {
              if (message !== "") {
                return handleSubmitBtn();
              }
            }}
            className={cn(style.sendBtn)}
          >
            <img
              src="/cook/public-assets/one-content/share.png"
              alt="share button"
            />
          </button>
        </form>
      </article>
    </div>
  );
}

function ShowChatList({ messages }) {
  return messages.map((message, i) => {
    return (
      <article className={cn(style.chatBox)} key={i}>
        <p>{message}</p>
        <span className={cn(style.chatTime)}>
          <Clock format={"A HH:mm"} ticking={false} timezone={"Asia/Seoul"} />
        </span>
        <span className={cn(style.nonRead)}>1</span>
      </article>
    );
  });
}

export default ShareContent;
