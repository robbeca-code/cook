import React from 'react';
import style from './ChatContent.module.css';
import cn from 'classnames';
import Sidebar from './Sidebar';

function ChatContent({isOpen}) {
  let target = 'chat';

  return(
    <section>
      <Sidebar isOpen={isOpen} target={target} />
    </section>
  );
}

export default ChatContent;