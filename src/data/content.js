import React from 'react';

function Content() {
  let content = [
    {
      subTitle: 'Today!',
      mainTitle: '오늘의',
      styleTitle: '쉐프',
      img1: '/public-assets/chef-cook1.jpg',
      img2: '/public-assets/chef-cook2.jpg'
    },
    {
      subTitle: '음식과 함께',
      mainTitle: '건강한',
      styleTitle: '다이어트',
      img1: '/public-assets/healthy1.jpg',
      img2: '/public-assets/healthy2.jpg'
    },
    {
      subTitle: '영상으로 확인하는',
      mainTitle: '특별한',
      styleTitle: '저녁시간',
      img1: '/public-assets/healthy1.jpg'
    },
  ];

  return (
    <section className="app-contents">
      {
        content.map((item) => {
          return (
            <article className="content">
              <h2>{item.subTitle}</h2>
              <div className="content-header">
                <h1>{item.mainTitle} <span>{item.styleTitle}</span></h1>
                <img src="/public-assets/bookmark.png" alt="bookrmark icon" />
              </div>
              <div>
                <img src={item.img1} alt="" />
                <img src={item.img2} alt="" />
              </div>
            </article>
          );
        })
      }
    </section>
  );
}

export default Content;