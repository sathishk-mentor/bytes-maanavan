import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ByteMetadata } from '@/lib/types';

interface ByteCardWithImageProps {
  byte: ByteMetadata;
  imageSrc?: string;
}

export function ByteCardWithImage({ byte, imageSrc }: ByteCardWithImageProps) {
  // Use placeholder service for now - can be replaced with real images later
  const placeholderImage = imageSrc || `https://placehold.co/800x450/0ea5e9/ffffff?text=${encodeURIComponent(byte.title.substring(0, 20))}`;

  return (
    <Link href={`/${byte.category}/${byte.slug}`} className="block h-full">
      <Card hover className="h-full overflow-hidden p-0">
        {/* Image Section */}
        <div className="relative h-48 w-full">
          <Image
            src={placeholderImage}
            alt={byte.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
          <Badge
            variant="level"
            level={byte.level}
            className="absolute top-3 left-3 shadow-sm"
          >
            {byte.level}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[56px]">
            {byte.title}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {byte.summary}
          </p>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {byte.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {byte.level}
            </span>
          </div>

          {/* Tags */}
          {byte.tags && byte.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {byte.tags.slice(0, 3).map(tag => (
                <Badge key={tag} variant="tag" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
