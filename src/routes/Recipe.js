import React from "react";
import style from "./Recipe.module.css";
import cn from "classnames";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { recipe } from "./Recipe-data";

function Recipe() {
  return (
    <section className={cn(style.container)}>
      <aside>
        <Sidebar />
      </aside>

      <aside className={cn(style.banner)}>
        <img src="/cook/public-assets/recipe/recipe-intro.png" alt="" />
      </aside>

      <section className={cn(style.grid)}>
        <article className={cn(style.recipeList)}>
          <Link
            to="/recipe/tunaCan"
            className={cn(style.kindTitle, style.link)}
          >
            <h1>참치 통조림</h1>
            <span>더보기</span>
          </Link>
          <section className={cn(style.grid)}>
            {<RecipeItems kind={"tuna"} />}
          </section>
        </article>

        <article className={cn(style.recipeList)}>
          <header className={cn(style.kindTitle)}>
            <h1>스팸</h1>
            더보기
          </header>
          <section className={cn(style.grid)}>
            {<RecipeItems kind={"spam"} />}
          </section>
        </article>

        <article className={cn(style.recipeList)}>
          <header className={cn(style.kindTitle)}>
            <h1>김치</h1>
            <span>더보기</span>
          </header>
          <section className={cn(style.grid)}>
            {<RecipeItems kind={"kimchi"} />}
          </section>
        </article>

        <article className={cn(style.recipeList)}>
          <header className={cn(style.kindTitle)}>
            <h1>만두</h1>
            <span>더보기</span>
          </header>
          <section className={cn(style.grid)}>
            {<RecipeItems kind={"dumpling"} />}
          </section>
        </article>

        <article className={cn(style.recipeList)}>
          <header className={cn(style.kindTitle)}>
            <h1>라면</h1>
            <span>더보기</span>
          </header>
          <section className={cn(style.grid)}>
            {<RecipeItems kind={"ramen"} />}
          </section>
        </article>
      </section>
    </section>
  );
}

function RecipeItems({ kind }) {
  const handleLevel = (level) => {
    if (level == "하") {
      return "/cook/public-assets/recipe/level-b.png";
    } else if (level == "중") {
      return "/cook/public-assets/recipe/level-m.png";
    } else {
      return "/cook/public-assets/recipe/level-t.png";
    }
  };

  return recipe.map((item, i) => {
    if (item.kind == kind) {
      return (
        <article className={cn(style.recipeItem)} key={i}>
          <div className={cn(style.imgContainer)}>
            <img src={item.img} alt={item.img_alt} />
          </div>
          <h2>{item.title}</h2>
          <div className={cn(style.itemInfo)}>
            <div className={cn(style.item)}>
              <img
                src="/cook/public-assets/recipe/heart.png"
                className={cn(style.subInfoImg)}
                alt="like"
              />
              <span>{item.heart}</span>
            </div>
            <div className={cn(style.item)}>
              <img src={handleLevel(item.level)} alt="level" />
              <span>{item.level}</span>
            </div>
            <div className={cn(style.item)}>
              <img src="/cook/public-assets/recipe/timer.png" alt="time" />
              <span>{item.time}</span>
            </div>
          </div>
        </article>
      );
    } else {
      return null;
    }
  });
}

export default Recipe;
