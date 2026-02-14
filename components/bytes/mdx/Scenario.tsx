import { Lightbulb } from 'lucide-react';

interface ScenarioProps {
  title?: string;
  children: React.ReactNode;
}

export function Scenario({ title = 'Real-world Scenario', children }: ScenarioProps) {
  return (
    <div className="my-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-6">
      <div className="flex items-start">
        <Lightbulb className="mr-3 h-6 w-6 flex-shrink-0 text-orange-600" />
        <div>
          <h4 className="mb-2 font-bold text-orange-900">{title}</h4>
          <div className="text-orange-800">{children}</div>
        </div>
      </div>
    </div>
  );
}
