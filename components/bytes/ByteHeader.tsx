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
    <div className="border-b border-gray-200 bg-white pb-6">
      <div className="container-custom pt-8">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          {byte.title}
        </h1>

        {/* CTA Button */}
        <div className="mt-6">
          <Button variant="secondary" href="#live-class">
            Join Live Class
          </Button>
        </div>
      </div>
    </div>
  );
}
