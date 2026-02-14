import { CheckCircle2 } from 'lucide-react';

interface TakeawaysProps {
  children: React.ReactNode;
}

export function Takeaways({ children }: TakeawaysProps) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
      <div className="flex items-start gap-2">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-900 mb-2">Key Takeaways</h4>
          <div className="text-gray-700 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
