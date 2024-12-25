import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { NotebookPen } from 'lucide-react';

const LandingCard = ({ title, description, alignment = 'left', icon }) => {
  return (
    <div className={cn('mx-4 flex-col')}>
      <div
        className={cn(
          'w-fit border px-4 py-1.5 rounded-full mb-4 rounded-bl-none',
          alignment === 'right' && 'ml-auto rounded-bl-full rounded-br-none'
        )}>
        {title}
      </div>
      <div
        className={cn(
          'bg-secondary p-4 text-foreground rounded-xl rounded-bl-none',
          'font-light flex gap-6 items-center',
          alignment === 'right' && 'flex-row-reverse rounded-bl-xl rounded-br-none'
        )}>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default LandingCard;
