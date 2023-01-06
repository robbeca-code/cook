# 요리할래?! (React 프로젝트)
### 사이트 주제
- **혼자 사는 자취생들을 위해** 요리 레시피를 알려주고 **코로나로 인해 더이상 자영업을 할 수 없는 분들을 위해** 신청된 요리를 만들어서 이익을 얻게 도와주는 사이트 입니다.
</br>

### 주요 기능
1. [요리 신청 글쓰기](#요리-신청-글쓰기)
2. [관심 나눔/신청 저장하기](#관심-나눔-및-신청-저장하기)
3. [채팅과 기록 저장하기](#채팅과-기록-저장하기)
</br>
</br>

### #요리 신청 글쓰기
📌 원하는 음식을 만들어 달라는 글을 작성할 수 있습니다.</br></br>
**주요 코드**</br>

**1. 함수의 매개변수와 지역변수 의미**
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

**2. 각종 함수들 의미**
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

**3. 작성 폼 구조**
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
***
</br></br>

### #관심 나눔 및 신청 저장하기

📌 하트(❤️)나 북마크(🔖) 아이콘을 눌러서 관리할 수 있습니다.</br></br>

**주요 코드**</br>

**1. 함수의 매개변수와 지역변수 의미**
```jsx
function ShowContent({data,  setData, mark, setMark, setChatBtn, login}) {
  let [heartBtn, setHeartBtn] = useState(false);

  useEffect(()=>{
    setData(data);
  });
  ...
}
```
1. `ShowContent 컴포넌트`는 신청/나눔 목록 중에서 1개를 클릭했을 때 해당 내용을 보여주고 여기서 **관심 저장하기 및 채팅하기** 기능을 제공하고 있습니다.
2. `data`는 해당 내용이 담겨있는 변수이고, `setData`는 현재 내용을 담는 state 입니다.
3. `mark, setMark`가 관심 버튼을 눌렀을 때 해당 데이터를 담는 역할을 하는 state 입니다.
4. `setChatBtn`은 채팅하기 라는 버튼을 눌렀을 때 상태를 변경하기 위한 state 입니다.
5. `login`은 관심 버튼을 눌렀을 때 로그인을 했는지 확인하기 위해 존재합니다.
</br>

**2. 각종 함수들 의미**
```jsx
const handleHeartBtn = () => {
  let copyMark = [...mark];

  if(login === '') {
    alert('로그인을 해주세요.');
    return;
  }
  if(!heartBtn) {
    setHeartBtn(true);
    copyMark.push(data.id);
    setMark(copyMark);
  }
}

const handleChatBtn = () => {
  if(login === '') {
    alert('로그인을 해주세요.');
  }
  else {
    setChatBtn(true);
  }
};
```
1. `handleHeartBtn`는 관심 버튼을 눌렀을 때 우선 Login을 했는지 확인 후, mark state에 저장되도록 하는 역할을 합니다.
- setHeartBtn(true)는 관심 버튼의 이미지를 변경해줍니다.
- mark에 data.id를 넣어 관리합니다.
2. `handleChatBtn`는 채팅하기 버튼을 눌렀을 때 Login이 되어있는지 확인 후, setChatBtn의 상태를 변경해줘서 채팅창이 나오도록 하는 역할을 수행합니다.
***
</br></br>

### #채팅과 기록 저장하기
📌 채팅 입력창에 메시지를 입력해서 전달하고, 내용을 저장합니다.

**주요 코드**</br>

**1. 함수의 매개변수와 지역변수 의미**
```jsx
function ShowChat({data, chat, setChat, setChatBtn}) {
  let [text, setText] = useState('');
  let [msg, setMsg] = useState({userProfile: '', title: '', author: '', kind: '', chat: []});
  ...
}
```
1. `data`는 채팅하고 있는 글에 대한 데이터를 가지고 있습니다. 채팅창의 상단에 내용을 보여줄 것입니다.
2. `chat, setChat`은 사용자가 입력한 메시지를 저장하는 state 입니다.
3. `setChatBtn`은 채팅창을 숨기거나 보여주는 역할을 하는 state 입니다.
4. `text, setText`는 input의 value이면서, input에 사용자가 입력한 메시지를 저장하는 state 입니다.
5. `msg, setMsg`는 채팅의 상세한 내용을 저장하는 state 입니다. 나중에 chat에 전체 내용을 저장할 것입니다.
</br>

**2. 각종 함수들 의미**
```jsx
msg.userProfile = data.user_img;
msg.title = data.title;
msg.author = data.author;
msg.kind = `신청: ${data.kind}`;


const handleCloseBtn = () => {
  for(let i=0; i<chat.length; i++) {
    if(chat[i].title.indexOf(data.title) > -1) {
      let copyChat = [...chat];
      setChat(copyChat);
      setReset();
      return;
    }
  }

  let copyChat = [...chat];
  copyChat.push(msg);
  setChat(copyChat);
  setReset();
}

const setReset = () => {
  let reset = {img: '', title: '', author: '', chat: []};
  setTimeout(setMsg(reset), 1000);
  setChatBtn(false);
}

const handleChatInput = (e) => {
  setText(e.target.value);
};

const handleSubmitBtn = () => {
  // chat에 이미 정보가 들어있을 때 -> 채팅 정보만 추가한다.
  for(let i=0; i<chat.length; i++) {
    if(text != '' && chat[i].title.indexOf(data.title) > -1) {
      chat[i].chat.push(text);
      inputMsg(text);
      return;
    }
    else {
      continue;
    }
  }

  // 처음 채팅할 때
  if(text != '' ) {
    inputMsg(text);
  }
}

const inputMsg = (text) => {
  msg.chat.push(text);
  setText('');
}
```
1. `handleCloseBtn`은 닫기 버튼을 눌렀을 때 chat에 그동안 입력한 내용이 저장되도록 하는 함수입니다.
- 똑같은 글에서 채팅을 여러 번 할 수도 있기 때문에 **for문으로 chat state에서 똑같은 title이 존재한다면 채팅 정보만 추가하도록** 기능을 추가했습니다.
2. `setReset`에서는 msg를 초기화해서 다른 채팅창을 눌렀을 때 기록된 내용이 보이지 않도록 했습니다. (반복되는 내용이라 함수로 만들어서 가독성을 높였습니다.)
3. `handleChatInput` text에 저장하는 함수입니다.
4. `handleSubmitBtn`은 text의 내용을 msg.chat에 저장하는 역할을 합니다.
- 여기서도 handleCloseBtn과 마찬가지로 중복되는 title이 존재하다면 채팅정보만 추가하도록 했습니다.
5. `inputMsg`에는 메시지를 저장하는 코드가 반복되어 마찬가지로 함수로 따로 만들었습니다.
