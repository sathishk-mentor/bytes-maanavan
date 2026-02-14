import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Code2, Mail, FileText, MessageSquare, Image, Briefcase } from 'lucide-react';

const examples = [
  {
    title: 'Code Generation',
    description: 'Copy-paste prompts for generating clean code',
    icon: Code2,
    href: '#examples/code-generation',
  },
  {
    title: 'Email Writing',
    description: 'Professional email templates and prompts',
    icon: Mail,
    href: '#examples/email-writing',
  },
  {
    title: 'Content Creation',
    description: 'Blog posts, social media, and marketing copy',
    icon: FileText,
    href: '#examples/content-creation',
  },
  {
    title: 'Chat & Support',
    description: 'Customer support and chatbot prompts',
    icon: MessageSquare,
    href: '#examples/chat-support',
  },
  {
    title: 'Image Prompts',
    description: 'Midjourney, DALL-E, and Stable Diffusion prompts',
    icon: Image,
    href: '#examples/image-prompts',
  },
  {
    title: 'Business Tasks',
    description: 'Reports, presentations, and analysis',
    icon: Briefcase,
    href: '#examples/business-tasks',
  },
];

export function PopularExamples() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900">Popular Examples</h2>
        <p className="mt-3 text-lg text-gray-600">
          Copy-ready prompts for your daily AI workflows
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => {
            const Icon = example.icon;

            return (
              <Link key={example.href} href={example.href}>
                <Card hover className="h-full">
                  <div className="inline-flex rounded-lg bg-accent-50 p-3">
                    <Icon className="h-6 w-6 text-accent-600" />
                  </div>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {example.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    {example.description}
                  </p>

                  <p className="mt-4 text-sm font-medium text-accent-600">
                    View Examples →
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
