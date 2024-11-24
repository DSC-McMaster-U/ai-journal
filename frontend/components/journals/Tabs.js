'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaBars, FaPlus, FaPencil, FaTrash } from 'react-icons/fa6';
import Link from 'next/link';
import { FaBook, FaChartColumn, FaComment, FaGear, FaHouse } from 'react-icons/fa6';

const Tabs = ({ onSidebarOpenChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditingTab, setIsEditingTab] = useState(null);
  const [editTabName, setEditTabName] = useState('');

  // Navigation routes
  const routes = [
    {
      name: 'Journals',
      path: '/journals',
      icon: <FaBook />
    },
    {
      name: 'Chats',
      path: '/chats',
      icon: <FaComment />
    },
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <FaHouse />
    },
    {
      name: 'Stats',
      path: '/stats',
      icon: <FaChartColumn />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <FaGear />
    }
  ];

  // Placeholder tabs data
  const [tabs, setTabs] = useState([
    { id: 'daily', name: 'Daily Journal', isDefault: true },
    { id: 'gratitude', name: 'Gratitude Journal' },
    { id: 'dreams', name: 'Dream Journal' }
  ]);

  const handleMenuToggle = (isOpen) => {
    setIsMenuOpen(isOpen);
    onSidebarOpenChange?.(isOpen);
  };

  const handleTabClick = (tabId) => {
    router.push(`/journals/${tabId}`);
    handleMenuToggle(false);
  };

  const handleCreateTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      name: 'New Journal',
      isDefault: false
    };
    setTabs([...tabs, newTab]);
    setIsEditingTab(newTab.id);
    setEditTabName(newTab.name);
  };

  const handleEditTab = (tabId, currentName) => {
    setIsEditingTab(tabId);
    setEditTabName(currentName);
  };

  const handleSaveTabName = (tabId) => {
    setTabs(
      tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              name: editTabName.trim() || tab.name
            }
          : tab
      )
    );
    setIsEditingTab(null);
  };

  const handleDeleteTab = (tabId) => {
    if (window.confirm('Are you sure you want to delete this journal tab?')) {
      setTabs(tabs.filter((tab) => tab.id !== tabId));
      if (pathname.includes(tabId)) {
        router.push('/journals/daily');
      }
    }
  };

  return (
    <div className="relative">
      {/* Top Tab Bar */}
      <div className="flex items-center bg-[#1e293b] h-16 px-4 border-b border-base-content/10">
        <button
          onClick={() => handleMenuToggle(!isMenuOpen)}
          className="btn btn-ghost btn-sm px-2"
          aria-label="Menu">
          <FaBars className="text-xl text-gray-300" />
        </button>
        <div className="text-lg font-medium text-gray-300 ml-4">
          {tabs.find((tab) => pathname.includes(tab.id))?.name || 'Daily Journal'}
        </div>
      </div>

      {/* Tab Menu Sidebar */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => handleMenuToggle(false)}
          />

          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full w-72 bg-[#1e293b] z-50 shadow-xl animate-slide-right flex flex-col">
            <div className="flex-1 overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b border-base-content/10">
                <h2 className="text-xl font-bold text-primary">Journal Categories</h2>
                <button
                  onClick={handleCreateTab}
                  className="btn btn-ghost btn-sm text-primary"
                  title="Create new tab">
                  <FaPlus className="text-lg" />
                </button>
              </div>

              <ul className="p-4 space-y-2">
                {tabs.map((tab) => (
                  <li
                    key={tab.id}
                    className={`rounded-lg transition-colors ${
                      pathname.includes(tab.id) ? 'bg-primary/10' : 'hover:bg-base-300'
                    }`}>
                    <div className="flex items-center p-3 gap-2">
                      {isEditingTab === tab.id ? (
                        <input
                          type="text"
                          value={editTabName}
                          onChange={(e) => setEditTabName(e.target.value)}
                          onBlur={() => handleSaveTabName(tab.id)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveTabName(tab.id)}
                          className="input input-bordered input-sm flex-1 bg-base-200"
                          autoFocus
                        />
                      ) : (
                        <button
                          onClick={() => handleTabClick(tab.id)}
                          className={`flex-1 text-left transition-colors ${
                            pathname.includes(tab.id)
                              ? 'text-primary font-medium'
                              : 'text-gray-300 hover:text-primary'
                          }`}>
                          {tab.name}
                        </button>
                      )}

                      {!tab.isDefault && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTab(tab.id, tab.name)}
                            className="btn btn-ghost btn-xs text-gray-400 hover:text-primary"
                            title="Edit tab name">
                            <FaPencil />
                          </button>
                          <button
                            onClick={() => handleDeleteTab(tab.id)}
                            className="btn btn-ghost btn-xs text-gray-400 hover:text-error"
                            title="Delete tab">
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Menu in Sidebar */}
            {/* <div className="border-t border-base-content/10 p-4">
                            <div className="flex justify-around">
                                {routes.map((route) => (
                                    <Link
                                        key={route.name}
                                        href={route.path}
                                        className={`${pathname === route.path ? 'text-primary' : 'text-gray-400'
                                            } hover:text-primary transition-colors text-2xl`}
                                        onClick={() => handleMenuToggle(false)}>
                                        {route.icon}
                                    </Link>
                                ))}
                            </div>
                        </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;
