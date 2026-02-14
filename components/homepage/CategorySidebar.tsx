'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, MessageSquare, Bot, Cable, Cloud, Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/types';

interface CategorySidebarProps {
  categories: Category[];
  currentCategory?: string;
}

const iconMap = {
  Sparkles,
  MessageSquare,
  Bot,
  Cable,
  Cloud,
  Database,
};

export function CategorySidebar({ categories, currentCategory }: CategorySidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 bottom-4 z-50 lg:hidden bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Open categories menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed left-0 top-16 bottom-0 w-[280px] bg-white border-r border-gray-200 shadow-lg overflow-y-auto z-30 transition-transform duration-300",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close categories menu"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="py-6 px-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4 px-2">
            Learning Tracks
          </h2>

          <div className="space-y-1">
            {categories.map((category) => {
              const Icon = iconMap[category.icon as keyof typeof iconMap] || Sparkles;
              const isActive = currentCategory === category.slug;

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-primary-50 text-primary-700 font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center",
                    isActive ? "bg-primary-100" : "bg-gray-100"
                  )}>
                    <Icon className={cn(
                      "w-4 h-4",
                      isActive ? "text-primary-600" : "text-gray-600"
                    )} />
                  </div>
                  <span className="flex-1 text-sm">{category.title}</span>
                </Link>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200" />

          {/* Additional Links */}
          <div className="space-y-1">
            <Link
              href="/#examples"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-sm">Examples</span>
            </Link>
            <Link
              href="/#reference"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <span className="text-sm">Reference</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
