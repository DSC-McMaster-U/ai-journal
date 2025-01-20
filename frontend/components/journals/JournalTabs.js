import { EllipsisVertical, Menu, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { HexColorPicker } from 'react-colorful';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import AlertModal from '../common/AlertModal';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useCreateTab, useDeleteTab, useGetAllTabs, useUpdateTab } from '@/hooks/useTabs';

const DEFAULT_COLOR = '#8f4000';

function JournalTabs() {
  const { getAllTabs, data: allTabs } = useGetAllTabs();
  const { createTab, error: errorCreate } = useCreateTab();
  const { updateTab, error: errorUpdate } = useUpdateTab();
  const { deleteTab, error: errorDelete } = useDeleteTab();

  useEffect(() => {
    getAllTabs();
  }, []);

  const { toast } = useToast();
  const router = useRouter();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedModalID, setSelectedModalID] = useState(null);

  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);

  useEffect(() => {
    if (!openEdit && !openDelete && !openCreate) {
      setTimeout(() => {
        setSelectedModalID(null);
        setName('');
        setColor(DEFAULT_COLOR);
      }, 500);
    }
  }, [openEdit, openDelete, openCreate]);

  const tabClickHandler = (tabId) => {
    router.push(`/journals/${tabId}`);
  };

  const createFolderHandler = async () => {
    if (!name) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter a valid name for the folder.'
      });
      return;
    }

    await createTab({ name, color });
    getAllTabs();

    console.log(errorCreate);

    if (errorCreate) {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the folder.'
      });
    } else {
      toast({
        title: 'Folder Created',
        description: `Folder ${name} has been created successfully.`
      });
    }

    setOpenCreate(false);
  };

  const editFolderHandler = async () => {
    if (!name || !selectedModalID) {
      toast({
        title: 'Invalid Name',
        description: 'Please enter a valid name for the folder.'
      });
      return;
    }

    await updateTab(selectedModalID, { name, color });
    getAllTabs();

    toast({
      title: 'Folder Edited',
      description: `Folder ${name} has been edited successfully.`
    });

    setOpenEdit(false);
  };

  const deleteFolderHandler = async () => {
    await deleteTab(selectedModalID);
    getAllTabs();

    toast({
      title: 'Folder Deleted',
      description: `Folder ${name} has been deleted successfully.`
    });

    setOpenDelete(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full p-6 fixed right-[20px] bottom-[165px] z-[5] transition-all hover:-translate-y-[2px]">
            <Menu className="!w-6 !h-6" strokeWidth={3} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-start">
            <SheetTitle>Journal Categories</SheetTitle>
            <SheetDescription>
              Navigate and manage your journal entries by categories
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <p>Your Folders</p>
              <Button
                size="icon"
                variant="ghost"
                className="mr-0"
                onClick={() => {
                  setOpenCreate(true);
                }}>
                <Plus />
              </Button>
            </div>
            <div className="mt-2 space-y-2">
              {allTabs &&
                allTabs.map((tab) => (
                  <Button
                    className="w-full justify-start px-2 font-normal flex gap-4"
                    variant="ghost"
                    onClick={() => tabClickHandler(tab.id)}
                    key={tab.id}>
                    <div
                      className={cn('w-4 h-4 rounded-md')}
                      style={{ backgroundColor: tab.color }}
                    />
                    <p>{tab.name}</p>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="ml-auto">
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedModalID(tab.id);
                            setColor(tab.color);
                            setName(tab.name);
                            setOpenEdit(true);
                          }}
                          className="cursor-pointer">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedModalID(tab.id);
                            setColor(tab.color);
                            setName(tab.name);
                            setOpenDelete(true);
                          }}
                          className="cursor-pointer">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Button>
                ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* CREATE MODAL WINDOW */}
      <AlertModal
        title="Create New Folder"
        description="Create a new journal category folder to organize your entries."
        open={openCreate}
        setOpen={setOpenCreate}>
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
                placeholder="Enter folder name"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="cursor-pointer w-full h-9 rounded-md grid place-items-center"
                      style={{ backgroundColor: color }}>
                      {color}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit h-fit">
                    <HexColorPicker
                      color={color}
                      onChange={(color) => {
                        setColor(color);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpenCreate(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={createFolderHandler}>
                Create Folder
              </Button>
            </div>
          </DialogFooter>
        </div>
      </AlertModal>

      {/* EDIT MODAL WINDOW */}
      <AlertModal
        title="Edit Folder"
        description={`Edit the folder name and color for ${name}.`}
        open={openEdit}
        setOpen={setOpenEdit}>
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
                placeholder="Enter folder name"
                className="col-span-3"
              />
            </div>
            <div>
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      className="cursor-pointer w-full h-9 rounded-md grid place-items-center"
                      style={{ backgroundColor: color }}>
                      {color}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-fit h-fit">
                    <HexColorPicker
                      color={color}
                      onChange={(color) => {
                        setColor(color);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpenEdit(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={editFolderHandler}>
                Edit
              </Button>
            </div>
          </DialogFooter>
        </div>
      </AlertModal>

      {/* DELETE MODAL WINDOW */}
      <AlertModal
        title="Delete Folder"
        description={`Deleting folder ${name}.`}
        open={openDelete}
        setOpen={setOpenDelete}>
        <div>
          <p>
            Are you sure you want to delete {name}? This will delete all of the journal entries
            inside. This action is NOT recoverable.
          </p>
          <DialogFooter>
            <div className="flex gap-2 mt-6">
              <Button
                className="flex-1"
                type="button"
                variant="secondary"
                onClick={() => setOpenDelete(false)}>
                Cancel
              </Button>
              <Button variant="destructive" className="flex-1" onClick={deleteFolderHandler}>
                Delete
              </Button>
            </div>
          </DialogFooter>
        </div>
      </AlertModal>
    </>
  );
}

export default JournalTabs;
