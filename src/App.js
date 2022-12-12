import './App.css';
import React from 'react';
import Home from './routes/Home';
import { useState } from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import NonPage from './routes/NonPage';
import ShaApp from './routes/sha-app';
import OneServing from './routes/OneServing';
import servingList from './routes/OneServing-data';

function App() {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <nav className="tool-bar">
          <button type="button" onClick={() => {
            setIsOpen(!isOpen);
          }}>
            <img
              src={process.env.PUBLIC_URL + '/public-assets/menu.png'}
              alt="menu icon"
              className="top-icon menu" />
          </button>
          <Link to="/">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/logo.png'}
              alt="logo"
              className="logo" />
          </Link>
          
          <Link to="#">
            <img 
              src={process.env.PUBLIC_URL + '/public-assets/search.png'}
              alt="search icon"
              className="top-icon search" />
          </Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home isOpen={isOpen} />} />
        <Route path="*" element={<NonPage />} />
        <Route path="/share-application" element={<ShaApp isOpen={isOpen} />} />
        <Route path="/share-application/one-serving" element={<OneServing isOpen={isOpen} data={servingList} />} />
      </Routes>
    </div>
  );
}

export default App;
