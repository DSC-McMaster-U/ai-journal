import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useJournals } from '@/hooks/useJournals';
import { EllipsisVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

function EntryCard({ entry }) {
  const router = useRouter();
  const { toast } = useToast();
  const { id, created_at, title, content } = entry;

  const formattedDate = new Date(created_at).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric'
  });

  return (
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
            {content ? JSON.parse(content).content : 'Empty entry'}
          </p>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="ml-auto mr-2">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default EntryCard;
