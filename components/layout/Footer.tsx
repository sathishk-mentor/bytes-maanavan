import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      {/* WhatsApp CTA Section */}
      <div className="border-b border-gray-200 bg-accent-50 py-12">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Join Our WhatsApp Community
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Get daily bytes, live class updates, and connect with fellow learners
          </p>
          <Button variant="secondary" size="lg" className="mt-6" href="https://chat.whatsapp.com/invite">
            Join WhatsApp Community
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-gray-900">MaanavaN Bytes</h3>
            <p className="mt-3 text-sm text-gray-600">
              Learn Generative AI, Cloud, and Data Engineering in bite-sized Tanglish content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/generative-ai" className="text-sm text-gray-600 hover:text-primary-600">
                  Generative AI
                </Link>
              </li>
              <li>
                <Link href="/category/prompt-engineering" className="text-sm text-gray-600 hover:text-primary-600">
                  Prompt Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900">Resources</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="#reference" className="text-sm text-gray-600 hover:text-primary-600">
                  Prompt Templates
                </Link>
              </li>
              <li>
                <Link href="#reference" className="text-sm text-gray-600 hover:text-primary-600">
                  GenAI Glossary
                </Link>
              </li>
              <li>
                <Link href="#examples" className="text-sm text-gray-600 hover:text-primary-600">
                  Examples
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900">Connect</h4>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="https://chat.whatsapp.com/invite" className="text-sm text-gray-600 hover:text-primary-600">
                  WhatsApp Community
                </a>
              </li>
              <li>
                <a href="#full-course" className="text-sm text-gray-600 hover:text-primary-600">
                  Full Course
                </a>
              </li>
              <li>
                <a href="#live-classes" className="text-sm text-gray-600 hover:text-primary-600">
                  Live Classes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} MaanavaN Bytes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
