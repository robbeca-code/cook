import React from 'react';
import Sidebar from './Sidebar';
import style from './OneServing.module.css';
import cn from 'classnames';
import list from './OneServing-data';
import { Link } from 'react-router-dom';


function OneServing(props) {
  let click = 'share';

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={props.isOpen} click={click} />
      </aside>

      <header className={cn(style.containerTitle)}>
        <h1>1인분</h1>
        <h1>디저트</h1>
        <h1>대용량</h1>
      </header>

      

      <section className={cn(style.contentList)}>
        <div className={cn(style.grid)}>
          {
            list.map((item) => {
              return(
                <Link to={item.url} className={cn(style.content, style.link)} key={item.id}>
                  <div className={cn(style.imgContainer)}>
                    <img src={item.img} alt={item.img_alt} />
                  </div>
                  
                  <div className={cn(style.flex)}>
                    <h2 className={cn(style.title)}>
                      {item.name.length >= 15 ? item.name.slice(0, 12).concat('...') : item.name}
                    </h2>
                    <span className={cn(style.sideContent)}>{item.location}</span>
                    <span className={cn(style.sideContent)}>{item.author}</span>
                  </div>
                </Link>
              );
            })
          }
        </div>
      </section>

      <button type="button" className={cn(style.plus)}>
        <img src="/public-assets/one-serving/plus.png" alt="Plus button" />
      </button>
    </section>
  );
}

export default OneServing;