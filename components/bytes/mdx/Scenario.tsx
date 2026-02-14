import { Lightbulb } from 'lucide-react';

interface ScenarioProps {
  title?: string;
  children: React.ReactNode;
}

export function Scenario({ title = 'Real-world Scenario', children }: ScenarioProps) {
  return (
    <div className="my-4 rounded-r-lg border-l-4 border-orange-400 bg-orange-50 p-4">
      <div className="flex items-start gap-2">
        <Lightbulb className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-orange-900 mb-2">{title}</h4>
          <div className="text-gray-700 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
