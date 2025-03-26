'use client';

import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function ChatsPage() {
  const { chatInstanceId } = useParams(); // Extract chatInstanceId from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  // Fetch chat messages when the page is loaded
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch messages for the current chat instance
        const response = await fetch(`/api/chatMessages/${chatInstanceId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch messages or unauthorized');
        }

        const data = await response.json();
        setMessages(data.data); // Assuming the response contains a "data" field with messages
      } catch (err) {
        setError('Failed to load messages');
        console.error(err);
        history.push('/error'); // Navigate to an error page if chat is not authorized
      }
    };

    fetchMessages();
  }, [chatInstanceId, history]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Don't send empty messages

    try {
      const response = await fetch(`/api/chatMessages/${chatInstanceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
          is_user: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages((prevMessages) => [...prevMessages, data.data]); // Add the new message to the chat
      setNewMessage(''); // Clear the input field
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleSendMessage();
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Chat messages display */}
      <div style={{ flex: 1, padding: '10px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.is_user ? 'right' : 'left',
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                maxWidth: '70%',
                padding: '10px',
                borderRadius: '15px',
                backgroundColor: message.is_user ? '#DCF8C6' : '#E5E5EA',
              }}
            >
              <p style={{ margin: 0 }}>{message.content}</p>
              <small>{message.created_at}</small> {/* Display the formatted timestamp */}
            </div>
          </div>
        ))}
      </div>

      {/* Message input area */}
      <div
        style={{
          display: 'flex',
          padding: '10px',
          backgroundColor: '#FFF',
          borderTop: '1px solid #DDD',
        }}
      >
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message"
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '15px',
            border: '1px solid #DDD',
            resize: 'none',
            minHeight: '40px',
          }}
        ></textarea>
        <button
          onClick={handleSendMessage}
          style={{
            backgroundColor: '#0084FF',
            color: '#FFF',
            padding: '10px 15px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '10px',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}