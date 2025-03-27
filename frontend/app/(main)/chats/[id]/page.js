'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { useGetChatMessages, useSendChatMessage } from '@/hooks/useChatLogs';
import { useGetChats } from '@/hooks/useChats';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { BotMessageSquare, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id;
  const messagesEndRef = useRef(null);
  const {
    messages,
    loading: messagesLoading,
    error: messagesError,
    getChatMessages
  } = useGetChatMessages();
  const { data: chats, loading: chatsLoading, error: chatsError, getChats } = useGetChats();
  const [chatName, setChatName] = useState('');
  const [message, setMessage] = useState('');
  const { sendMessage, loading: sendingLoading, error: sendingError } = useSendChatMessage();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Clear the input field
      setMessage('');
      setWaitingForResponse(true);

      // Send the message to the server
      await sendMessage(chatId, message);

      // Refresh the messages to get the complete updated list
      await getChatMessages(chatId);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setWaitingForResponse(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      getChatMessages(chatId);
      getChats();
    }
  }, [chatId]);

  useEffect(() => {
    if (chats && chatId) {
      const currentChat = chats.find((chat) => chat.id === +chatId || chat.instanceId === chatId);
      if (currentChat) {
        setChatName(currentChat.chat_name || 'Unnamed Chat');
      }
    }
  }, [chats, chatId]);

  const loading = messagesLoading || chatsLoading;
  const error = messagesError || chatsError;

  if (error)
    return <div className="h-full mx-12 text-center grid place-content-center">Error 404</div>;

  return (
    <div>
      <div className="p-2 pt-4 text-2xl capitalize border-b-[6px] flex items-center relative">
        <div className="absolute left-5">
          <Link href={`/chats`} className="block">
            <Button size="icon" className="rounded-full" variant="secondary">
              <ChevronLeft />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="p-4 rounded-full bg-card border border-gray-600">
            <BotMessageSquare />
          </div>
          <h1 className="text-center pt-2 text-base">{chatName}</h1>
        </div>
      </div>

      <div className="h-[580px] overflow-y-auto px-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'bg-blue-600 rounded-full max-w-[75%] w-fit my-4 px-4 py-2 ml-auto rounded-br-md mr-2',
              !message.is_user &&
                'rounded-bl-md rounded-br-full bg-gray-200 text-gray-900 ml-2 mr-auto'
            )}>
            <p>{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-background border-t">
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sendingLoading || waitingForResponse}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full bg-input border border-input focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="submit"
            disabled={sendingLoading || !message.trim() || waitingForResponse}
            className="rounded-full">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
