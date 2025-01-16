'use client';

import { useParams } from 'next/navigation';
import JournalsPage from '../page';

export default function TabPage() {
  const params = useParams();

  return <JournalsPage defaultTab={params.tab} />;
}
