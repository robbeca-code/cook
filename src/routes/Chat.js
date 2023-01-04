import React from 'react';
import style from './Chat.module.css';
import cn from 'classnames';
import Sidebar from './Sidebar';

function Chat({isOpen, chat}) {
  let target = 'chat';

  const NonChat = () => {
    return(
      <article className={cn(style.nonChat)}>
        <h2>채팅 기록이 없습니다.</h2>
        <img src="/public-assets/chat/nonChat.png" alt="" />
      </article>
    );
  }

  return(
    <section className={cn(style.container)}>
      <aside>
        <Sidebar isOpen={isOpen} target={target} />
      </aside>

      <aside className={cn(style.banner)}>
        <img src="/public-assets/chat/banner.png" alt="banner" />
      </aside>


      {
        chat.length === 0
        ? <NonChat />
        : <ShowChatList chat={chat} />
      }      
    </section>
  );
}

function ShowChatList({chat}) {
  return(
    <ul className={cn(style.chatList)}>
      {
        chat.map((item, i) => {
          return(
            <li className={cn(style.chatItem)} key={i}>
              <div className={cn(style.itemLeft)}>
                <div className={cn(style.imgContainer)}>
                  <img src={item.userProfile} alt={item.author} />
                </div>
                <div className={cn(style.chatInfo)}>
                  <h3>{item.author}</h3>
                  <p>
                  {
                    item.chat[item.chat.length - 1].length > 25
                    ? item.chat[item.chat.length - 1].slice(0, 26).concat('...')
                    : item.chat[item.chat.length - 1]
                  }
                  </p>
                </div>
              </div>
              <div className={cn(style.itemRight)}>
                <span>{item.kind}</span>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}

export default Chat;