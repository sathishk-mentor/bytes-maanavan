import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Lightbulb } from 'lucide-react';

interface ThemeCardProps {
  title: string;
  badge?: string; // "Core", "Example", "Prompt", "Advanced", etc.
  children: ReactNode;
  takeaway?: string; // Optional key takeaway text
}

export function ThemeCard({ title, badge, children, takeaway }: ThemeCardProps) {
  return (
    <Card className="mb-8 bg-gray-900 border-gray-800">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {badge && (
          <Badge variant="tag" className="text-xs bg-primary-600/20 text-primary-400 border-primary-600/30">
            {badge}
          </Badge>
        )}
      </div>

      {/* Card Body */}
      <div className="theme-card-content space-y-4">
        {children}
      </div>

      {/* Key Takeaway */}
      {takeaway && (
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-primary-400">
                Key Takeaway:
              </span>
              <span className="text-sm text-gray-300 ml-2">{takeaway}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
