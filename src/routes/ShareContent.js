import React from "react";
import Sidebar from "./Sidebar";
import style from './ShareContent.module.css';
import cn from 'classnames';
import { useParams } from "react-router-dom";

function ShareContent({isOpen, food, product}) {
  let target = 'share';
  let {id} = useParams();

  return(
    <section>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>
      {
        <GetConent id={id} food={food} product={product}/>
      }
    </section>
  );
}

function GetConent({id, food, product}) {
  for(let i=0; i<food.length; i++) {
    if(id === food[i].id) {
      return(<ShowContent data={food[i]} />);
    }
  }

  for(let i=0; i<product.length; i++) {
    if(id === product[i].id) {
      return(<ShowContent data={product[i]} />);
    }
  }
}

function ShowContent({data}) {
  return(
    <section className={cn(style.container)}>
      <header className={cn(style.imgContainer)}>
        <img src={data.img} alt={data.kind} />
      </header>
    </section>
  );
}

export default ShareContent;