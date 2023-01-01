import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams, Link } from "react-router-dom";
import Clock from 'react-live-clock';

function ApplyContent({isOpen, mark, setMark, chat, setChat, oneServing, dessert }) {
  let target = 'share';
  let {id} = useParams();
  let [chatBtn, setChatBtn] = useState(false);
  let [data, setData] = useState('');

  return(
    <section className={cn(style.relative)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetContent id={id} oneServing={oneServing} dessert={dessert} mark={mark} setMark={setMark} setChatBtn={setChatBtn} setData={setData} />
      }
      {
        chatBtn ? <ShowChat data={data} chat={chat} setChat={setChat} setChatBtn={setChatBtn} /> : null
      }
    </section>
  );
}


function GetContent({id, oneServing, dessert, mark, setMark, setChatBtn, setData}) {
  let data;

  for(let i=0; i<oneServing.length; i++) {
    if(id === oneServing[i].id) {
      data = oneServing[i];
      return(<ShowContent data={oneServing[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} />);
    }
  }

  for(let i=0; i<dessert.length; i++) {
    if(id === dessert[i].id) {
      data = dessert[i];
      return(<ShowContent data={dessert[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} />);
    }
  }
}

function ShowContent({data,  setData, mark, setMark, setChatBtn}) {
  let [heartBtn, setHeartBtn] = useState(false);

  useEffect(()=>{
    setData(data);
  });

  const handleHeartBtn = () => {
    let copyMark = [...mark];

    if(!heartBtn) {
      setHeartBtn(true);
      copyMark.push(data.id);
      setMark(copyMark);
    }
  }

  const handleChatBtn = () => {
    setChatBtn(true);
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

  const handleChatInput = (e) => {
    setText(e.target.value);
  };

  const handleSubmitBtn = () => {
    let copyChat = [...chat];
    copyChat.push(text);
    setChat(copyChat);
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
            <h2>{data.title}</h2>
            <strong>{data.author}</strong>
          </div>
          <button type="button" className={cn(style.closeBtn)} onClick={() => {setChatBtn(false)}}>
            <img src="/public-assets/apply-content/close.png" alt="close button" />
          </button>
        </header>

        <article className={cn(style.chatList)}>
          <aside className={cn(style.dateContainer)}>
            <span className={cn(style.date)}>
              <Clock format={'YYYY-MM-DD'} ticking={false} timezone={"Asia/Seoul"} />
            </span>
          </aside>
          <section>
          {
            <ShowChatList chatList={chat} />
          }
          </section>
        </article>
        <div className={cn(style.sendContainer)}>
          <input type="text" value={text} className={cn(style.inputStyle)} onChange={handleChatInput} />
          <button type="button" onClick={handleSubmitBtn}>전송</button>
        </div>
      </article>
    </section>
  );
}

function ShowChatList({chatList}) {
  return (
    chatList.map((chat, i) => {
      return(
        <article key={i}>
        <span>{chat}</span>
      </article>
      );
    })
  );
}

export default ApplyContent;