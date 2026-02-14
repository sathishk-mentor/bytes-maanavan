import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link href="/" className="text-gray-400 hover:text-primary-400 transition-colors">
        Home
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="h-4 w-4 text-gray-600" />
          {index === items.length - 1 ? (
            <span className="font-medium text-gray-300">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-400 hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
