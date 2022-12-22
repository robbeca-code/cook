import React from 'react';
import { useState } from "react";
import style from './One-Content.module.css';
import cn from 'classnames';
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function OneServing_Content(props) {
  let target = 'target';
  let {id} = useParams();
  let data = props.data;
  let [like, setLike] = useState(false);

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={props.isOpen} click={target} />
      </aside>

      <div className={cn(style.imgContainer)}>
        <img src={data[id].img} alt={data[id].img_alt} />
      </div>

      <article className={cn(style.userContainer)}>
        <div className={cn(style.flex)}>
          <div className={cn(style.userProfile)}>
            <img src={data[id].user_img} alt="user profile" />
          </div>
          <div className={cn(style.userInfo)}>
            <h2>{data[id].author}</h2>
            <span>{data[id].location}</span>
          </div>
        </div>
        <div className={cn(style.userManner)}>
          <img src="/public-assets/one-content/manner.png" alt="안심온도" />
        </div>
      </article>

      <article className={cn(style.content)}>
        <h1>{data[id].name}</h1>
        <p>{data[id].content}</p>
      </article>

      <div className={cn(style.bar)}>
        <div className={cn(style.leftItem)}>
          <button type="button" className={cn(style.likeBtn)} onClick={() => {
            if(like) {
              setLike(false);
            } else {
              setLike(true);
            }
          }}>
            <img src=
              {
                like 
                ? "/public-assets/one-content/click-heart.png" 
                : "/public-assets/one-content/heart.png"
              } 
              alt="like button" />
          </button>
          <span>종류: {data[id].kind}</span>
        </div>
        
        <Link to="/chat" className={cn(style.chatBtn)}>
          채팅하기
        </Link>
      </div>
    </section>
  );
}

export default OneServing_Content;