import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import Clock from 'react-live-clock';
import { useDispatch, useSelector } from 'react-redux';
import { inputMark } from '../store';

function ShareContent({isOpen, food, product, chat, setChat, mark, setMark}) {
  let target = 'share';
  let {id} = useParams();
  let [chatBtn, setChatBtn] = useState(false);
  let [data, setData] = useState('');
  let Mark = useSelector((state) => (state.mark));
  console.log(Mark);

  return(
    <section>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetConent id={id} food={food} product={product} mark={mark} setMark={setMark} setChatBtn={setChatBtn} setData={setData} />
      }
      {
        chatBtn ? <ShowChat data={data} chat={chat} setChat={setChat} setChatBtn={setChatBtn} /> : null
      }
    </section>
  );
}

function GetConent({id, food, product, mark, setMark, setChatBtn, setData}) {
  for(let i=0; i<food.length; i++) {
    if(id === food[i].id) {
      return(<ShowContent data={food[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} />);
    }
  }

  for(let i=0; i<product.length; i++) {
    if(id === product[i].id) {
      return(<ShowContent data={product[i]} setData={setData} mark={mark} setMark={setMark} setChatBtn={setChatBtn} />);
    }
  }
}

function ShowContent({data, mark, setMark, setData, setChatBtn}) {
  let [heartBtn, setHeartBtn] = useState(false);
  let userId = useSelector((state) => (state.login.nickname));
  let marK = useSelector((state) => (state.mark));
  let dispatch = useDispatch();

  useEffect(()=>{
    setData(data);
  });

  const handleHeartBtn = () => {
    let copyMark = [...mark];
    

    if(userId === '') {
      alert('로그인을 해주세요.');
      return;
    }

    if(!heartBtn) {
      setHeartBtn(true);
      copyMark.push(data.id);
      setMark(copyMark);
      dispatch(inputMark(data.id));
    }
    else {
      setHeartBtn(false);
      for(let i=0; i<mark.length; i++) {
        if(mark[i] === data.id) {
          mark.splice(i, 1);
          setMark(copyMark);
        }
      }
    }
  }

  const handleChatBtn = () => {
    if(userId === '') {
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
        <div className={cn(style.manner)}>
          <img src="/public-assets/one-content/manner.png" alt="user manner gauge" />
        </div>
      </article>

      <article className={cn(style.mainContent)}>
        <h1>{data.title}</h1>
        <strong>
          {
            data.cost != '가격없음' ? data.cost.concat('원') : data.cost
          }
        </strong>
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
        <button type="button" className={cn(style.chatBtn)} onClick={handleChatBtn}>
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
  msg.kind = `나눔: ${data.kind}`;
  

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

export default ShareContent;