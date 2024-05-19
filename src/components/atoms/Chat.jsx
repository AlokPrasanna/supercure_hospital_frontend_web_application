import React , {useState} from 'react';
import 'react-chat-elements/dist/main.css';
import { MessageList, Input, Button } from 'react-chat-elements';
import ScrollToBottom from 'react-scroll-to-bottom';
import { ImageUrls } from '../../constants';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const [symtomCategory , setSymtomCategory] = useState('');
  
    const handleSendMessage = () => {
        if (inputText.trim() !== '') {
          const newMessage = {
            position: 'right',
            type: 'text',
            text: inputText,
            date: new Date(),
          };
          setMessages([...messages, newMessage]);
          setInputText('');
        }
      };
  return (
    <div>
      <div className='flex flex-col items-center justify-center h-[80vh] '>
        <div 
            className='flex flex-col p-4 border-[10px] rounded-[15px] border-orange-600 h-[500px] w-[800px]'
            style={{
            backgroundImage: `url(${ImageUrls.chatBgImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom',
            overflowY:'hidden'
            }}    
        >
            <ScrollToBottom className="flex-grow overflow-y-auto">
            <MessageList
                className="message-list"
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages}
            />
            </ScrollToBottom>
            <div className='flex items-center justify-between mt-4'>
                <div className='border border-gray-300 w-[700px]'>
                    <Input
                        placeholder="Type here..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSendMessage();
                        }
                        }}
                    />
                </div>
                <div>
                    <Button text={"Send"} onClick={handleSendMessage} title="Send" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
