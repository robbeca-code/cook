import React, { useState } from "react";
import Sidebar from "./Sidebar";
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams } from "react-router-dom";

function ApplyContent({isOpen, oneServing, dessert, mark, setMark}) {
  let target = 'share';
  let {id} = useParams();

  return(
    <section>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetConent id={id} oneServing={oneServing} dessert={dessert} mark={mark} setMark={setMark} />
      }
    </section>
  );
}

function GetConent({id, oneServing, dessert, mark, setMark}) {
  for(let i=0; i<oneServing.length; i++) {
    if(id === oneServing[i].id) {
      return(<ShowContent data={oneServing[i]} mark={mark} setMark={setMark} />);
    }
  }

  for(let i=0; i<dessert.length; i++) {
    if(id === dessert[i].id) {
      return(<ShowContent data={dessert[i]} mark={mark} setMark={setMark} />);
    }
  }
}

function ShowContent({data, mark, setMark}) {
  let [heartBtn, setHeartBtn] = useState(false);

  const handleHeartBtn = () => {
    let copyMark = [...mark];

    if(!heartBtn) {
      setHeartBtn(true);
      copyMark.push(data.id);
      setMark(copyMark);
    }
  }

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
        <button type="button" className={cn(style.chatBtn)}>
          채팅하기
        </button>
      </aside>
    </section>
  );
}

export default ApplyContent;