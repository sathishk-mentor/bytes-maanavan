# MaanavaN Bytes

Learn Generative AI, Cloud, and Data Engineering in bite-sized Tanglish content.

## 🚀 Features

- **Homepage** with hero search, track grid, popular bytes showcase
- **Category Pages** with filtering, sorting, and search
- **Byte Detail Pages** with MDX rendering and custom components
- **Progress Tracking** via LocalStorage (no backend needed)
- **Static Export** ready for Vercel, Netlify, or GitHub Pages
- **Responsive Design** - works on mobile, tablet, and desktop
- **SEO Optimized** with proper metadata and OpenGraph tags

## 📁 Project Structure

```
Code_Cloude/
├── app/
│   ├── layout.tsx              # Root layout with Header/Footer
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   ├── category/[slug]/        # Category pages
│   └── bytes/[slug]/           # Byte detail pages
├── components/
│   ├── layout/                 # Header, Footer, Breadcrumbs
│   ├── homepage/               # Hero, TrackGrid, PopularBytes, etc.
│   ├── category/               # Category page components
│   ├── bytes/                  # Byte detail components
│   │   └── mdx/                # Custom MDX components
│   └── ui/                     # Reusable UI primitives
├── lib/
│   ├── mdx.ts                  # MDX content processing
│   ├── categories.ts           # Category definitions
│   ├── types.ts                # TypeScript interfaces
│   ├── progress.ts             # LocalStorage progress tracking
│   ├── search.ts               # Client-side search/filter
│   └── utils.ts                # Utility functions
├── content/bytes/              # MDX content files
└── public/                     # Static assets
```

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** (next-mdx-remote)
- **Lucide React** (icons)

## 📝 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

## 📚 Creating Content

Before creating or revising any handbook, follow the mandatory [Handbook Development Standard](docs/handbook-development-standard.md) and begin with [the Byte template](docs/byte-template.mdx). Uploaded Markdown is source material and must be reworked to that standard before review.

### Add a New Byte

1. Create a new `.mdx` file in `content/bytes/[category]/`

2. Add frontmatter:
```mdx
---
title: "Your Byte Title"
slug: "your-byte-slug"
summary: "Brief summary of the byte"
category: "prompt-engineering"
tags: ["tag1", "tag2"]
level: "beginner"
duration: "10 min"
updatedAt: "2024-01-15"
order: 1
isPopular: true
---
```

3. Write your content using Markdown and custom MDX components

### Custom MDX Components

Available components for rich content:

#### Scenario
```mdx
<Scenario title="Real-world use case">
Your scenario content here...
</Scenario>
```

#### Takeaways
```mdx
<Takeaways>
- Key point 1
- Key point 2
- Key point 3
</Takeaways>
```

#### PromptBox (with copy button)
```mdx
<PromptBox>
Your copyable prompt template here...
</PromptBox>
```

#### Mistakes
```mdx
<Mistakes>
- Common mistake 1
- Common mistake 2
</Mistakes>
```

## 🎨 Customization

### Add a New Category

Edit `lib/categories.ts`:

```typescript
{
  slug: 'your-category',
  title: 'Your Category',
  description: 'Category description',
  icon: 'Sparkles', // Lucide icon name
  color: 'blue',
  order: 7,
}
```

### Modify Colors

Edit `tailwind.config.ts` to change primary, accent, or other colors.

### Update Header Links

Edit `components/layout/Header.tsx` to modify navigation.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy (auto-detects Next.js)

### Netlify

1. Build command: `npm run build`
2. Publish directory: `out`

### GitHub Pages

1. Build: `npm run build`
2. Push `out/` folder to `gh-pages` branch

## 📊 Progress Tracking

Progress is stored in browser's LocalStorage with key `bytes_progress`.

Structure:
```json
{
  "completedBytes": ["byte-slug-1", "byte-slug-2"],
  "lastUpdated": "2024-01-15T10:30:00Z",
  "categoryProgress": {...}
}
```

## 🔍 Search & Filtering

- **Homepage search**: Searches across all bytes
- **Category search**: Filters bytes within category
- **Level filter**: beginner / intermediate / advanced
- **Sort options**: Recommended (order) / Title (A-Z) / Latest

All filtering happens client-side (no API calls needed).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your content or features
4. Submit a pull request

## 📄 License

MIT License - feel free to use for your own learning portal!

## 🙏 Credits

- Inspired by [Programiz.com](https://programiz.com)
- Built with [Next.js](https://nextjs.org)
- Icons by [Lucide](https://lucide.dev)

---

Made with ❤️ for the Tanglish learning community
