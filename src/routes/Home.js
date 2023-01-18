import React from 'react';
import style from './Home.module.css';
import cn from 'classnames';
import { useState } from 'react';
import Sidebar from './Sidebar';
import {slide, tag, content} from './Home-data';

function Home({isOpen}) {
  let target = 'home';
  return (
    <section className={cn(style.home)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <Slide slide={slide} />

      <Tag tag={tag} />

      <Content content={content} />

      <article className={cn(style.video)}>
        <header>
          <h2 className={cn(style.subTitle)}>영상으로 확인하는</h2>
          <h1 className={cn(style.mainTitle)}>특별한 <span className={cn(style.point)}>저녁시간</span></h1>
        </header>
        <div className={cn(style.videoPlayer)}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/jC41T25dImI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </article>
    </section>
  );
}

function Slide({slide}) {
  let [index, setIndex] = useState(0);

  function onChangeImage(counter) {
    if(counter >= slide.length){
      index = 0;
      setIndex(index);
      return;
    } else if(counter < 0) {
      index = slide.length - 1;
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
          src={slide[0].img}
          alt="AD image1" 
          className={cn(style.slideImg)}/>
        <div className={cn(style.slideFontContainer)}>
          <h2 className={cn(style.slideFont, style.title)}>{slide[0].title}</h2>
          <span className={cn(style.slideFont)}>{slide[0].content}</span>
        </div>
      </div>
      <div className={cn(style.slide)} style={{
        left: '100%',
        transform: `translateX(-${index * 100}%)`
      }}>
        <img 
          src={slide[1].img}
          alt="AD image1" 
          className={cn(style.slideImg)}/>
        <div className={cn(style.slideFontContainer)}>
          <h2 className={cn(style.slideFont, style.title)}>{slide[1].title}</h2>
          <span className={cn(style.slideFont)}>{slide[1].content}</span>
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

function Tag({tag}) {
  return(
    <div className={cn(style.tagContainer)}>
      {
        tag.map((item, i) => {
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

function Content({content}) {

  return (
    <section className="appContents">
      {
        content.map((item, i) => {
          return (
            <article className={cn(style.content)} key={i}>
              <h2 className={cn(style.subTitle)}>{item.subTitle}</h2>
              
              <div className={cn(style.contentHeader)}>
                <h1 className={cn(style.mainTitle)}>{item.mainTitle} <span className={cn(style.point)}>{item.styleTitle}</span></h1>
                <div className={cn(style.bookmark)}>
                  <img src="/public-assets/home/bookmark.png" alt="bookrmark icon" className={cn(style.bookmark)} />
                </div>
              </div>

              <div className={cn(style.contentMain)}>
                <div className={cn(style.imgContainer)}>
                  <img src={item.img1} alt="" />
                </div>
                <div className={cn(style.imgContainer)}>
                  <img src={item.img2} alt="" />
                </div>
                <div className={cn(style.imgContainer)}>
                  <img src={item.img3} alt="" />
                </div>
              </div>
            </article>
          );
        })
      }
    </section>
  );
}

export default Home;