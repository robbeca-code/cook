import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <nav className="tool-bar">
          <a href="#">
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className="icon menu" />
          </a>
          <img 
            src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
            alt="logo"
            className="logo" />
          <a href="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className="icon search" />
          </a>
        </nav>

        <Slide />

        <Tag />
      </header>

    </div>
  );
}

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

function Tag() {
  let tag = ['#닭요리', '#저녁_반찬_추천', '#찌개', '#찜닭_재료', '#삼계탕', '#천연조미료', '#알리오올리오'];

  return(
    <div className="tag-container">
      {
        tag.map((item, i) => {
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

export default App;
