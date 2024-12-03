import React from 'react';
import { Settings, Search, Download, Upload, History, Plus } from 'lucide-react';
import { RatingFactorList } from '../RatingFactorList';
import { RatingTableList } from '../RatingTableList';
import { RatingSearch } from '../RatingSearch';
import { RatingHistory } from '../RatingHistory';
import { TerritoryList } from '../TerritoryList';
import { PremiumRuleList } from '../PremiumRuleList';
import { UserManagement } from '../UserManagement';
import { useAuth } from '../../../contexts/AuthContext';

interface RatingAdminProps {
  onClose: () => void;
}

export function RatingAdmin({ onClose }: RatingAdminProps) {
  const [activeTab, setActiveTab] = React.useState<'factors' | 'tables' | 'territories' | 'class_codes' | 'rules' | 'users'>('factors');
  const [searchQuery, setSearchQuery] = React.useState('');
  const { hasPermission } = useAuth();

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
            <button
              onClick={() => setActiveTab('factors')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'factors'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rating Factors
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'tables'
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rating Tables
            </button>
            {hasPermission('manage_territories') && (
              <button
                onClick={() => setActiveTab('territories')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'territories'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Territories
              </button>
            )}
            {hasPermission('manage_class_codes') && (
              <button
                onClick={() => setActiveTab('class_codes')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'class_codes'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Class Codes
              </button>
            )}
            {hasPermission('manage_rules') && (
              <button
                onClick={() => setActiveTab('rules')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'rules'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Premium Rules
              </button>
            )}
            {hasPermission('manage_users') && (
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'users'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                User Management
              </button>
            )}
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
              <TerritoryList searchQuery={searchQuery} />
            ) : activeTab === 'rules' ? (
              <PremiumRuleList searchQuery={searchQuery} />
            ) : activeTab === 'factors' ? (
              <RatingFactorList searchQuery={searchQuery} />
            ) : (
              <RatingTableList searchQuery={searchQuery} />
            )}
          </div>

          {activeTab !== 'users' && <RatingHistory className="mt-8" />}
        </div>
      </main>
    </div>
  );
}