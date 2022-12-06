import './App.css';
import React from 'react';
import { useState } from 'react';
import Slide from './data/slide';
import Tag from './data/tag';
import Content from './data/content';
import Nav from './data/navigation';

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

        <Content />

        <Nav />
      </header>

    </div>
  );
}

export default App;
