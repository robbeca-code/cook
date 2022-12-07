import './App.css';
import React from 'react';
import { useState } from 'react';
import {slide, tag, content} from './data/data';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="tool-bar">
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className="top-icon menu" />
          </a>
          <img 
            src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
            alt="logo"
            className="logo" />
          <a href="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className="top-icon search" />
          </a>
        </nav>

        <Slide slide={slide} />

        <Tag tag={tag} />

        <Content content={content} />

        <Nav />
      </header>

    </div>
  );
}


function Slide(props) {
  let [index, setIndex] = useState(0);

  function onChangeImage(counter) {
    console.log(index +', '+counter);
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
    <section className="slide-container">
      <div className="slide" style={{
        left: '0%',
        transform: `translateX(-${index * 100}%)`
      }}>
        <img 
          src={props.slide[0].img}
          alt="AD image1" 
          className="slide-img"/>
        <div className="slide-font-container">
          <h2 className="slide-font title">{props.slide[0].title}</h2>
          <span className="slide-font">{props.slide[0].content}</span>
        </div>
      </div>
      <div className="slide" style={{
        left: '100%',
        transform: `translateX(-${index * 100}%)`
      }}>
        <img 
          src={props.slide[1].img}
          alt="AD image1" 
          className="slide-img"/>
        <div className="slide-font-container">
          <h2 className="slide-font title">{props.slide[1].title}</h2>
          <span className="slide-font">{props.slide[1].content}</span>
        </div>
      </div>
      <button type="button" className="btn prev-btn" onClick={() => {
        onChangeImage(index - 1);
      }}>
        <img src="/public-assets/prev.png" alt="Preview button" />
      </button>
      <button type="button" className="btn next-btn" onClick={() => {
        onChangeImage(index + 1);
      }}>
        <img src="/public-assets/next.png" alt="Next button" />
      </button>
    </section>
  );
}

function Tag(props) {
  return(
    <div className="tag-container">
      {
        props.tag.map((item, i) => {
          return(
            <button type="button" className="btn tag-btn" key={'tag' + i}>
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
    <section className="app-contents">
      {
        props.content.map((item, i) => {
          return (
            <article className="content" key={i}>
              <h2 className="sub-title">{item.subTitle}</h2>
              <div className="content-header">
                <h1 className="main-title">{item.mainTitle} <span className="point">{item.styleTitle}</span></h1>
                <img src="/public-assets/bookmark.png" alt="bookrmark icon" className="bookmark" />
              </div>
              <div className="content-main">
                <div className="img-container">
                  <img src={item.img1} alt="" />
                </div>
                {
                  item.img2 === undefined ? null : 
                    <div className="img-container">
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

function Nav() {

  return(
    <ol className="gnb">
      <li className="gnb-item">
        <img src="/public-assets/nav/click-home.png" alt="home icon" className="gnb-icon"/>
        <span className="gnb-title click">홈</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/recipe.png" alt="recipe icon" className="gnb-icon"/>
        <span className="gnb-title">레시피</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/main.png" alt="main icon" className="gnb-main"/>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/chat.png" alt="chatting icon" className="gnb-icon"/>
        <span className="gnb-title">채팅</span>
      </li>
      <li className="gnb-item">
        <img src="/public-assets/nav/mypage.png" alt="mypage icon" className="gnb-icon"/>
        <span className="gnb-title">마이페이지</span>
      </li>
    </ol>
  );
}
export default App;
