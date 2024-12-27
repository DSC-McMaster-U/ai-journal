import { EllipsisVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

function EntryCard({ entry, currentTab }) {
  const router = useRouter();
  const { toast } = useToast();
  const { id, date, title, description } = entry;

  return (
    <div
      key={id}
      className="flex justify-between items-center pl-6 pr-2 border-t-2 border-b-2 border-neutral h-20 cursor-pointer"
      onClick={() => router.push(`/journals/${currentTab}/${id}`)}>
      <div className="flex gap-8 items-center">
        <div className="max-w-6 w-6 h-12 flex flex-col items-center justify-center">
          <p>{date.split(' ')[0]}</p>
          <p>{date.split(' ')[1]}</p>
        </div>
        <div className="text-xl">
          <h2 className="font-semibold">{title}</h2>
          <p className="text-sm overflow-hidden truncate w-[180px] text-muted">{description}</p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto mr-2">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={(e) => {
              toast({
                title: 'Edit Entry',
                description: 'This feature is not implemented yet.'
              });

              e.stopPropagation();
            }}
            className="cursor-pointer">
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(e) => {
              toast({
                title: 'Delete Entry',
                description: 'This feature is not implemented yet.'
              });

              e.stopPropagation();
            }}
            className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default EntryCard;
