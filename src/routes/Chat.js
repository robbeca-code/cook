import React from "react";
import style from "./Chat.module.css";
import cn from "classnames";
import Sidebar from "./Sidebar";

function Chat({ chats }) {
  const NonChat = () => {
    return (
      <article className={cn(style.nonChat)}>
        <img src="/cook/public-assets/chat/nonChat.png" alt="" />
        <h2>채팅 기록이 없습니다.</h2>
      </article>
    );
  };

  return (
    <section className={cn(style.container)}>
      <aside>
        <Sidebar />
      </aside>

      <aside className={cn(style.banner)}>
        <img src="/cook/public-assets/chat/banner.png" alt="banner" />
      </aside>

      {chats.length == 0 ? <NonChat /> : <ShowChatList chats={chats} />}
    </section>
  );
}

function ShowChatList({ chats }) {
  return (
    <ul className={cn(style.chatList)}>
      {chats.map((item, i) => {
        return (
          <li className={cn(style.chatItem)} key={i}>
            <div className={cn(style.itemLeft)}>
              <div className={cn(style.imgContainer)}>
                <img src={item.authorProfilePicture} alt={item.author} />
              </div>
              <div className={cn(style.chatInfo)}>
                <span>{item.author}</span>
                <p>
                  {item.messages[item.messages.length - 1].length > 25
                    ? item.messages[item.messages.length - 1]
                        .slice(0, 26)
                        .concat("...")
                    : item.messages[item.messages.length - 1]}
                </p>
              </div>
            </div>
            <div className={cn(style.itemRight)}>
              <span>{item.kind}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default Chat;
