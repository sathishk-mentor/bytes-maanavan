import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Clock, Calendar } from 'lucide-react';
import { ByteMetadata } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface ByteHeaderProps {
  byte: ByteMetadata;
  breadcrumbItems?: BreadcrumbItem[];
}

export function ByteHeader({ byte, breadcrumbItems }: ByteHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white pb-6 ml-0 lg:ml-[300px]">
      <div className="container-custom pt-8">
        {/* Breadcrumbs */}
        {breadcrumbItems && <Breadcrumbs items={breadcrumbItems} />}

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl mt-4">
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
