import React from 'react';
import { Settings, Search, Download, Upload, History, Plus } from 'lucide-react';
import { RatingFactorTable } from '../RatingFactorTable';
import { ClassCodeTable } from '../ClassCodeTable';
import { TerritoryTable } from '../TerritoryTable';
import { PremiumRuleTable } from '../PremiumRuleTable';
import { RatingSearch } from '../RatingSearch';
import { RatingHistory } from '../RatingHistory';
import { UserManagement } from '../UserManagement';
import { useAuth } from '../../../contexts/AuthContext';

interface RatingAdminProps {
  onClose: () => void;
}

type AdminTab = 'rating_factors' | 'class_codes' | 'territories' | 'rules' | 'users';

export function RatingAdmin({ onClose }: RatingAdminProps) {
  const [activeTab, setActiveTab] = React.useState<AdminTab>('rating_factors');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { hasPermission } = useAuth();

  const tabs = [
    {
      id: 'rating_factors' as const,
      label: 'Rating Factors',
      description: 'Manage experience mods, schedule credits, and other rating factors',
      permission: 'view_rates'
    },
    {
      id: 'class_codes' as const,
      label: 'Class Codes',
      description: 'Manage workers compensation class codes and base rates',
      permission: 'manage_class_codes'
    },
    {
      id: 'territories' as const,
      label: 'Territories',
      description: 'Manage territory definitions and rate multipliers',
      permission: 'manage_territories'
    },
    {
      id: 'rules' as const,
      label: 'Premium Rules',
      description: 'Configure premium calculation rules and factors',
      permission: 'manage_rules'
    },
    {
      id: 'users' as const,
      label: 'User Management',
      description: 'Manage user accounts and permissions',
      permission: 'manage_users'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Rating Administration
              </h1> 
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                <History className="w-4 h-4" />
                History
              </button>
              <button
                onClick={() => {
                  const list = document.querySelector('[data-testid="rating-factor-list"]');
                  if (list) {
                    const event = new CustomEvent('add-new');
                    list.dispatchEvent(event);
                  }
                }}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md"
              >
                Back to Rating
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex gap-4 border-b border-gray-200 pb-4">
            {tabs.map(tab => (
              hasPermission(tab.permission) && (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                  <div className="absolute left-0 w-64 p-2 mt-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {tab.description}
                  </div>
                </div>
              )
            ))}
          </div>
          
          {activeTab !== 'users' && searchQuery !== undefined && (
            <div className="flex justify-end">
              <RatingSearch value={searchQuery} onChange={setSearchQuery} />
            </div>
          )}

          <div className="bg-white rounded-lg shadow mt-6">
            {activeTab === 'users' ? (
              <UserManagement />
            ) : activeTab === 'territories' ? (
              <TerritoryTable />
            ) : activeTab === 'rules' ? (
              <PremiumRuleTable />
            ) : activeTab === 'rating_factors' ? (
              <RatingFactorTable />
            ) : activeTab === 'class_codes' ? (
              <ClassCodeTable />
            ) : null}
          </div>

          {activeTab !== 'users' && (
            <div className="mt-8">
              <RatingHistory />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}