'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, X, Menu, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { isByteComplete } from '@/lib/progress';

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

interface AccordionTableOfContentsProps {
  headings: Heading[];
  byteSlug: string;
}

export function AccordionTableOfContents({ headings, byteSlug }: AccordionTableOfContentsProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set());

  // Check if byte is marked as complete
  useEffect(() => {
    setIsComplete(isByteComplete(byteSlug));
  }, [byteSlug]);

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
            // Mark section as visited
            setVisitedSections(prev => new Set(prev).add(entry.target.id));
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
      // Close mobile sidebar after navigation
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed left-4 bottom-4 z-50 lg:hidden bg-primary-600 text-white p-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Open table of contents"
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
          "fixed left-0 top-16 bottom-0 w-[300px] bg-white border-r border-gray-200 shadow-lg overflow-y-auto accordion-sidebar z-30 transition-transform duration-300",
          "lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 lg:hidden text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close table of contents"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="py-4">
          {sections.map((section, index) => {
            const isExpanded = expandedSections.includes(section.id);
            const sectionVisited = visitedSections.has(section.id);

            return (
              <div key={section.id} className="border-b border-gray-100">
                {/* H2 Section */}
                <div className="flex items-center group">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "flex-1 flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-all duration-200 text-left",
                      activeId === section.id ? "text-primary-600 bg-primary-50" : "text-gray-900"
                    )}
                  >
                    <span className="flex-1">{section.title}</span>
                    {sectionVisited && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 opacity-60" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "px-3 py-3 hover:bg-gray-100 transition-colors border-l border-gray-100",
                      activeId === section.id && "bg-primary-50"
                    )}
                    aria-label={isExpanded ? "Collapse section" : "Expand section"}
                  >
                    <ChevronRight
                      className={cn(
                        "w-3.5 h-3.5 text-gray-400 transition-transform duration-200",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>
                </div>

                {/* H3 Subsections */}
                {isExpanded && section.subsections.length > 0 && (
                  <div className="bg-gray-50/30">
                    {section.subsections.map(sub => {
                      const subVisited = visitedSections.has(sub.id);

                      return (
                        <button
                          key={sub.id}
                          onClick={() => scrollToSection(sub.id)}
                          className={cn(
                            "w-full text-left px-4 py-2 pl-8 text-xs hover:bg-gray-100 transition-all duration-200 flex items-center justify-between group",
                            activeId === sub.id
                              ? "border-l-2 border-primary-600 bg-primary-50 text-primary-700 font-medium"
                              : "text-gray-600 border-l-2 border-transparent"
                          )}
                        >
                          <span>{sub.text}</span>
                          {subVisited && (
                            <CheckCircle2 className="w-3 h-3 text-green-600 opacity-50 group-hover:opacity-100" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
