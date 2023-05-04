import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import style from "./ShareContent.module.css";
import cn from "classnames";
import { useParams } from "react-router-dom";
import Clock from "react-live-clock";
import { useSelector, useDispatch } from "react-redux";
import { inputMark, deleteMark } from "../store";

function ApplyContent({ chats, setChats, oneServing, dessert }) {
  let { id } = useParams();
  let [chatBtn, setChatBtn] = useState(false);
  let [data, setData] = useState("");

  return (
    <section className={cn(style.relative)}>
      <aside>
        <Sidebar />
      </aside>
      {
        <GetContent
          id={id}
          oneServing={oneServing}
          dessert={dessert}
          setChatBtn={setChatBtn}
          setData={setData}
        />
      }
      {chatBtn ? (
        <ShowChat
          data={data}
          chats={chats}
          setChats={setChats}
          setChatBtn={setChatBtn}
        />
      ) : null}
    </section>
  );
}

function GetContent({ id, oneServing, dessert, setChatBtn, setData }) {
  for (let i = 0; i < oneServing.length; i++) {
    if (id === oneServing[i].id) {
      return (
        <ShowContent
          data={oneServing[i]}
          setData={setData}
          setChatBtn={setChatBtn}
        />
      );
    }
  }

  for (let i = 0; i < dessert.length; i++) {
    if (id === dessert[i].id) {
      return (
        <ShowContent
          data={dessert[i]}
          setData={setData}
          setChatBtn={setChatBtn}
        />
      );
    }
  }
}

function ShowContent({ data, setData, setChatBtn }) {
  let [heartBtn, setHeartBtn] = useState(false);
  let userId = useSelector((state) => state.login.nickname);
  let dispatch = useDispatch();

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleHeartBtn = () => {
    if (userId === "") {
      alert("로그인을 해주세요.");
      return;
    }
    if (!heartBtn) {
      setHeartBtn(true);
      dispatch(inputMark(data.id));
    } else {
      setHeartBtn(false);
      dispatch(deleteMark(data.id));
    }
  };

  const handleChatBtn = () => {
    if (userId === "") {
      alert("로그인을 해주세요.");
    } else {
      setChatBtn(true);
    }
  };

  return (
    <section className={cn(style.container)}>
      <header className={cn(style.imgContainer)}>
        <img src={data.img} alt={data.kind} />
      </header>
      <article className={cn(style.userContainer)}>
        <div className={cn(style.user)}>
          <div className={cn(style.imgContainer)}>
            <img src={data.user_img} alt={data.author} />
          </div>
          <div className={cn(style.userInfo)}>
            <h2>{data.author}</h2>
            <span>{data.location}</span>
          </div>
        </div>
        <div className={cn(style.manner)}>
          <img
            src="/cook/public-assets/one-content/manner.png"
            alt="user manner gauge"
          />
        </div>
      </article>

      <article className={cn(style.mainContent)}>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </article>

      <aside className={cn(style.bar)}>
        <div className={cn(style.leftItem)}>
          <button
            type="button"
            className={cn(style.heartBtn)}
            onClick={handleHeartBtn}
          >
            {!heartBtn ? (
              <img
                src="/cook/public-assets/one-content/heart.png"
                alt="heart button"
              />
            ) : (
              <img
                src="/public-assets/one-content/click-heart.png"
                alt="click heart button"
              />
            )}
          </button>
          <span>종류: {data.kind}</span>
        </div>
        <button
          type="button"
          className={cn(style.chatBtn)}
          onClick={handleChatBtn}
        >
          채팅하기
        </button>
      </aside>
    </section>
  );
}

function ShowChat({ data, chats, setChats, setChatBtn }) {
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
    if (chats.findIndex((c) => c.title === data.title) == -1) {
      chatInfo.authorProfilePicture = data.user_img;
      chatInfo.title = data.title;
      chatInfo.author = data.author;
      chatInfo.kind = `신청: ${data.kind}`;
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

    setReset();
    setChatBtn(false);
  };

  const setReset = () => {
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
    <section className={cn(style.absolute)}>
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
              src="/public-assets/apply-content/close.png"
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
          <section className={cn(style.myChat)}>
            {<ShowChatList messages={chatInfo.messages} />}
          </section>
        </article>
        <div className={cn(style.sendContainer)}>
          <input
            type="text"
            value={message}
            className={cn(style.inputStyle)}
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
              src="/public-assets/one-content/share.png"
              alt="share button"
            />
          </button>
        </div>
      </article>
    </section>
  );
}

function ShowChatList({ messages }) {
  return messages.map((message, i) => {
    return (
      <div key={i}>
        <article className={cn(style.chatBox)}>
          <p className={cn(style.myMsg)}>{message}</p>
          <span className={cn(style.chatTime)}>
            <Clock format={"A HH:mm"} ticking={false} timezone={"Asia/Seoul"} />
          </span>
          <span className={cn(style.nonRead)}>1</span>
        </article>
      </div>
    );
  });
}

export default ApplyContent;
