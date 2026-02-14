import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ percentage, className, showLabel = true }: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Progress</span>
          <span className="text-gray-600">{clampedPercentage}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary-600 transition-all duration-300"
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
