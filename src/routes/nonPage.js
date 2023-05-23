import style from "./NonPage.module.css";
import cn from "classnames";
import Sidebar from "./Sidebar";

function NonPage() {
  return (
    <div>
      <aside>
        <Sidebar />
      </aside>

      <article className={cn(style.container)}>
        <img src="/cook/public-assets/non_page/404.png" alt="Error Page" />

        <h2 className={cn(style.title)}>
          찾으시는 페이지는{" "}
          <span className={cn(style.strong)}>없는 페이지</span> 입니다.
        </h2>
      </article>
    </div>
  );
}

export default NonPage;
