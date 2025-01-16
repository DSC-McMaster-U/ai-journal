'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function DashboardPage() {
  const sendFetchOnClick = async () => {
    const response = await fetch('http://localhost:8080/api/sum');
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={sendFetchOnClick}>Fetch</Button>
    </div>
  );
}
