import { AlertTriangle } from 'lucide-react';

interface MistakesProps {
  children: React.ReactNode;
}

export function Mistakes({ children }: MistakesProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-red-500 bg-red-50 p-6">
      <div className="flex items-start">
        <AlertTriangle className="mr-3 h-6 w-6 flex-shrink-0 text-red-600" />
        <div className="flex-1">
          <h4 className="mb-3 font-bold text-red-900">Common Mistakes</h4>
          <div className="text-red-800">{children}</div>
        </div>
      </div>
    </div>
  );
}
