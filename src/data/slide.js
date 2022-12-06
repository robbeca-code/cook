import { useState } from 'react';
import React from 'react';

function Slide() {
  let [slide, setSlide] = useState([
    {
      img: '/public-assets/slide1.png',
      title: '자취생! 무얼 먹을지 고민이라면',
      content: 'XX찌개 키트 세트는 어떠세요?'
    },
    {
      img: '/public-assets/slide1.png',
      title: '집들이 음식이 고민이라면',
      content: 'XX찌개 키트 세트는 어떠세요?'
    }
  ]);

  return (
    <section className="slide-container">
      {
        slide.map((slide, i) => {
          return (
            <div className="slide" key={'slide' + i}>
              <img 
                src={slide.img}
                alt="AD image1" 
                className="slide-img"/>
              <div className="slide-font-container">
                <h2 className="slide-font title">{slide.title}</h2>
                <span className="slide-font">{slide.content}</span>
              </div>
            </div>
          );
        })
      }
    </section>
  );
}

export default Slide;