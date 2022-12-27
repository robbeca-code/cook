import React , { useState } from "react";
import Sidebar from "./Sidebar";
import style from './RecipeContent.module.css';
import cn from 'classnames';

function RecipeContent({isOpen, data, mark, setMark}) {
  let target = 'recipe';
  let [bookmark, setBookmark] = useState([false, false, false, false, false, false, false, false, false, false]);

  const handleLevel = (level) => {
    if(level === '하') {
      return ('/public-assets/recipe/level-b.png');
    }
    else if(level === '중') {
      return ('/public-assets/recipe/level-m.png');
    }
    else {
      return('/public-assets/recipe/level-t.png');
    }
  }

  const handleBookmarkBtn = (id, index) => {
    let copyBookmark = [...bookmark];
    copyBookmark[index] = true;
    setBookmark(copyBookmark);

    let copyMark = [...mark];
    copyMark.push(id);
    setMark(copyMark);
  }

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <header className={cn(style.containerTitle)}>
        <h1>참치통조림</h1>
      </header>
      
      <section className={cn(style.grid)}>
        {

          data.map((item, i) => {
            return(
              <article className={cn(style.itemContainer)} key={i}>
                <div className={cn(style.imgContainer)}>
                  <img src={item.img} alt={item.img_alt} />
                  <button type="button" className={cn(style.bookmark)} onClick={ () => {handleBookmarkBtn(item.id, i)} }>
                  {
                    !bookmark[i] 
                    ? <img src="/public-assets/recipe/bookmark.png" alt="bookmark button" />
                    : <img src="/public-assets/recipe/click-bookmark.png" alt="click bookmark button" />
                  }
                  </button>
                </div>
                <h2>{item.title}</h2>
                <div className={cn(style.itemInfo)}>
                  <div className={cn(style.item)}>
                    <img src="/public-assets/recipe/heart.png" className={cn(style.subInfoImg)} alt="like" />
                    <span>{item.heart}</span>
                  </div>
                  <div className={cn(style.item)}>
                    <img src={ handleLevel(item.level) } alt="level" />
                    <span>{item.level}</span>
                  </div>
                  <div className={cn(style.item)}>
                    <img src="/public-assets/recipe/timer.png" alt="time" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </article>
            );
            
          })
        }
      </section>
    </section>
  );
}

export default RecipeContent;