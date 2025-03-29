import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useDeleteMood, useUpdateMood } from '@/hooks/useMoods';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import AlertModal from '../common/AlertModal';
import { DialogFooter, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
// import { moods as moodList } from '@/components/ui/MoodSelector.jsx';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';


import {
  Smile,
  Frown,
  Meh,
  Ghost,
  X,
  HeartOff,
  Laugh,
  Annoyed,
  Angry,
  Activity
} from 'lucide-react';

const moods = [
  { name: 'heartsick', icon: <HeartOff size={24} /> },
  { name: 'sad', icon: <Frown size={24} /> },
  { name: 'excited', icon: <Laugh size={24} /> },
  { name: 'mad', icon: <Angry size={24} /> },
  { name: 'annoyed', icon: <Annoyed size={24} /> },
  { name: 'lonely', icon: <Ghost size={24} /> },
  { name: 'anxious', icon: <Activity size={24} /> },
  { name: 'joy', icon: <Smile size={24} /> },
  { name: 'empty', icon: <Meh size={24} /> }
];

function MoodCard({ entry, editMoodHandler, handleDeleteMood }) {
  const router = useRouter();
  const { id, created_at, moods } = entry;

  const [name, setName] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const formattedTime = new Date(created_at).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  });

  return (
    <>
      <div
        key={id}
        className="flex justify-between items-center pl-6 pr-2 border-b-2 border-neutral h-20 cursor-pointer hover:bg-accent/30 transition-all"
        onClick={() => router.push(`/moods/${id}`)}>
        <div className="flex gap-8 items-center">
          <div className="max-w-6 w-6 h-12 flex flex-col items-center justify-center text-secondary-foreground">
            <p>{formattedTime}</p>
          </div>
          {/* <div className="text-xl"> */}
          {/* <h2 className="font-semibold">{title}</h2> */}
          {/* <p className="text-sm overflow-hidden truncate w-[180px] text-muted"> */}
          {/* {content ? JSON.parse(content).content : 'Empty entry'} */}
          {/* </p> */}
          <div className="flex flex-wrap gap-2 max-w-[200px]">
            {moods?.length > 0 ? (
              moods.map((moodName, index) => {
                const mood = moodList.find((m) => m.name === moodName);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs"
                  >
                    {mood?.icon}
                    <span>{moodName}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-muted text-sm">No moods recorded</p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto mr-2">
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                // setName(title);
                setOpenEditModal(true);
              }}
              className="cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setOpenDeleteModal(true);
              }}
              className="cursor-pointer text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* EDIT MODAL WINDOW */}
      {openEditModal && (<DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Mood Entry</DialogTitle>
        </DialogHeader>
        <MoodSelector
          initialMoods={moods}
          onSubmit={(updatedMoods) => {
            editMoodHandler(id, updatedMoods);
            setOpenEditModal(false);
          }}
          onCancel={() => setOpenEditModal(false)}
        />
      </DialogContent>)
      }

      {/* <AlertModal
        title="Edit Mood Entry"
        description={`Edit this mood entry.`}
        open={openEditModal}
        setOpen={setOpenEditModal}>
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Mood
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter journal name"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                onClick={() => {
                  editMoodHandler(id, name);
                }}>
                Edit
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpenEditModal(false)}>
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </div>
      </AlertModal> */}

      {/* DELETE MODAL WINDOW */}
      <AlertModal
        title="Delete Mood Entry"
        description={`Deleting mood entry from ${formattedTime}.`}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}>
        <div>
          <p>
            Are you sure you want to delete this mood entry? This action is NOT recoverable.
          </p>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  handleDeleteMood(id);
                }}
                variant="destructive"
                className="flex-1">
                Delete
              </Button>
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpenDeleteModal(false)}>
                Cancel
              </Button>
            </div>
          </DialogFooter>
        </div>
      </AlertModal>
    </>
  );
}

export default MoodCard;
