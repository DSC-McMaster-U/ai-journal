'use client';
import { Button } from '@/components/ui/button';
import { logout, useAuthentication } from '@/hooks/authentication';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/common/Modal';
import { DialogFooter } from '@/components/ui/dialog';
import Image from 'next/image';

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState(undefined);
  const [open, setOpen] = useState(false);

  useAuthentication(
    (user) => {
      setUser(user);
    },
    () => {
      router.push('/login');
    }
  );

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

  //For future implementation with profile photos
  //getProfilePhoto(user);

  const onLogoutConfirm = () => {
    router.push('/login');
  };

  if (user == undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1 className="p-4 text-2xl capitalize border-b-[6px]">Settings</h1>

      <div className="flex justify-center m-5">
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          id="profile-photo"
          className="w-[25vw] rounded-full"
          width={200}
          height={200}
          alt="Profile Photo"
        />
      </div>
      <div className="flex justify-evenly m-5 text-2xl">
        <h1>{user.name}</h1>
      </div>
      <h1 className="flex justify-center m-5 text-xl">{user.email}</h1>
      <div className="flex justify-center m-5 text-xl">
        <Modal
          open={open}
          setOpen={setOpen}
          title="Logout"
          trigger={<Button>Logout</Button>}
          description={'Are you sure you want to logout?'}>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  logout();
                  onLogoutConfirm();
                }}>
                Logout
              </Button>
            </div>
          </DialogFooter>
        </Modal>
      </div>
    </div>
  );
}
