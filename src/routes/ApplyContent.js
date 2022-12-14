import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams } from "react-router-dom";
import Clock from 'react-live-clock';

function ApplyContent({isOpen, mark, setMark, chat, setChat, oneServing, dessert, login }) {
  let target = 'share';
  let {id} = useParams();
  let [chatBtn, setChatBtn] = useState(false);
  let [data, setData] = useState('');

  console.log(chat);

  return(
    <section className={cn(style.relative)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetContent id={id} oneServing={oneServing} dessert={dessert} mark={mark} setMark={setMark} setChatBtn={setChatBtn} setData={setData} login={login} />
      }
      {
        chatBtn ? <ShowChat data={data} chat={chat} setChat={setChat} setChatBtn={setChatBtn} /> : null
      }
    </section>
  );
}


function GetContent({id, oneServing, dessert, mark, setMark, setChatBtn, setData, login}) {

  for(let i=0; i<oneServing.length; i++) {
    if(id === oneServing[i].id) {
      return(<ShowContent data={oneServing[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} login={login} />);
    }
  }

  for(let i=0; i<dessert.length; i++) {
    if(id === dessert[i].id) {
      return(<ShowContent data={dessert[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} login={login} />);
    }
  }
}

function ShowContent({data,  setData, mark, setMark, setChatBtn, login}) {
  let [heartBtn, setHeartBtn] = useState(false);

  useEffect(()=>{
    setData(data);
  });

  const handleHeartBtn = () => {
    let copyMark = [...mark];

    if(login === '') {
      alert('로그인을 해주세요.');
      return;
    }
    if(!heartBtn) {
      setHeartBtn(true);
      copyMark.push(data.id);
      setMark(copyMark);
    }
  }

  const handleChatBtn = () => {
    if(login === '') {
      alert('로그인을 해주세요.');
    }
    else {
      setChatBtn(true);
    }
  };

  return(
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
        <div>
          <img src="/public-assets/one-content/manner.png" alt="user manner gauge" />
        </div>
      </article>

      <article className={cn(style.mainContent)}>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
      </article>

      <aside className={cn(style.bar)}>
        <div className={cn(style.leftItem)}>
          <button type="button" className={cn(style.heartBtn)} onClick={handleHeartBtn}>
            {
              !heartBtn 
              ? <img src="/public-assets/one-content/heart.png" alt="heart button" />
              : <img src="/public-assets/one-content/click-heart.png" alt="click heart button" />
            }
          </button>
          <span>종류: {data.kind}</span>
        </div>
        <button type="button" className={cn(style.chatBtn)} onClick={handleChatBtn} >
          채팅하기
        </button>
      </aside>
    </section>
  );
}


function ShowChat({data, chat, setChat, setChatBtn}) {
  let [text, setText] = useState('');
  let [msg, setMsg] = useState({userProfile: '', title: '', author: '', kind: '', chat: []});

  msg.userProfile = data.user_img;
  msg.title = data.title;
  msg.author = data.author;
  msg.kind = `신청: ${data.kind}`;


  const handleCloseBtn = () => {
    for(let i=0; i<chat.length; i++) {
      if(chat[i].title.indexOf(data.title) > -1) {
        let copyChat = [...chat];
        setChat(copyChat);
        setReset();
        return;
      }
    }

    let copyChat = [...chat];
    copyChat.push(msg);
    setChat(copyChat);
    setReset();
  }

  const setReset = () => {
    let reset = {img: '', title: '', author: '', chat: []};
    setTimeout(setMsg(reset), 1000);
    setChatBtn(false);
  }

  const handleChatInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmitBtn = () => {
    // chat에 이미 정보가 들어있을 때 -> 채팅 정보만 추가한다.
    for(let i=0; i<chat.length; i++) {
      if(text != '' && chat[i].title.indexOf(data.title) > -1) {
        chat[i].chat.push(text);
        inputMsg(text);
        return;
      }
      else {
        continue;
      }
    }

    // 처음 채팅할 때
    if(text != '' ) {
      inputMsg(text);
    }
  }

  const inputMsg = (text) => {
    msg.chat.push(text);
    setText('');
  }

  return(
    <section className={cn(style.absolute)}>
      <article className={cn(style.chatContainer)}>
        <header className={cn(style.header)}>
          <div className={cn(style.imgContainer)}>
            <img src={data.img} alt="상품 이미지" />
          </div>
          <div className={cn(style.itemInfo)}>
            <h2>
            {
              data.title.length > 10
              ? data.title.slice(0, 12).concat('...')
              : data.title
            }
            </h2>
            <strong>{data.author}</strong>
          </div>
          <button type="button" className={cn(style.closeBtn)} onClick={handleCloseBtn}>
            <img src="/public-assets/apply-content/close.png" alt="close button" />
          </button>
        </header>

        <article className={cn(style.chatList)}>
          <aside className={cn(style.dateContainer)}>
            <span className={cn(style.date)}>
              <Clock format={'YYYY-MM-DD'} ticking={false} timezone={"Asia/Seoul"} />
            </span>
          </aside>
          <section className={cn(style.myChat)}>
          {
            <ShowChatList msgList={msg.chat} />
          }
          </section>
        </article>
        <div className={cn(style.sendContainer)}>
          <input type="text" value={text} className={cn(style.inputStyle)} onChange={handleChatInput} placeholder="내용입력" />
          <button type="button" onClick={handleSubmitBtn} className={cn(style.sendBtn)}>
            <img src="/public-assets/one-content/share.png" alt="share button" />
          </button>
        </div>
      </article>
    </section>
  );
}

function ShowChatList({msgList}) {
  return (
    msgList.map((chat, i) => {
      return(
        <div key={i}>
          <article className={cn(style.chatBox)}>
            <p className={cn(style.myMsg)}>{chat}</p>
            <span className={cn(style.chatTime)}>
              <Clock format={'A HH:mm'} ticking={false} timezone={"Asia/Seoul"} />
            </span>
            <span className={cn(style.nonRead)}>
              1
            </span>
          </article>
        </div>
      );
    })
  );
}

export default ApplyContent;