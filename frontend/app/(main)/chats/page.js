'use client';

import { Button } from '@/components/ui/button';
import { customFetch } from '@/lib/customFetch';
import { useEffect, useState } from 'react';

export default function ChatsPage() {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllInstances();
  }, []);

  const getAllInstances = async () => {
    try {
      setIsLoading(true);
      const response = await customFetch('/chats', { method: 'GET' });
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setChats(result.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const createInstance = async () => {
    try {
      const response = await customFetch('/chats', {
        method: 'POST',
        body: JSON.stringify({ name: 'Espressly AI Bot' })
      });
      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="p-4 text-2xl capitalize border-b-[6px]">Your Messages</h1>
      <Button onClick={createInstance}>Create Chat</Button>

      <div>{!isLoading && chats.map((chatInstance) => <div>test</div>)}</div>
    </div>
  );
}
