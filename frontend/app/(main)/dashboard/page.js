'use client';

import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';

export default function DashboardPage() {
  const sendFetchOnClick = async () => {
    const response = await fetch('http://localhost:8080/api/warehouses', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwtToken')
      }
    });
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
