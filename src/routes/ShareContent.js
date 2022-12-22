import React from "react";
import Sidebar from "./Sidebar";
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams } from "react-router-dom";

function ShareContent({isOpen, food, product}) {
  let target = 'share';
  let {id} = useParams();

  return(
    <section>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetConent id={id} food={food} product={product}/>
      }
    </section>
  );
}

function GetConent({id, food, product}) {
  for(let i=0; i<food.length; i++) {
    if(id === food[i].id) {
      return(<ShowContent data={food[i]} />);
    }
  }

  for(let i=0; i<product.length; i++) {
    if(id === product[i].id) {
      return(<ShowContent data={product[i]} />);
    }
  }
}

function ShowContent({data}) {
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
        <strong>
          {
            data.cost != '가격없음' ? data.cost.concat('원') : data.cost
          }
        </strong>
        <p>{data.content}</p>
      </article>

      <aside className={cn(style.bar)}>
        <div className={cn(style.leftItem)}>
          <button type="button" className={cn(style.heartBtn)}>
            <img src="/public-assets/one-content/heart.png" alt="heart button" />
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

export default ShareContent;