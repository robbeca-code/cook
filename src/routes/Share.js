import React, { useState } from "react";
import Sidebar from './Sidebar';
import style from './Share.module.css';
import cn from "classnames";
import { Link } from "react-router-dom";

function Share({isOpen, food, product}) {
  const target = 'share';
  let [tab, setTab] = useState('food');

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <header className={cn(style.tabContainer)}>
        <button type="button" className=
          {
            tab === 'food' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => {setTab('food')}}>
          <h1>식재료</h1>
        </button>
        <button type="button" className=
          {
            tab === 'product' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('product'); }}>
          <h1>식기 및 도구</h1>
        </button>
        <button type="button" className=
          {
            tab === 'book' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('book'); }}>
          <h1>관련도서</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>
        {
          <ClickList tab={tab} food={food} product={product} />
        }
      </section>
    </section>
  );
}

function ClickList({tab, food, product}) {
  if(tab === 'food') {
    return(<ShareList data={food} />);
  }
  if(tab === 'product') {
    return(<ShareList data={product} />);
  }
}

function ShareList({data}) {
  return(
    data.map((item, i) => {
      return(
        <Link to={item.url} className={cn(style.item, style.link)} key={i}>
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt="나눔" />
          </div>
          <h2>
            {
              item.title.length >= 10 
              ? item.title.slice(0, 11).concat('...') 
              : item.title
            }
          </h2>
          <div className={cn(style.subInfo)}>
            <strong>
              {
                item.cost != '가격없음' ? item.cost.concat('원') : item.cost
              }
            </strong>
            <span>{item.location}</span>
          </div>
        </Link>
      );
    })
  );
}

export default Share;