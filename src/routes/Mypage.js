import React, { useState } from 'react';
import Sidebar from './Sidebar';
import style from './Mypage.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Mypage({isOpen, food, product, oneServing, dessert, recipe, mark}) {
  let target = 'mypage';
  let [tab, setTab] = useState(0);
  let [remove, setRemove] = useState('');
  let userId = useSelector((state) => (state.login.nickname));

  if(mark.indexOf(remove) > -1) {
    let index = mark.indexOf(remove);
    mark.splice(index, 1);
  }

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      {
        userId === ''
        ? <div className={cn(style.alert)}>
            <img src="/public-assets/mypage/login-alert.png" alt="" />
            <h1>Login을 한 다음 진행해주세요</h1>
          </div>
        : <div>
          <header className={cn(style.header)}>
            <div className={cn(style.userImg)}>
              <img src="/public-assets/mypage/userImg.png" alt="user profile"/>
            </div>
            <div className={cn(style.userInfo)}>
              <h2>{userId}</h2>
              <p>저렴한 가격으로 나눔해요~ 반갑습니다~~~</p>
              <img src="/public-assets/mypage/userManner.png" alt="user manner" />
            </div>
          </header>

          <div className={cn(style.tabContainer)}>
            <button type="button" className={
              tab === 0 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
            } onClick={() => {setTab(0)}}>판매 물품</button>
            <button type="button" className={
              tab === 1 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
            } onClick={() => {setTab(1)}}>관심 나눔</button>
            <button type="button" className={
              tab === 2 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
            } onClick={() => {setTab(2)}}>관심 신청</button>
            <button type="button" className={
              tab === 3 ? cn(style.tabBtn, style.click) : cn(style.tabBtn)
            } onClick={() => {setTab(3)}}>관심 레시피</button>
          </div>

          <section className={cn(style.grid)}>
            {
              <GetTab tab={tab} food={food} product={product} mark={mark} oneServing={oneServing} dessert={dessert} recipe={recipe} setRemove={setRemove} />
            }
          </section>
        </div>
      }
      
    </section>
  );
}

function GetTab({tab, food, product, oneServing, dessert, recipe, mark, setRemove}) {
  let fMark = [];
  let pMark = [];
  let oMark = [];
  let dMark = [];
  let rMark = [];

  if(tab === 1) {  
    for(let i=0; i<food.length; i++) {
      let foodId = mark.indexOf(food[i].id);
      if(foodId > -1) {
        fMark.push(mark[foodId]);
      }
    }

    for(let i=0; i<product.length; i++) {
      let productId = mark.indexOf(product[i].id);
      if(productId > -1) {
        pMark.push(mark[productId]);
      }
    }

    return(
      <section className={cn(style.grid)}>
        {
          <ShowContent id={fMark} data={food} setRemove={setRemove} />
        }
        {
          <ShowContent id={pMark} data={product} setRemove={setRemove} />
        }
      </section>
    );
  }

  if(tab === 2) {  
    for(let i=0; i<oneServing.length; i++) {
      let oneServingId = mark.indexOf(oneServing[i].id);
      if(oneServingId > -1) {
        oMark.push(mark[oneServingId]);
      }
    }

    for(let i=0; i<dessert.length; i++) {
      let dessertId = mark.indexOf(dessert[i].id);
      if(dessertId > -1) {
        dMark.push(mark[dessertId]);
      }
    }

    return(
      <section className={cn(style.grid)}>
        {
          <ShowContent id={oMark} data={oneServing} setRemove={setRemove} />
        }
        {
          <ShowContent id={dMark} data={dessert} setRemove={setRemove} />
        }
      </section>
    );
  }

  if(tab === 3) {  
    for(let i=0; i<recipe.length; i++) {
      let recipeId = mark.indexOf(recipe[i].id);
      if(recipeId > -1) {
        rMark.push(mark[recipeId]);
      }
    }

    return(
      <section className={cn(style.grid)}>
        {
          <ShowContent id={rMark} data={recipe} setRemove={setRemove} />
        }
      </section>
    );
  }
}

function ShowContent({id, data, setRemove}) {
  let url;

  return(
    data.map((data, i) => {
      if(id.indexOf(data.id) > -1)  {
        
        // 각 관심 아이템마다 알맞는 url을 주기 위한 if문입니다.
        if(data.kind === '1인분' || data.kind === '디저트' || data.kind === '대용량') {
          url = '/share-apply/apply/' + id;
        } else {
          url = '/share-apply/share/' + id;
        }

        return(
          <Link to={url} className={cn(style.link)} key={i}>
            <article className={cn(style.item)}>
              <div className={cn(style.imgContainer)}>
                <img src={data.img} alt={data.img_alt} />
              </div>
              <h3>
                {
                  data.title.length > 10
                  ? data.title.slice(0, 11).concat('...')
                  : data.title
                }
              </h3>
              <span>{'by '.concat(data.author)}</span>
              <button type="button" className={cn(style.removeBtn)} onClick={() => { setRemove(data.id) }}>
                <img src="/public-assets/mypage/remove.png" alt="remove button" />
              </button>
            </article>
          </Link>
        );
      } else {
        return (null);
      }
    })
  );
}

function GetDataUrl({setUrl, kind ,id}) {
  if(kind === '1인분' || kind === '디저트' || kind === '대용량') {
    return(setUrl('/share-apply/apply/' + id));
  } else {
    return(setUrl('/share-apply/share/' + id));
  }
}

export default Mypage;