import React, { useRef, useState } from "react";
import Sidebar from './Sidebar';
import style from './Share.module.css';
import cn from "classnames";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function Share({isOpen, food, product}) {
  const target = 'share';
  let [tab, setTab] = useState('food');
  let [plus, setPlus] = useState(false);

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <header className={cn(style.tabContainer)}>
        <button type="button" className=
          {
            tab === 'food' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => {setTab('food')}}>
          <h1>식재료</h1>
        </button>
        <button type="button" className=
          {
            tab === 'product' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('product'); }}>
          <h1>식기 및 도구</h1>
        </button>
        <button type="button" className=
          {
            tab === 'book' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('book'); }}>
          <h1>관련도서</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>
        {
          <ClickTab tab={tab} food={food} product={product} />
        }
      </section>

      <button type="button" className={cn(style.plusBtn)} onClick={() => { setPlus(true) }}>
        <img src="/public-assets/one-content/plus.png" alt="plus button" />
      </button>

      <PlusContent f={food} p={product} plus={plus} setPlus={setPlus} />

    </section>
  );
}


function ClickTab({tab, food, product}) {
  if(tab === 'food') {
    return(<ShareList data={food} />);
  }
  if(tab === 'product') {
    return(<ShareList data={product} />);
  }
}

function ShareList({data}) {

  return(
    data.map((item, i) => {
      if(item.title != '') {
        return(
          <Link to={item.url} className={cn(style.item, style.link)} key={i}>
            <div className={cn(style.imgContainer)}>
              <img src={item.img} alt="나눔" />
            </div>
            <h2>
              {
                item.title.length >= 10 
                ? item.title.slice(0, 11).concat('...') 
                : item.title
              }
            </h2>
            <div className={cn(style.subInfo)}>
              <strong>
                {
                  item.cost != '가격없음' ? item.cost.concat('원') : item.cost
                }
              </strong>
              <span>{item.location}</span>
            </div>
          </Link>
        );
      }
      else {
        return(null);
      }
    })
  ); 
}

function PlusContent({f, p, plus, setPlus}) {
  const options = ['종류 선택','식재료', '식기 및 도구', '관련도서'];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
  let cost;
  let img;
  let author = useSelector((state) => (state.login.nickname));

  const clickUploadBtn = () => {
    fileInput.current.click();
  }

  const changeFileInput = (e) => {
    img = e.target.files;
  }

  const handleKind = (e) => {
    kind = e.target.value;
  };

  const handleTitle = (e) => {
    title = e.target.value;
  };

  const handleContent = (e) => {
    content = e.target.value;
  };

  const handleCost = (e) => {
    cost = e.target.value;
  };

  const inputData = () => {
    setPlus(false);

    if(f[0].kind === kind) {
      const index = f.length - 1;
      f[index].title = title;
      f[index].content = content;
      f[index].cost = cost;
      f[index].author = author;
    }
    if(p[0].kind === kind) {
      const index = p.length - 1;
      p[index].title = title;
      p[index].content = content;
      p[index].cost = cost;
      p[index].author = author;
    }
  };

  if(plus) {
    return(
      <article className={cn(style.inputModal)}>
        <header className={cn(style.modalTitle)}>
          <h1>나눔 하기</h1>
        </header>

        <div className={cn(style.modalItem)}>
          <button type="button"onClick={clickUploadBtn} className={cn(style.uploadBtn)}>
            <img src="/public-assets/share-content/input-img.png" alt="file upload button" />
          </button>
          <input type="file" ref={fileInput} accept=".png, .jpg" onChange={changeFileInput} className={cn(style.hidden)} />
        </div>

        <div className={cn(style.modalItem)}>
          <strong>종류</strong>
          <select onChange={handleKind} value={options[0]} className={cn(style.itemSize)} >
            {
              options.map((item) => {
                return(
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })
            }
          </select>
        </div>
        
        <div className={cn(style.modalItem)}>
          <strong>제목</strong>
          <input type="text" onChange={handleTitle}  className={cn(style.itemSize)} />
        </div>
        <div className={cn(style.modalItem)}>
          <strong>가격</strong>
          <input type="text" onChange={handleCost}  className={cn(style.itemSize)} />
        </div>
        <div className={cn(style.modalItem)}>
          <strong>내용</strong>
          <textarea onChange={handleContent}  className={cn(style.itemSize, style.textarea)} ></textarea>
        </div>
        
        <button type="button" onClick={inputData} className={cn(style.inputBtn)} >
          입력
        </button>
      </article>
    );
  } 
  else {
    return(null);
  }
}

export default Share;