import { ReactNode } from 'react';
import { Card } from '@/components/ui/Card';
import { BookOpenCheck, Lightbulb } from 'lucide-react';

interface ThemeCardProps {
  title: string;
  badge?: string; // "Core", "Example", "Prompt", "Advanced", etc.
  children: ReactNode;
  takeaway?: string; // Optional key takeaway text
}

export function ThemeCard({ title, badge, children, takeaway }: ThemeCardProps) {
  return (
    <Card className="byte-theme-card">
      <div className="byte-theme-heading">
        <span className="byte-theme-icon" aria-hidden="true"><BookOpenCheck /></span>
        <div>
          <span className="byte-card-label">{badge || 'CONCEPT EXPLAINER'}</span>
          <h2>{title}</h2>
        </div>
      </div>

      <div className="theme-card-content">
        {children}
      </div>

      {takeaway && (
        <div className="byte-card-takeaway">
          <div className="flex items-start gap-2">
            <Lightbulb className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-primary-600">
                Key Takeaway:
              </span>
              <span className="text-sm text-gray-700 ml-2">{takeaway}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
