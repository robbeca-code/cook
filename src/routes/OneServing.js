import React, { useState } from 'react';
import Sidebar from './Sidebar';
import style from './OneServing.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';


function OneServing({isOpen, data}) {
  let click = 'share';
  let [plusBtn, setPlusBtn] = useState(false);
  let [input, setInput] = useState(['kind', 'name', 'content']);
  let [newContent, setNewContent] = useState(false);

  // console.log(input[1]);
  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} click={click} />
      </aside>

      <header className={cn(style.containerTitle)}>
        <h1>1인분</h1>
        <h1>디저트</h1>
        <h1>대용량</h1>
      </header>

      <section className={cn(style.contentList)}>
        <div className={cn(style.grid)}>
          {
            data.map((item) => {
              return(
                <Link to={item.url} className={cn(style.content, style.link)} key={item.id}>
                  <div className={cn(style.imgContainer)}>
                    <img src={item.img} alt={item.img_alt} />
                  </div>
                  
                  <div className={cn(style.flex)}>
                    <h2 className={cn(style.title)}>
                      {item.name.length >= 15 ? item.name.slice(0, 12).concat('...') : item.name}
                    </h2>
                    <span className={cn(style.sideContent)}>{item.location}</span>
                    <span className={cn(style.sideContent)}>{item.author}</span>
                  </div>
                </Link>
              );
            })
          }
          {
            newContent ? <NewContent input={input} /> : null
          }
        </div>
      </section>

      <button type="button" className={cn(style.plus)} onClick={() => {
        plusBtn ? setPlusBtn(false) : setPlusBtn(true)
      }}>
        <img src="/public-assets/one-serving/plus.png" alt="Plus button" />
      </button>

      <InputContent plusBtn={plusBtn} setPlusBtn={setPlusBtn} newContent={newContent} setNewContent={setNewContent} input={input} setInput={setInput} />
    </section>
  );
}


function InputContent({plusBtn, setPlusBtn, newContent, setNewContent, input, setInput}) {
  const kindList = ['찌개', '라면', '죽', '고기', '패스트 푸드'];

  const handleKindSelect = (e) => {
    let copyInput = [...input];
    copyInput[0] = e.target.value;
    setInput(copyInput);
  };

  const handleNameInput = (e) => {
    let copyInput = [...input];
    copyInput[1] = e.target.value;
    setInput(copyInput);
  }

  const handleInputBtn = () => {
    setPlusBtn(false);

    if(newContent) {
      setNewContent(false);
    } else {
      setNewContent(true);
    }
  }

  if(plusBtn) {
    return(
      <section className={cn(style.inputContainer)}>
        <header className={cn(style.inputNav)}>
          <h1>신청 글쓰기</h1>
        </header>
        <article className={cn(style.inputContents)}>
          <div className={cn(style.input)}>
            <button type="button" className={cn(style.imgContainer)}>
              <img src="/public-assets/one-serving/input-img.png" alt="Input image" />
            </button>
          </div>

          <div className={cn(style.input)}>
            <strong className={cn(style.title)}>종류</strong>
            <select onChange={handleKindSelect} value={input[0]} className={cn(style.heightSort)}>
            {
              kindList.map((item) => {
                return(
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })
            }
            </select>
          </div>
          
          <div className={cn(style.input)}>
            <strong className={cn(style.title)}>제목</strong>
            <input type="text" onChange={handleNameInput} className={cn(style.heightSort)}  />
          </div>
          
          <div className={cn(style.input)}>
            <strong className={cn(style.title)}>내용</strong>
            <textarea className={cn(style.heightLong)}></textarea>
          </div>
        </article>
        <button type="button" onClick={handleInputBtn} className={cn(style.inputBtn)}>
          입력하기
        </button>
      </section>
    );
  } else {
    return(null);
  }
}

function NewContent({input}) {
  return(
    <article className={cn(style.content, style.link)}>
      <div className={cn(style.imgContainer)}>
        <img src="/public-assets/one-serving/non-food-img.png" alt="" />
      </div>
      
      <div className={cn(style.flex)}>
        <h2 className={cn(style.title)}>
          {input[1].length >= 15 ? input[1].slice(0, 12).concat('...') : input[1]}
        </h2>
        <span className={cn(style.sideContent)}>성수동</span>
        <span className={cn(style.sideContent)}>라리루레로</span>
      </div>
    </article>
  );
}

export default OneServing;