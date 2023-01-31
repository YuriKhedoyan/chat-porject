import React from "react";
import { Chat } from 'stream-chat-react';
import { StreamChat } from "stream-chat";

const ChatProject = () => {
  const client = new StreamChat('1229486');

  return (
    <>
      <Chat client={client}></Chat>
    </>

  )
}

export default ChatProject