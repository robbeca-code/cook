import React, { useRef, useState } from "react";
import Sidebar from './Sidebar';
import style from './Share.module.css';
import cn from "classnames";
import { Link } from "react-router-dom";

function Application({isOpen, oneServing, dessert, userId}) {
  const target = 'share';
  let [tab, setTab] = useState('oneServing');
  let [plus, setPlus] = useState(false);

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <header className={cn(style.tabContainer)}>
        <button type="button" className=
          {
            tab === 'oneServing' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => {setTab('oneServing')}}>
          <h1>1인분</h1>
        </button>
        <button type="button" className=
          {
            tab === 'dessert' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('dessert'); }}>
          <h1>디저트</h1>
        </button>
        <button type="button" className=
          {
            tab === 'big' ? cn(style.tab, style.click) : cn(style.tab)
          } 
          onClick={() => { setTab('big'); }}>
          <h1>대용량</h1>
        </button>
      </header>

      <section className={cn(style.grid)}>
        {
          <ClickTab tab={tab} oneServing={oneServing} dessert={dessert} />
        }
      </section>

      <button type="button" className={cn(style.plusBtn)} onClick={() => { setPlus(true) }}>
        <img src="/public-assets/one-content/plus.png" alt="plus button" />
      </button>

      <PlusContent o={oneServing} d={dessert} author={userId} plus={plus} setPlus={setPlus} />
      
    </section>
  );
}


function ClickTab({tab, oneServing, dessert}) {
  if(tab === 'oneServing') {
    return(<ApplyList data={oneServing} />);
  }
  if(tab === 'dessert') {
    return(<ApplyList data={dessert} />);
  }
}

function ApplyList({data}) {

  return(
    data.map((item, i) => {
      if(item.title != '') {
        return(
          <Link to={item.url} className={cn(style.item, style.link)} key={i}>
            <div className={cn(style.imgContainer)}>
              <img src={item.img} alt={item.img_alt} />
            </div>
            <h2>
              {
                item.title.length >= 10 
                ? item.title.slice(0, 11).concat('...') 
                : item.title
              }
            </h2>
            <div className={cn(style.subInfo)}>
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

function PlusContent({o, d, author, plus, setPlus}) {
  const options = ['종류 선택','1인분', '디저트', '대용량'];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
  let img;

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

  const inputData = () => {
    setPlus(false);

    if(o[0].kind === kind) {
      const index = o.length - 1;
      o[index].title = title;
      o[index].content = content;
      o[index].author = author;
    }
    if(d[0].kind === kind) {
      const index = d.length - 1;
      d[index].title = title;
      d[index].content = content;
      d[index].author = author;
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

export default Application;