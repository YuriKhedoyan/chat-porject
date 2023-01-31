import '@stream-io/stream-chat-css/dist/css/index.css';
import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator } from "stream-chat-react";

const user = {
  id: 'john',
  name: 'John',
  image: 'https://getstream.io/random_png/?id=spring-paper-9&name=spring-paper-9',
}

const apiKey = process.env.REACT_APP_STREAM_API_KEY

const App = () => {
  const [client, setClient] = useState();
  const [channel, setChannel] = useState();
  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance('v2rqksaz679a');

      
      setClient(chatClient);
      console.log(client.setUser(user))
      await chatClient.connect(user, chatClient.devToken(user.id))
      
      const channel = chatClient.channel('messaging', 'react-talk', {
        image: 'https://getstream.io/random_png/?id=spring-paper-9&name=spring-paper-9',
        name: 'Talk about React',
        membes: [user.id]
      })
      
      await channel.watch()
      
      setChannel(channel);
    }
    init()

    if (client) return () => client.disconnectUser()
  }, [])

  if (!client) return <LoadingIndicator />

  return (
    <Chat client={client} theme='messaging'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  )
};

export default App