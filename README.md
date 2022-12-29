# 요리할래?! (React 프로젝트)
### 사이트 주제
- 요리 레시피를 알려주면서 원하는 요리를 신청해서 돈을 벌 수 있어서 혼자서 사는 자취생과 코로나로 인해 피해받은 자영업자분들을 위한 사이트 입니다.

### 주요 기능
1. [요리 신청 글쓰기](#요리-신청-글쓰기)
2. 관심 레시피/나눔/신청 저장하기
3. 로그인 하기
</br>
</br>

### #요리 신청 글쓰기
📌 원하는 음식을 만들어 달라는 글을 작성할 수 있습니다.</br></br>
**주요 코드**</br>
**1. 전체 코드**
```jsx
function PlusContent({o, d, author, plus, setPlus}) {
  const options = ['종류 선택','1인분', '디저트', '대용량'];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
  let img;

  const clickUploadBtn = () => {
    fileInput.current.click();
  }

  const changeFileInput = (e) => {
    img = e.target.files;
  }

  const handleKind = (e) => {
    kind = e.target.value;
  };

  const handleTitle = (e) => {
    title = e.target.value;
  };

  const handleContent = (e) => {
    content = e.target.value;
  };

  const inputData = () => {
    setPlus(false);

    if(o[0].kind === kind) {
      const index = o.length - 1;
      o[index].title = title;
      o[index].content = content;
      o[index].author = author;
    }
    if(d[0].kind === kind) {
      const index = d.length - 1;
      d[index].title = title;
      d[index].content = content;
      d[index].author = author;
    }
  };

  if(plus) {
    return(
      <article className={cn(style.inputModal)}>
        <header className={cn(style.modalTitle)}>
          <h1>나눔 하기</h1>
        </header>

        <div className={cn(style.modalItem)}>
          <button type="button"onClick={clickUploadBtn} className={cn(style.uploadBtn)}>
            <img src="/public-assets/share-content/input-img.png" alt="file upload button" />
          </button>
          <input type="file" ref={fileInput} accept=".png, .jpg" onChange={changeFileInput} className={cn(style.hidden)} />
        </div>

        <div className={cn(style.modalItem)}>
          <strong>종류</strong>
          <select onChange={handleKind} value={options[0]} className={cn(style.itemSize)} >
            {
              options.map((item) => {
                return(
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })
            }
          </select>
        </div>
        
        <div className={cn(style.modalItem)}>
          <strong>제목</strong>
          <input type="text" onChange={handleTitle}  className={cn(style.itemSize)} />
        </div>

        <div className={cn(style.modalItem)}>
          <strong>내용</strong>
          <textarea onChange={handleContent}  className={cn(style.itemSize, style.textarea)} ></textarea>
        </div>
        
        <button type="button" onClick={inputData} className={cn(style.inputBtn)} >
          입력
        </button>
      </article>
    );
  } 
  else {
    return(null);
  }
}
```
</br>

**2. 함수의 매개변수와 지역변수 의미**

```jsx
function PlusContent({o, d, author, plus, setPlus}) {
  const options = ['종류 선택','1인분', '디저트', '대용량'];
  const fileInput = useRef(null);
  let kind;
  let title;
  let content;
  let img;
  ...
}
```
1. `o, d` 는 신청에 관한 데이터가 저장되어 있고, `plus`는 글 작성 버튼을 클릭 유무를 저장하는 state 입니다. `setPlus`는 글쓰기 폼을 보여줄지 말지를 결정하는 state 입니다.
2. `options`는 글을 작성할 때 종류를 분류하기 위한 값을 저장한 변수입니다.
3. 순서대로 종류, 글제목, 글내용, 첨부사진 을 저장하기 위한 변수가 선언되었습니다.
</br>

**3. 각종 함수들 의미**
```jsx
const clickUploadBtn = () => {
  fileInput.current.click();
}

const changeFileInput = (e) => {
  img = e.target.files;
}

const handleKind = (e) => {
  kind = e.target.value;
};

const handleTitle = (e) => {
  title = e.target.value;
};

const handleContent = (e) => {
  content = e.target.value;
};

const inputData = () => {
  setPlus(false);

  if(o[0].kind === kind) {
    const index = o.length - 1;
    o[index].title = title;
    o[index].content = content;
    o[index].author = author;
  }
  if(d[0].kind === kind) {
    const index = d.length - 1;
    d[index].title = title;
    d[index].content = content;
    d[index].author = author;
  }
};
```
1. `clickUploadBtn`는 이미지 업로드 버튼을 눌렀을 때 input의 file 타입이 클릭되는 역할을 수행합니다.
2. `handle...` 함수들은 input 태그에 작성한 값을 **e.target.value**로 가져와서 각각에 맞는 변수에 저장하는 역할을 합니다.
3. `inputData` 함수는 입력한 자료를 <span style='background-color:#ffdce0'>신청 데이터가 정리된 파일에 저장하는 역할</span> 을 해서, `d[0].kind === kind` 이렇게 종류에 맞는 데이터 마지막에 저장합니다.
</br>

**4. 작성 폼 구조**
```jsx
if(plus) {
  return(
    <article className={cn(style.inputModal)}>
      <header className={cn(style.modalTitle)}>
        <h1>나눔 하기</h1>
      </header>

      <div className={cn(style.modalItem)}>
        <button type="button"onClick={clickUploadBtn} className={cn(style.uploadBtn)}>
          <img src="/public-assets/share-content/input-img.png" alt="file upload button" />
        </button>
        <input type="file" ref={fileInput} accept=".png, .jpg" onChange={changeFileInput} className={cn(style.hidden)} />
      </div>

      <div className={cn(style.modalItem)}>
        <strong>종류</strong>
        <select onChange={handleKind} value={options[0]} className={cn(style.itemSize)} >
          {
            options.map((item) => {
              return(
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })
          }
        </select>
      </div>

      <div className={cn(style.modalItem)}>
        <strong>제목</strong>
        <input type="text" onChange={handleTitle}  className={cn(style.itemSize)} />
      </div>

      <div className={cn(style.modalItem)}>
        <strong>내용</strong>
        <textarea onChange={handleContent}  className={cn(style.itemSize, style.textarea)} ></textarea>
      </div>

      <button type="button" onClick={inputData} className={cn(style.inputBtn)} >
        입력
      </button>
    </article>
  );
} 
else {
  return(null);
}
```
1. `if(plus)`는 글작성 버튼을 눌렀을 때(**true**) 일 때 글작성 폼을 보여줍니다.
2. 만약 버튼을 누르지 않았다면, `null`을 반환해서 글작성 폼이 보이지 않게 합니다.
