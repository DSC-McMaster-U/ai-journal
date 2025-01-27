'use client';
import { Button } from '@/components/ui/button';
import { logout, useAuthentication } from '@/hooks/authentication';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

async function getProfilePhoto(user) {
  await fetch(
    'https://admin.googleapis.com/admin/directory/v1/users/' + user.email + '/photos/thumbnail',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + user.id
      }
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((user_photo) => {
      document.getElementById('profile-photo').src = 'data:image/png;base64,' + user_photo;
    })
    .catch((err) => {
      console.log(err);
    });
}

function ProfilePhoto(props) {
  return (
    <div className="flex justify-center m-5">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        id="profile-photo"
        style={{ width: '35vw', borderRadius: '35vw' }}
      />
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);

  useAuthentication(
    (user) => {
      setUser(user);
    },
    () => {
      router.push('/login');
    }
  );

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  console.log(user);

  if (user == undefined) {
    return <h1>Loading...</h1>;
  }

  //For future implementation with profile photos
  //getProfilePhoto(user);

  return (
    <div className="w-screen">
      <ProfilePhoto />
      <div className="flex justify-evenly m-5 text-2xl">
        {' '}
        <h1>{user.name}</h1>{' '}
      </div>
      <h1 className="flex justify-center m-5 text-xl">{user.email}</h1>
      <div className="flex justify-center m-5 text-xl">
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
}
