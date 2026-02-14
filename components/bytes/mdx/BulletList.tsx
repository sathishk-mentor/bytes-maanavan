import { Check } from 'lucide-react';

interface BulletListProps {
  items: string[];
  variant?: 'check' | 'dot'; // Checkmarks or dots
}

export function BulletList({ items, variant = 'check' }: BulletListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          {variant === 'check' ? (
            <Check className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0 mt-2" />
          )}
          <span className="text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}
