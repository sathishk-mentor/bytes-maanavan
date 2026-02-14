'use client';

import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

interface AccordionSection {
  id: string;
  title: string;
  subsections: Heading[];
}

export function AccordionTableOfContents({ headings }: { headings: Heading[] }) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Group H3s under their parent H2
  const sections: AccordionSection[] = [];
  let currentSection: AccordionSection | null = null;

  headings.forEach(heading => {
    if (heading.level === 2) {
      currentSection = { id: heading.id, title: heading.text, subsections: [] };
      sections.push(currentSection);
    } else if (heading.level === 3 && currentSection) {
      currentSection.subsections.push(heading);
    }
  });

  // Default: expand all sections on mount
  useEffect(() => {
    const allH2Ids = sections.map(s => s.id);
    setExpandedSections(allH2Ids);
  }, []);

  // Intersection Observer for scroll-spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="fixed left-0 top-16 bottom-0 w-[300px] bg-white border-r border-gray-200 shadow-sm overflow-y-auto accordion-sidebar">
      <div className="py-6">
        <div className="px-5 pb-3 border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Contents
          </h2>
        </div>

        {sections.map(section => {
          const isExpanded = expandedSections.includes(section.id);

          return (
            <div key={section.id} className="border-b border-gray-100">
              {/* H2 Section Toggle */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 text-sm text-gray-900 font-medium hover:bg-gray-50 transition-all duration-200"
              >
                <span>{section.title}</span>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 text-gray-400 transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )}
                />
              </button>

              {/* H3 Subsections */}
              {isExpanded && section.subsections.length > 0 && (
                <div className="bg-gray-50/50">
                  {section.subsections.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className={cn(
                        "w-full text-left px-5 py-2 pl-14 text-xs text-gray-600 hover:bg-gray-50 transition-all duration-200",
                        activeId === sub.id && "border-l-[3px] border-primary-600 bg-primary-50 text-primary-600 font-medium"
                      )}
                    >
                      {sub.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
