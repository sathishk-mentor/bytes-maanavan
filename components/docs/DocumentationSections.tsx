import { ReactNode } from 'react';

interface DocSectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function DocSection({ id, title, children }: DocSectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-primary-600 pb-2">
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

interface DocItemProps {
  name: string;
  technicalName: string;
  description: string;
  location?: string;
  example?: ReactNode;
}

export function DocItem({ name, technicalName, description, location, example }: DocItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <code className="text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded mt-1 inline-block">
            {technicalName}
          </code>
        </div>
      </div>

      <p className="text-gray-600 mb-3">{description}</p>

      {location && (
        <p className="text-sm text-gray-500 mb-3">
          <strong>Location:</strong> <code className="bg-gray-200 px-2 py-0.5 rounded">{location}</code>
        </p>
      )}

      {example && (
        <div className="mt-4 p-4 bg-white border border-gray-200 rounded">
          <p className="text-sm text-gray-500 mb-2 font-medium">Visual Example:</p>
          {example}
        </div>
      )}
    </div>
  );
}
