import { CheckCircle2 } from 'lucide-react';

interface TakeawaysProps {
  children: React.ReactNode;
}

export function Takeaways({ children }: TakeawaysProps) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-green-500 bg-green-950/30 p-4">
      <div className="flex items-start gap-2">
        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-green-300 mb-2">Key Takeaways</h4>
          <div className="text-gray-300 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
