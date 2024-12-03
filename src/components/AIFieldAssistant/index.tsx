import React from 'react';
import { Brain, Lightbulb, Loader2 } from 'lucide-react';
import { getFieldSuggestions } from '../../utils/ai/formAssistant';
import { BusinessInfo } from '../../types';

interface AIFieldAssistantProps {
  field: string;
  value: string;
  businessInfo: BusinessInfo;
  onSuggestion: (suggestion: string) => void;
}

export function AIFieldAssistant({ field, value, businessInfo, onSuggestion }: AIFieldAssistantProps) {
  const [suggestion, setSuggestion] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (value) {
        setIsLoading(true);
        try {
          const aiSuggestion = await getFieldSuggestions(field, value, businessInfo);
          setSuggestion(aiSuggestion);
        } catch (error) {
          console.error('Error getting AI suggestions:', error);
        }
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, field, businessInfo]);

  if (!value || (!isLoading && !suggestion)) return null;

  return (
    <div className="mt-2 p-3 bg-blue-50 rounded-lg">
      <div className="flex items-start gap-2">
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 text-blue-600 animate-spin mt-0.5" />
            <span className="text-sm text-blue-700">AI is analyzing your input...</span>
          </>
        ) : suggestion ? (
          <>
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">AI Suggestion:</span>
                <button
                  onClick={() => onSuggestion(suggestion)}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Apply
                </button>
              </div>
              <p className="mt-1 text-sm text-blue-700">{suggestion}</p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}