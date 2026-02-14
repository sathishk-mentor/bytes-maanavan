import { Metadata } from 'next';
import { DocSection, DocItem } from '@/components/docs/DocumentationSections';
import { ShareButton } from '@/components/docs/ShareButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Website Documentation | MaanavaN Bytes',
  description: 'Learn about the different areas and technical components of the MaanavaN Bytes website',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Website Documentation
            </h1>
            <p className="text-xl text-gray-600">
              Understanding the MaanavaN Bytes website structure and technical areas
            </p>
          </div>
          <ShareButton />
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <li><a href="#pages" className="text-primary-600 hover:underline">Pages & Routes</a></li>
            <li><a href="#layout" className="text-primary-600 hover:underline">Layout Structure</a></li>
            <li><a href="#components" className="text-primary-600 hover:underline">Major Components</a></li>
            <li><a href="#interactive" className="text-primary-600 hover:underline">Interactive Elements</a></li>
            <li><a href="#content" className="text-primary-600 hover:underline">Content Types</a></li>
            <li><a href="#technical" className="text-primary-600 hover:underline">Technical Details</a></li>
          </ul>
        </nav>

        {/* Main content sections */}
        <div className="max-w-none">
          {/* Pages & Routes */}
          <DocSection id="pages" title="Pages & Routes">
            <DocItem
              name="Homepage"
              technicalName="/"
              description="Main landing page featuring hero section, category sidebar, popular bytes grid, learning tracks, reference hub, and examples. Uses a fixed left sidebar layout with responsive grid cards."
              location="app/page.tsx"
            />

            <DocItem
              name="Category Pages"
              technicalName="/category/[slug]"
              description="Dynamic pages for each of the 6 learning tracks (Generative AI, Prompt Engineering, AI Agents, API vs MCP, Cloud Basics, Data Engineering). Features category header with stats, search/filter controls, and byte grid."
              location="app/category/[slug]/page.tsx"
            />

            <DocItem
              name="Byte Detail Pages"
              technicalName="/bytes/[slug]"
              description="Individual lesson/byte content pages with breadcrumbs, title, accordion table of contents sidebar, MDX content, and previous/next navigation. Includes progress tracking."
              location="app/bytes/[slug]/page.tsx"
            />

            <DocItem
              name="Documentation Page"
              technicalName="/docs"
              description="This page - explains all website areas with their technical names and purposes. Includes share functionality and visual examples."
              location="app/docs/page.tsx"
            />
          </DocSection>

          {/* Layout Structure */}
          <DocSection id="layout" title="Layout Structure">
            <DocItem
              name="Header"
              technicalName="Header"
              description="Sticky top navigation bar with logo, menu links (GenAI, Cloud, Data Engineering, Docs, Examples, Reference, Live Classes), and CTA buttons. Responsive with hamburger menu on mobile."
              location="components/layout/Header.tsx"
              example={
                <div className="text-sm text-gray-600">
                  Logo: <span className="font-bold text-primary-600">MaanavaN</span><span className="font-bold text-gray-900">Bytes</span>
                </div>
              }
            />

            <DocItem
              name="Footer"
              technicalName="Footer"
              description="Bottom section with WhatsApp community CTA, 4-column grid (About, Quick Links, Resources, Connect), and copyright notice. Contains links to major categories and social media."
              location="components/layout/Footer.tsx"
            />

            <DocItem
              name="Breadcrumbs"
              technicalName="Breadcrumbs"
              description="Navigation trail showing page hierarchy. Always starts with 'Home', followed by category and/or page name. Used on category and byte detail pages."
              location="components/layout/Breadcrumbs.tsx"
              example={
                <div className="text-sm text-gray-600">
                  Home &gt; Generative AI
                </div>
              }
            />

            <DocItem
              name="Category Sidebar"
              technicalName="CategorySidebar"
              description="Fixed left sidebar (280px) on homepage with category navigation. Shows all 6 learning tracks with icons. Collapses to hamburger FAB button on mobile. Includes links to Examples and Reference sections."
              location="components/homepage/CategorySidebar.tsx"
            />

            <DocItem
              name="Accordion Table of Contents"
              technicalName="AccordionTableOfContents"
              description="Fixed left sidebar (300px) on byte detail pages with collapsible H2/H3 navigation. Features scroll-spy active highlighting, visited section tracking, and expandable/collapsible sections."
              location="components/bytes/AccordionTableOfContents.tsx"
            />
          </DocSection>

          {/* Major Components */}
          <DocSection id="components" title="Major Components">
            <DocItem
              name="Hero Section"
              technicalName="Hero"
              description="Large banner at top of homepage with gradient background, main heading 'Learn Generative AI in Bite-Size (Tanglish)', search input, and two CTA buttons."
              location="components/homepage/Hero.tsx"
            />

            <DocItem
              name="Byte Card with Image"
              technicalName="ByteCardWithImage"
              description="Modern card component with placeholder image (800x450px), difficulty level badge overlay, title, summary, duration, and up to 3 tags. Used in homepage grid."
              location="components/homepage/ByteCardWithImage.tsx"
              example={
                <div className="flex gap-2">
                  <Badge variant="level" level="beginner">Beginner</Badge>
                  <Badge variant="tag">genai</Badge>
                  <Badge variant="tag">basics</Badge>
                </div>
              }
            />

            <DocItem
              name="Track Grid"
              technicalName="TrackGrid"
              description="3-column responsive grid displaying all 6 learning categories with icons, titles, and descriptions. Each card links to its category page."
              location="components/homepage/TrackGrid.tsx"
            />

            <DocItem
              name="Category Header"
              technicalName="CategoryHeader"
              description="Large section at top of category pages with title, description, hero line, stats (total bytes and beginner count), and two CTA buttons."
              location="components/category/CategoryHeader.tsx"
            />

            <DocItem
              name="Byte Header"
              technicalName="ByteHeader"
              description="Header section on byte detail pages with breadcrumbs, large H1 title, and 'Join Live Class' button. Has responsive left margin to accommodate sidebar."
              location="components/bytes/ByteHeader.tsx"
            />

            <DocItem
              name="Byte Content"
              technicalName="ByteContent"
              description="MDX content renderer with custom components for headings (with IDs), Scenario callouts, Takeaways boxes, PromptBox templates, and Mistakes warnings."
              location="components/bytes/ByteContent.tsx"
            />

            <DocItem
              name="Previous/Next Navigation"
              technicalName="PrevNextNav"
              description="2-column grid at bottom of byte pages showing links to previous and next bytes in the learning sequence. Includes arrow icons and titles."
              location="components/bytes/PrevNextNav.tsx"
            />
          </DocSection>

          {/* Interactive Elements */}
          <DocSection id="interactive" title="Interactive Elements">
            <DocItem
              name="Search Bar"
              technicalName="SearchInput"
              description="Text input with magnifying glass icon for searching bytes. Used globally on homepage and category-specific on category pages. Searches titles, summaries, and tags."
              location="components/ui/SearchInput.tsx"
            />

            <DocItem
              name="Level Filter"
              technicalName="LevelFilter (dropdown)"
              description="Dropdown select for filtering bytes by difficulty level. Options: All Levels, Beginner, Intermediate, Advanced. Used on category pages."
            />

            <DocItem
              name="Sort Dropdown"
              technicalName="SortSelect (dropdown)"
              description="Dropdown select for sorting bytes. Options: Recommended (by order), Title (A-Z), Latest (by date). Used on category pages."
            />

            <DocItem
              name="Hamburger Menu Button"
              technicalName="FAB (Floating Action Button)"
              description="Fixed bottom-left circular button on mobile that opens category sidebar or accordion navigation. Includes Menu icon and smooth overlay transition."
              example={
                <div className="inline-block">
                  <Button variant="primary" size="sm" className="rounded-full">
                    Menu
                  </Button>
                </div>
              }
            />

            <DocItem
              name="Accordion Sections"
              technicalName="Accordion (H2/H3 navigation)"
              description="Expandable/collapsible sections in byte page sidebar. Clicking H2 title navigates to section, clicking chevron toggles subsections. Shows visited sections with checkmarks."
            />

            <DocItem
              name="Progress Tracking"
              technicalName="Progress (checkboxes/indicators)"
              description="Mark as completed checkbox on byte pages. Tracks visited sections with green checkmarks. Stores progress in LocalStorage."
            />

            <DocItem
              name="Share Button"
              technicalName="ShareButton"
              description="Button for sharing documentation page. Uses native Web Share API on mobile (share to WhatsApp, email, etc.) and copy-to-clipboard fallback on desktop. Shows 'Copied!' feedback."
              location="components/docs/ShareButton.tsx"
              example={
                <ShareButton />
              }
            />
          </DocSection>

          {/* Content Types */}
          <DocSection id="content" title="Content Types">
            <DocItem
              name="Learning Bytes"
              technicalName="Byte (MDX files)"
              description="Individual lessons stored as MDX files with frontmatter metadata (title, slug, summary, category, tags, level, duration, updatedAt, order, isPopular). Content includes markdown with custom components."
              location="content/bytes/[category]/[order]-[slug].mdx"
            />

            <DocItem
              name="Categories"
              technicalName="Category (6 learning tracks)"
              description="Six main learning tracks: Generative AI (Sparkles, blue), Prompt Engineering (MessageSquare, purple), AI Agents (Bot, green), API vs MCP (Cable, orange), Cloud Basics (Cloud, cyan), Data Engineering (Database, red)."
              location="lib/categories.ts"
            />

            <DocItem
              name="MDX Components"
              technicalName="Custom MDX Components"
              description="Special components for use in byte content: Scenario (real-world use cases), Takeaways (key points), PromptBox (copyable prompts), Mistakes (common pitfalls)."
              location="components/bytes/mdx/"
            />
          </DocSection>

          {/* Technical Details */}
          <DocSection id="technical" title="Technical Details">
            <DocItem
              name="Tech Stack"
              technicalName="Next.js 14 + TypeScript + Tailwind + MDX"
              description="Built with Next.js 14 App Router, TypeScript for type safety, Tailwind CSS for styling, MDX for content with JSX components, and Lucide React for icons."
            />

            <DocItem
              name="Color System"
              technicalName="Primary & Accent Colors"
              description="Primary (blue): primary-50 to primary-700. Accent (orange): accent-50 to accent-700. Semantic colors for levels: green (beginner), blue (intermediate), red (advanced)."
              example={
                <div className="flex gap-2 flex-wrap">
                  <div className="px-3 py-1 bg-primary-600 text-white rounded text-sm">Primary</div>
                  <div className="px-3 py-1 bg-accent-600 text-white rounded text-sm">Accent</div>
                  <div className="px-3 py-1 bg-green-600 text-white rounded text-sm">Beginner</div>
                  <div className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Intermediate</div>
                  <div className="px-3 py-1 bg-red-600 text-white rounded text-sm">Advanced</div>
                </div>
              }
            />

            <DocItem
              name="Responsive Breakpoints"
              technicalName="Tailwind Breakpoints"
              description="Mobile (default), Tablet (sm: 640px, md: 768px), Desktop (lg: 1024px). Sidebar shows on lg+, hamburger on mobile. Grids adjust from 1→2→3 columns."
            />

            <DocItem
              name="Storage"
              technicalName="LocalStorage (bytes_progress)"
              description="Client-side progress tracking using LocalStorage. Stores completed bytes, last updated timestamp, and category-specific progress. Key: 'bytes_progress'."
            />

            <DocItem
              name="Static Generation"
              technicalName="SSG (Static Site Generation)"
              description="All pages pre-rendered at build time using generateStaticParams. No backend API calls. Optimized for deployment to Vercel, Netlify, or GitHub Pages."
            />
          </DocSection>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p className="mb-4">
            Need help understanding a specific area?
            <a href="/#" className="text-primary-600 hover:underline ml-1">Contact us</a>
          </p>
          <p className="text-sm">
            This documentation is part of the MaanavaN Bytes learning platform.
          </p>
        </div>
      </div>
    </div>
  );
}
