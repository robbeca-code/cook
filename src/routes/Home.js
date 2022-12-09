import React from 'react';
import './Home.css';
import { useState } from 'react';
import {slide, tag, content} from './data';

function Home() {
  return (
    <div className="Home">
        <Slide slide={slide} />

        <Tag tag={tag} />

        <Content content={content} />
    </div>
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

export default Home;