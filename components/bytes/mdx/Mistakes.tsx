import { AlertTriangle } from 'lucide-react';

interface MistakesProps {
  children: React.ReactNode;
}

export function Mistakes({ children }: MistakesProps) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-red-500 bg-red-950/30 p-4">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-red-300 mb-2">Common Mistakes</h4>
          <div className="text-gray-300 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
