'use client';

import { Button } from '@/components/ui/button';
import { getCookie } from 'cookies-next';

export default function DashboardPage() {
  const sendFetchOnClick = async () => {
    const response = await fetch('http://localhost:8080/api/tabs', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwtToken')
      }
    });
    const data = await response.json();
    console.log(data);
  };

  const sendPostOnClick = async () => {
    const response = await fetch('http://localhost:8080/api/tabs/10', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + getCookie('jwtToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'FE Test 2 Updated'
      })
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={sendPostOnClick}>Fetch</Button>
    </div>
  );
}
