import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useDeleteJournal, useJournals } from '@/hooks/useJournals';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import AlertModal from '../common/AlertModal';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

function EntryCard({ entry, editJournalHandler, handleDeleteJournal }) {
  const router = useRouter();
  const { id, created_at, title, content } = entry;

  const [name, setName] = useState(title);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric'
  });

  return (
    <>
      <div
        key={id}
        className="flex justify-between items-center pl-6 pr-2 border-b-2 border-neutral h-20 cursor-pointer hover:bg-accent/30 transition-all"
        onClick={() => router.push(`/journals/entries/${id}`)}>
        <div className="flex gap-8 items-center">
          <div className="max-w-6 w-6 h-12 flex flex-col items-center justify-center text-secondary-foreground">
            <p>{formattedDate.split(' ')[0]}</p>
            <p>{formattedDate.split(' ')[1]}</p>
          </div>
          <div className="text-xl">
            <h2 className="font-semibold">{title}</h2>
            <p className="text-sm overflow-hidden truncate w-[180px] text-muted">
              {/* {content ? JSON.parse(content).content : 'Empty entry'} */}
            </p>
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
                setName(title);
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
      <AlertModal
        title="Edit Folder"
        description={`Edit the journal name for ${name}.`}
        open={openEditModal}
        setOpen={setOpenEditModal}>
        <div>
          <div className="flex flex-col gap-4">
            <div>
              <Label htmlFor="name" className="text-right">
                Name
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
                  editJournalHandler(id, name);
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
      </AlertModal>

      {/* DELETE MODAL WINDOW */}
      <AlertModal
        title="Delete Journal"
        description={`Deleting journal ${title}.`}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}>
        <div>
          <p>
            Are you sure you want to delete {title}? This will delete all of the journal entries
            inside. This action is NOT recoverable.
          </p>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  handleDeleteJournal(id);
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

export default EntryCard;
