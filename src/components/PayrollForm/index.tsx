import React from 'react';
import { Briefcase, Plus, Trash2, DollarSign, Users } from 'lucide-react';
import { PayrollInfo } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { states } from '../../utils/constants';
import { ValidationMessage } from '../ValidationMessage';

interface PayrollFormProps {
  payrollInfo: PayrollInfo[];
  onChange: (payrollInfo: PayrollInfo[]) => void;
}

const emptyPayroll: PayrollInfo = {
  stateCode: '',
  classCode: '',
  employeeCount: 0,
  annualPayroll: 0,
  jobDescription: '',
};

export function PayrollForm({ payrollInfo, onChange }: PayrollFormProps) {
  const handleAddPayroll = () => {
    onChange([...payrollInfo, { ...emptyPayroll }]);
  };

  const handleRemovePayroll = (index: number) => {
    onChange(payrollInfo.filter((_, i) => i !== index));
  };

  const handlePayrollChange = (index: number, field: keyof PayrollInfo, value: any) => {
    const updatedPayroll = payrollInfo.map((info, i) => {
      if (i === index) {
        return { ...info, [field]: value };
      }
      return info;
    });
    onChange(updatedPayroll);
  };

  const totalPayroll = payrollInfo.reduce((sum, info) => sum + info.annualPayroll, 0);
  const totalEmployees = payrollInfo.reduce((sum, info) => sum + info.employeeCount, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Payroll Information</h2>
        </div>
        {payrollInfo.length === 0 && (
          <ValidationMessage message="At least one payroll classification is required" />
        )}
        <button
          type="button"
          onClick={handleAddPayroll}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Classification
        </button>
      </div>

      {payrollInfo.length > 0 && (
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Total Employees: {totalEmployees}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Total Annual Payroll: {formatCurrency(totalPayroll)}</span>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {payrollInfo.map((info, index) => (
          <div key={index} className="relative border border-gray-200 rounded-lg p-4">
            <button
              type="button"
              onClick={() => handleRemovePayroll(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={info.stateCode}
                  onChange={(e) => handlePayrollChange(index, 'stateCode', e.target.value)}
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
                  Class Code
                </label>
                <input
                  type="text"
                  value={info.classCode}
                  onChange={(e) => handlePayrollChange(index, 'classCode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 8810"
                  maxLength={4}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Number of Employees
                  </div>
                </label>
                <input
                  type="number"
                  value={info.employeeCount || ''}
                  onChange={(e) => handlePayrollChange(index, 'employeeCount', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Annual Payroll
                  </div>
                </label>
                <input
                  type="number"
                  value={info.annualPayroll || ''}
                  onChange={(e) => handlePayrollChange(index, 'annualPayroll', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="1000"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Description
                </label>
                <textarea
                  value={info.jobDescription}
                  onChange={(e) => handlePayrollChange(index, 'jobDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Describe the work performed by employees in this classification..."
                />
              </div>
            </div>
          </div>
        ))}

        {payrollInfo.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No payroll classifications added.</p>
            <button
              type="button"
              onClick={handleAddPayroll}
              className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first classification
            </button>
          </div>
        )}
      </div>
    </div>
  );
}