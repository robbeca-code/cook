import React from 'react';
import style from './Home.module.css';
import cn from 'classnames';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {slide, tag, content} from './Home-data';

function Home(props) {
  return (
    <div className="Home">
        <aside>
          <Sidebar isOpen={props.isOpen} />
        </aside>

        <Slide slide={slide} />

        <Tag tag={tag} />

        <Content content={content} />
    </div>
  );
}


function Sidebar(props) {
  let isOpen;

  if(!props.isOpen) {
    isOpen = 'hide-sidebar';
  } else {
    isOpen = 'hide-sidebar show';
  }

  return(
    <ol className={isOpen}>
      <li className={cn(style.sideItem)}>
        <Link to="/">
          <img src="/public-assets/nav/click-home.png" alt="home icon" className={cn(style.sideIcon)}/>
          <span className={cn(style.sideTitle, style.click)}>홈</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>레시피</span>
      </li>
      <li className={cn(style.sideItem)}>
        <Link to="/share-application" className={cn(style.link)}>
          <img src="/public-assets/nav/main.png" alt="main icon" className={cn(style.sideIcon, style.main)}/>
          <span className={cn(style.sideTitle)}>나눔/신청</span>
        </Link>
      </li>
      <li className={cn(style.sideItem)}>
        <img src="/public-assets/nav/chat.png" alt="chatting icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>채팅</span>
      </li>
      <li className={cn(style.sideItem)}>
        <img src="/public-assets/nav/mypage.png" alt="mypage icon" className={cn(style.sideIcon)}/>
        <span className={cn(style.sideTitle)}>마이페이지</span>
      </li>
    </ol>
  );
}

function Slide(props) {
  let [index, setIndex] = useState(0);

  function onChangeImage(counter) {
    if(counter >= props.slide.length){
      index = 0;
      setIndex(index);
      return;
    } else if(counter < 0) {
      index = props.slide.length - 1;
      setIndex(index);
      return;
    }

    setIndex(counter);
  }

  return (
    <section className={cn(style.slideContainer)}>
      <div className={cn(style.slide)} style={{
        left: '0%',
        transform: `translateX(-${index * 100}%)`
      }}>
        <img 
          src={props.slide[0].img}
          alt="AD image1" 
          className={cn(style.slideImg)}/>
        <div className={cn(style.slideFontContainer)}>
          <h2 className={cn(style.slideFont, style.title)}>{props.slide[0].title}</h2>
          <span className={cn(style.slideFont)}>{props.slide[0].content}</span>
        </div>
      </div>
      <div className={cn(style.slide)} style={{
        left: '100%',
        transform: `translateX(-${index * 100}%)`
      }}>
        <img 
          src={props.slide[1].img}
          alt="AD image1" 
          className={cn(style.slideImg)}/>
        <div className={cn(style.slideFontContainer)}>
          <h2 className={cn(style.slideFont, style.title)}>{props.slide[1].title}</h2>
          <span className={cn(style.slideFont)}>{props.slide[1].content}</span>
        </div>
      </div>
      <button type="button" className={cn(style.btn, style.prevBtn)} onClick={() => {
        onChangeImage(index - 1);
      }}>
        <img src="/public-assets/home/prev.png" alt="Preview button" />
      </button>
      <button type="button" className={cn(style.btn, style.nextBtn)} onClick={() => {
        onChangeImage(index + 1);
      }}>
        <img src="/public-assets/home/next.png" alt="Next button" />
      </button>
    </section>
  );
}

function Tag(props) {
  return(
    <div className={cn(style.tagContainer)}>
      {
        props.tag.map((item, i) => {
          return(
            <button type="button" className={cn(style.btn, style.tagBtn)} key={'tag' + i}>
              {item}
            </button>
          );
        })
      }
    </div>
  );
}

function Content(props) {

  return (
    <section className="appContents">
      {
        props.content.map((item, i) => {
          return (
            <article className={cn(style.content)} key={i}>
              <h2 className={cn(style.subTitle)}>{item.subTitle}</h2>
              <div className={cn(style.contentHeader)}>
                <h1 className={cn(style.mainTitle)}>{item.mainTitle} <span className={cn(style.point)}>{item.styleTitle}</span></h1>
                <img src="/public-assets/home/bookmark.png" alt="bookrmark icon" className={cn(style.bookmark)} />
              </div>
              <div className={cn(style.contentMain)}>
                <div className={cn(style.imgContainer)}>
                  <img src={item.img1} alt="" />
                </div>
                {
                  item.img2 === undefined ? null : 
                    <div className={cn(style.imgContainer)}>
                      <img src={item.img2} alt="" />
                    </div>
                }
                
              </div>
            </article>
          );
        })
      }
    </section>
  );
}

export default Home;