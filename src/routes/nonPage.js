import React from 'react';
import './nonPage.css';

function NonPage() {
  return (
    <section className="container">
      <h1 className="title">찾으시는 페이지는 <strong>없는 페이지</strong> 입니다.</h1>
      <img src="/public-assets/non_page/404.png" alt="Error Page" />
    </section>
  );
}

export default NonPage;