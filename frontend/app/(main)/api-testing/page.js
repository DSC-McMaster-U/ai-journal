'use client';

import { Button } from '@/components/ui/button';
import {
  useGetAllTabs,
  useGetTabById,
  useCreateTab,
  useUpdateTab,
  useDeleteTab
} from '@/hooks/useTabs';

export default function APITesting() {
  const { getAllTabs, data: allTabs, loading: loadingAll, error: errorAll } = useGetAllTabs();
  const { getTabById, data: tab, loading: loadingTab, error: errorTab } = useGetTabById();
  const { createTab, loading: creating, error: errorCreate } = useCreateTab();
  const { updateTab, loading: updating, error: errorUpdate } = useUpdateTab();
  const { deleteTab, loading: deleting, error: errorDelete } = useDeleteTab();

  return (
    <div>
      <div className="flex flex-col space-y-4 mx-8 mt-8">
        <Button onClick={getAllTabs} className="bg-blue-500" disabled={loadingAll}>
          Get All Tabs
        </Button>
        <Button
          onClick={() => {
            getTabById(18);
          }}
          className="bg-blue-500"
          disabled={loadingTab}>
          Get Tab by ID
        </Button>
        <Button
          onClick={() => createTab({ name: 'New Tab', color: '#462837' })}
          className="bg-green-500"
          disabled={creating}>
          Create a New Tab
        </Button>
        <Button
          onClick={() => updateTab(22, { name: 'Updated Tab Name', color: '#462837' })}
          className="bg-orange-500"
          disabled={updating}>
          Update an Existing Tab
        </Button>
        <Button
          onClick={() => {
            deleteTab(18);
          }}
          className="bg-red-500"
          disabled={deleting}>
          Delete a Tab
        </Button>
      </div>
    </div>
  );
}
