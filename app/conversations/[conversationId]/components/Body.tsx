'use client';

import { useEffect, useRef, useState } from 'react';
import { FullMessageType } from '@/app/types';
import useConversation from '@/app/hooks/useConversation';
import MessageBox from '@/app/conversations/[conversationId]/components/MessageBox';
import axios from 'axios';

interface Props {
  initialMessages: FullMessageType[];
}

const Body = ({ initialMessages }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <MessageBox
          isLast={index === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
