import React from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { Address } from '../../types';
import { states } from '../../utils/constants';
import { ValidationMessage } from '../ValidationMessage';

interface LocationFormProps {
  locations: Address[];
  onChange: (locations: Address[]) => void;
}

const emptyLocation: Address = {
  street1: '',
  street2: '',
  city: '',
  state: '',
  zipCode: '',
};

export function LocationForm({ locations, onChange }: LocationFormProps) {
  const handleAddLocation = () => {
    onChange([...locations, { ...emptyLocation }]);
  };

  const handleRemoveLocation = (index: number) => {
    onChange(locations.filter((_, i) => i !== index));
  };

  const handleLocationChange = (index: number, field: keyof Address, value: string) => {
    const updatedLocations = locations.map((location, i) => {
      if (i === index) {
        return { ...location, [field]: value };
      }
      return location;
    });
    onChange(updatedLocations);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Business Locations</h2>
        </div>
        {locations.length === 0 && (
          <ValidationMessage message="At least one business location is required" />
        )}
        <button
          type="button"
          onClick={handleAddLocation}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Location
        </button>
      </div>

      <div className="space-y-6">
        {locations.map((location, index) => (
          <div key={index} className="relative border border-gray-200 rounded-lg p-4">
            <button
              type="button"
              onClick={() => handleRemoveLocation(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={location.street1}
                  onChange={(e) => handleLocationChange(index, 'street1', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="123 Main St"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Suite/Unit (Optional)
                </label>
                <input
                  type="text"
                  value={location.street2 || ''}
                  onChange={(e) => handleLocationChange(index, 'street2', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Suite 100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={location.city}
                  onChange={(e) => handleLocationChange(index, 'city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={location.state}
                    onChange={(e) => handleLocationChange(index, 'state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={location.zipCode}
                    onChange={(e) => handleLocationChange(index, 'zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="12345"
                    maxLength={5}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {locations.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No locations added yet.</p>
            <button
              type="button"
              onClick={handleAddLocation}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first location
            </button>
          </div>
        )}
      </div>
    </div>
  );
}