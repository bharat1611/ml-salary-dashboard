import React, { useState } from 'react';
import { Button, Input, List, Typography } from 'antd';
import axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { user: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        prompt: input,
      });

      const botMessage = { user: 'bot', text: response.data.text };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <Title level={2} className="chat-title">Chat with Insights Bot</Title>
      <List
        bordered
        dataSource={messages}
        renderItem={item => (
          <List.Item>
            <strong>{item.user === 'user' ? 'You' : 'Bot'}:</strong> {item.text}
          </List.Item>
        )}
        className="chat-list"
      />
      <TextArea
        rows={4}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask me anything about the ML Engineer salaries data..."
        disabled={loading}
        className="chat-input"
      />
      <Button
        type="primary"
        onClick={handleSend}
        loading={loading}
        className="chat-button"
      >
        Send
      </Button>
    </div>
  );
};

export default Chat;
