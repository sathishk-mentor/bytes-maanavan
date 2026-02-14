import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Byte Not Found</p>
        <p className="mt-2 text-gray-500">
          The byte you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
