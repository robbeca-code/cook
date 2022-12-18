import style from './NonPage.module.css';
import cn from 'classnames';

function NonPage() {
  return (
    <section className={cn(style.container)}>
      <h1 className={cn(style.title)}>찾으시는 페이지는 <strong className={cn(style.strong)}>없는 페이지</strong> 입니다.</h1>
      <img src="/public-assets/non_page/404.png" alt="Error Page" />
    </section>
  );
}

export default NonPage;