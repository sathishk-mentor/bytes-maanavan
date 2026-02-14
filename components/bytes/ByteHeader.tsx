import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, Calendar } from 'lucide-react';
import { ByteMetadata } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface ByteHeaderProps {
  byte: ByteMetadata;
}

export function ByteHeader({ byte }: ByteHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white pb-8">
      <div className="container-custom pt-8">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          {byte.title}
        </h1>

        {/* Meta Information */}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <Badge variant="level" level={byte.level}>
            {byte.level}
          </Badge>

          <div className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4" />
            {byte.duration}
          </div>

          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            Updated {formatDate(byte.updatedAt)}
          </div>

          <div className="flex flex-wrap gap-2">
            {byte.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" href="#full-course">
            Join Full Course
          </Button>
          <Button variant="secondary" href="#live-class">
            Join Live Class
          </Button>
        </div>
      </div>
    </div>
  );
}
