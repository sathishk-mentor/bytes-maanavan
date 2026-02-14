import { CheckCircle2 } from 'lucide-react';

interface TakeawaysProps {
  children: React.ReactNode;
}

export function Takeaways({ children }: TakeawaysProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
      <div className="flex items-start">
        <CheckCircle2 className="mr-3 h-6 w-6 flex-shrink-0 text-green-600" />
        <div className="flex-1">
          <h4 className="mb-3 font-bold text-green-900">Key Takeaways</h4>
          <div className="text-green-800">{children}</div>
        </div>
      </div>
    </div>
  );
}
