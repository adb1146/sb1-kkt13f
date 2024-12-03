import React from 'react';
import { HelpCircle, FileText, Quote, Brain, Shield, Lightbulb, Settings, Users } from 'lucide-react';

export function HelpTab() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Workers' Compensation Rating Guide</h2>
        </div>
        
        <div className="prose prose-blue max-w-none">
          <p className="text-gray-600">
            Welcome to PS Advisory's Workers' Compensation Insurance Rating Application. This advanced platform combines traditional underwriting expertise with AI-powered insights to help you manage and optimize workers' compensation insurance applications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Managing Applications</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Creating a New Application</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Start by clicking "New Rating" in the navigation bar</li>
                <li>Complete the business information section with company details</li>
                <li>Add all business locations and operational details</li>
                <li>Document safety programs and implemented controls</li>
                <li>Enter detailed payroll information by class code</li>
                <li>Select appropriate supplemental coverages like Aircraft and USL&H</li>
                <li>Provide loss history and prior insurance information</li>
                <li>Use AI suggestions to optimize your submission</li>
                <li>Calculate premium and generate quotes</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Using Example Data</h4>
              <p className="text-gray-600">
                Use the "Load Example Data" button to explore a complete sample application. This helps you understand the required information format and demonstrates best practices for data entry and organization.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Managing Quotes</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Generating Quotes</h4>
              <ol className="list-decimal list-inside text-gray-600 space-y-2">
                <li>Complete all required application fields</li>
                <li>Click "Calculate Premium" to review details</li>
                <li>Confirm the information is correct</li>
                <li>Save the rating when complete</li>
                <li>Click "Generate Quote" on any saved rating</li>
                <li>Set the effective date and add notes</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Quote Management</h4>
              <p className="text-gray-600">
                Track and manage quotes through their lifecycle:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Draft: Initial quote generation</li>
                <li>Issued: Quote sent to client</li>
                <li>Bound: Policy accepted and active</li>
                <li>Expired: Quote no longer valid</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Assistance</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Risk Assessment</h4>
              <p className="text-gray-600">
                Our AI-powered risk assessment system analyzes multiple factors:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Evaluate overall risk level</li>
                <li>Identify key risk factors</li>
                <li>Suggest safety improvements</li>
                <li>Recommend premium adjustments</li>
                <li>Analyze industry-specific exposures</li>
                <li>Review safety program effectiveness</li>
                <li>Assess loss control measures</li>
                <li>Evaluate operational procedures</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Premium Suggestions</h4>
              <p className="text-gray-600">
                Our AI system provides comprehensive premium optimization:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Multiple premium scenarios with confidence levels</li>
                <li>Specific recommendations for premium reduction</li>
                <li>Risk-based pricing adjustments</li>
                <li>Comparative industry analysis</li>
                <li>Safety program effectiveness analysis</li>
                <li>Experience mod factor optimization</li>
                <li>Smart supplemental coverage suggestions</li>
                <li>Territory and classification analysis</li>
                <li>Aircraft exposure evaluation</li>
                <li>Maritime operations assessment</li>
                <li>Foreign exposure analysis</li>
                <li>Stop gap coverage recommendations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Real-time Assistance</h4>
              <p className="text-gray-600">
                Our AI Assistant provides intelligent guidance throughout:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Suggest improvements to your entries</li>
                <li>Highlight potential data inconsistencies</li>
                <li>Provide industry-specific guidance</li>
                <li>Help optimize your application for better rates</li>
                <li>Recommend appropriate supplemental coverages</li>
                <li>Identify potential coverage gaps</li>
                <li>Suggest risk mitigation strategies</li>
                <li>Provide regulatory compliance guidance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Administrative Features</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Rating Administration</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Manage rating factors and tables</li>
                <li>Configure premium rules</li>
                <li>Set up territory definitions</li>
                <li>Maintain class code mappings</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">User Management</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Control user access and permissions</li>
                <li>Track user activity and changes</li>
                <li>Manage role-based access</li>
                <li>Monitor system usage</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Data Accuracy</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Provide detailed business operations description</li>
                <li>Maintain accurate payroll records by class code</li>
                <li>Document implemented safety programs and controls</li>
                <li>Keep detailed loss history records</li>
                <li>Verify employee counts and classifications</li>
                <li>Review experience modification factors</li>
                <li>Document aircraft and maritime exposures</li>
                <li>Track foreign operations and travel</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Regular Updates</h4>
              <p className="text-gray-600">
                Keep your information current with regular updates:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Maintain accurate premium calculations</li>
                <li>Keep risk assessments current</li>
                <li>Benefit from the latest AI insights</li>
                <li>Track safety program effectiveness</li>
                <li>Monitor claims and loss trends</li>
                <li>Track operational changes</li>
                <li>Review supplemental coverage needs</li>
                <li>Update aircraft and maritime exposures</li>
                <li>Monitor foreign operations</li>
                <li>Review stop gap requirements</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Progress Tracking</h4>
              <p className="text-gray-600">
                Monitor your application completion:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Monitor application completion status</li>
                <li>Navigate between sections easily</li>
                <li>Identify missing required information</li>
                <li>Track AI-assisted improvements</li>
                <li>Get section-specific AI guidance</li>
                <li>Review data validation messages</li>
                <li>Track premium and modifier changes</li>
                <li>Monitor supplemental coverage selections</li>
                <li>Review coverage limits and options</li>
                <li>Track total premium calculations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}