import React from 'react';
import Sidebar from './Sidebar';
import style from './OneServing.module.css';
import cn from 'classnames';

function OneServing(props) {
  let click = 'share';

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={props.isOpen} click={click} />
      </aside>

      <header className={cn(style.containerTitle)}>
        <h1>1인분</h1>
        <h1>디저트</h1>
        <h1>대용량</h1>
      </header>
      <select name="sort">
        <option value="">제목 정렬 선택</option>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </section>
  );
}

export default OneServing;