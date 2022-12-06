import React from 'react';

function Tag() {
  let tag = ['#닭요리', '#저녁_반찬_추천', '#찌개', '#찜닭_재료', '#삼계탕', '#천연조미료', '#알리오올리오'];

  return(
    <div className="tag-container">
      {
        tag.map((item, i) => {
          return(
            <button type="button" className="btn tag-btn" key={'tag' + i}>
              {item}
            </button>
          );
        })
      }
    </div>
  );
}

export default Tag;