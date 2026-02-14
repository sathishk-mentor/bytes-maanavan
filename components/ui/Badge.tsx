import { cn, getLevelColor } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'level' | 'tag' | 'default';
  level?: 'beginner' | 'intermediate' | 'advanced';
  className?: string;
}

export function Badge({ children, variant = 'default', level, className }: BadgeProps) {
  const getVariantClass = () => {
    if (variant === 'level' && level) {
      return getLevelColor(level);
    }

    if (variant === 'tag') {
      return 'bg-gray-100 text-gray-700';
    }

    return 'bg-blue-100 text-blue-800';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        getVariantClass(),
        className
      )}
    >
      {children}
    </span>
  );
}
