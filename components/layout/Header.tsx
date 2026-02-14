import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  const navLinks = [
    { href: '/category/generative-ai', label: 'GenAI' },
    { href: '/category/cloud-basics', label: 'Cloud' },
    { href: '/category/data-engineering', label: 'Data Engineering' },
    { href: '/docs', label: 'Docs' },
    { href: '#examples', label: 'Examples' },
    { href: '#reference', label: 'Reference' },
    { href: '#live-classes', label: 'Live Classes' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">MaanavaN</span>
            <span className="text-2xl font-bold text-gray-900">Bytes</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="primary" size="sm" href="#start-genai">
              Start GenAI Foundations
            </Button>
            <Button variant="secondary" size="sm" href="https://chat.whatsapp.com/invite">
              Join WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
