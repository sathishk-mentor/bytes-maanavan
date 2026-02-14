import { AlertTriangle } from 'lucide-react';

interface MistakesProps {
  children: React.ReactNode;
}

export function Mistakes({ children }: MistakesProps) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-red-900 mb-2">Common Mistakes</h4>
          <div className="text-gray-700 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
