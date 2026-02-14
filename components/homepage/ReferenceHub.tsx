import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { FileText, Lightbulb, BookOpen, CheckSquare } from 'lucide-react';

const references = [
  {
    title: 'Prompt Templates',
    description: 'Ready-to-use prompt templates for common tasks',
    icon: FileText,
    href: '#reference/prompt-templates',
  },
  {
    title: 'Prompt Patterns',
    description: 'Learn proven patterns for better AI interactions',
    icon: Lightbulb,
    href: '#reference/prompt-patterns',
  },
  {
    title: 'GenAI Glossary',
    description: 'Essential GenAI terms explained in Tanglish',
    icon: BookOpen,
    href: '#reference/glossary',
  },
  {
    title: 'Checklists',
    description: 'Step-by-step guides for AI workflows',
    icon: CheckSquare,
    href: '#reference/checklists',
  },
];

export function ReferenceHub() {
  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900">Reference Hub</h2>
        <p className="mt-3 text-lg text-gray-600">
          Quick access to templates, patterns, and resources
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {references.map((ref) => {
            const Icon = ref.icon;

            return (
              <Link key={ref.href} href={ref.href}>
                <Card hover className="h-full text-center">
                  <div className="inline-flex rounded-lg bg-primary-50 p-3">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {ref.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {ref.description}
                  </p>

                  <p className="mt-4 text-sm font-medium text-primary-600">
                    Explore →
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
