# Historical Timeline Web App - Claude Code Instructions

## Project Overview

Build a multi-granularity historical timeline web app (4000 BC to present) with three zoom levels:
- **1000-year granularity** (Millennia)
- **500-year granularity** (Half-centuries)
- **100-year granularity** (Centuries)

Each level is powered by MDX documents, allowing rich content, components, and cross-linking.

**Stack**: Next.js 14+ | Tailwind CSS | MDX | TypeScript | Vercel-ready

---

## Step-by-Step Instructions

### 1. Create the Next.js Project in Claude Code

In Claude Code, ask Claude to:

```
Create a new Next.js 14+ project with:
- TypeScript enabled
- Tailwind CSS
- App Router
- MDX support (contentlayer or next-mdx-remote)
- Git initialized
```

### 2. Project Structure

After creation, ask Claude to set up this folder structure:

```
timeline-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── api/
│   │   └── timeline/
│   │       └── [level]/
│   │           └── route.ts
│   └── timeline/
│       └── [level]/
│           └── [slug]/
│               └── page.tsx
├── content/
│   └── timeline/
│       ├── millennia/
│       │   ├── 4000-3000-bc.mdx
│       │   ├── 3000-2000-bc.mdx
│       │   ├── 2000-1000-bc.mdx
│       │   ├── 1000-0-bc-ad.mdx
│       │   ├── 0-1000-ad.mdx
│       │   ├── 1000-1500-ad.mdx
│       │   ├── 1500-1800-ad.mdx
│       │   └── 1800-2000-ad.mdx
│       ├── 500-year/
│       │   ├── 4000-3500-bc.mdx
│       │   ├── 3500-3000-bc.mdx
│       │   └── ... (40+ files)
│       └── centuries/
│           ├── 4000-bc.mdx
│           ├── 3900-bc.mdx
│           └── ... (400+ files)
├── lib/
│   ├── timeline.ts
│   └── mdx-utils.ts
├── components/
│   ├── TimelineExplorer.tsx
│   ├── TimelineCard.tsx
│   ├── PeriodDetail.tsx
│   ├── ZoomControls.tsx
│   └── MDXComponents.tsx
├── public/
│   └── images/
├── contentlayer.config.ts (if using contentlayer)
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 3. Core Files to Request

### **A. Library Functions** (`lib/timeline.ts`)

Ask Claude to create:

```typescript
// Get all periods at a specific zoom level
export async function getPeriodsByLevel(level: 'millennium' | '500-year' | 'century'): Promise<TimelinePeriod[]>

// Get a single period with full MDX content
export async function getPeriodBySlug(level: string, slug: string): Promise<TimelinePeriod & { content: string }>

// Type definitions
export interface TimelinePeriod {
  id: string
  slug: string
  startYear: number
  endYear: number
  endYearLabel: string // "BCE" or "CE"
  startYearLabel: string
  level: 'millennium' | '500-year' | 'century'
  title: string
  summary: string
  color: string
  importance: number
  era: string
  content?: string
}
```

### **B. Main Page Component** (`app/page.tsx`)

Request:
- Timeline explorer with zoom level buttons (1000yr, 500yr, 100yr)
- Horizontal scrollable container for timeline cards
- Click-to-expand modal/sidebar for full MDX content
- Smooth animations on zoom transitions
- Mobile responsive (stack vertically on small screens)

### **C. Timeline Card Component** (`components/TimelineCard.tsx`)

Request:
- Displays frontmatter data (title, summary, year range, color)
- Shows importance indicator
- Hover effects
- Click handler to load full period details

### **D. Period Detail Component** (`components/PeriodDetail.tsx`)

Request:
- Full MDX rendering with custom components
- Shows full content from MDX files
- Modal or slide-out sidebar UI
- Close button
- Related periods links (from MDX frontmatter)

### **E. API Route** (`app/api/timeline/[level]/route.ts`)

Request:
- GET endpoint that returns all periods for a zoom level
- Cache headers for performance
- Returns array of `TimelinePeriod[]` (without content)

---

## 4. MDX File Structure

### **Frontmatter Template** (YAML at top of each MDX)

```yaml
---
startYear: -4000
endYear: -3000
startYearLabel: "BCE"
endYearLabel: "BCE"
level: "millennium"
era: "Ancient World"
title: "4000–3000 BCE: Dawn of Civilization"
summary: "Rise of early cities, writing systems, and organized religion"
color: "#8B7355"
importance: 5
relatedPeriods:
  - slug: "3500-3000-bc"
    level: "500-year"
    title: "Mesopotamian Revolution"
---
```

### **MDX Content Example**

Each MDX file should contain:
- Rich markdown text
- Embedded React components (EventCard, Timeline, Gallery)
- External links to sources
- Images in `/public/images/`
- Cross-links to other periods

Example structure:
```mdx
---
[frontmatter above]
---

# 4000–3000 BCE: Dawn of Civilization

This thousand-year period marked the transition from nomadic societies...

## Key Events

- **3500 BCE**: Cuneiform writing invented in Mesopotamia
- **3100 BCE**: Egyptian hieroglyphics develop
- **3000 BCE**: Bronze Age begins

## Major Civilizations

### Mesopotamia
Text about Sumerian city-states...

### Egypt
Text about early Egyptian kingdoms...

## See Also

- [3500–3000 BCE Half-Century](#)
- [3500 BCE Century](#)
```

---

## 5. Sample Data to Request

Ask Claude to generate sample MDX files for key periods:

**Millennia** (8 files):
- 4000–3000 BCE
- 3000–2000 BCE
- 2000–1000 BCE
- 1000 BCE–1 CE
- 1–1000 CE
- 1000–1500 CE
- 1500–1800 CE
- 1800–2000 CE
- 2000–2026 CE

**500-year periods** (first 10):
- 4000–3500 BCE
- 3500–3000 BCE
- 3000–2500 BCE
- ... (40 total)

**100-year periods** (first 10):
- 4000 BCE
- 3900 BCE
- 3800 BCE
- ... (400 total)

---

## 6. UI/UX Features to Request

### **Timeline Explorer Features:**
- [ ] Zoom level buttons at the top (1000yr, 500yr, 100yr)
- [ ] Horizontal scrollable timeline
- [ ] Timeline cards with:
  - Color-coded left border (from `color` field)
  - Title + summary text
  - Year range with BCE/CE labels
  - Importance indicator (star rating or dot)
  - Hover effect (shadow, scale)
- [ ] Click-to-expand modal showing full MDX content
- [ ] Close modal with ESC key or close button
- [ ] Smooth transitions when changing zoom levels
- [ ] Mobile: Stack vertically, full-width cards

### **Visual Design (Minimalist Archaeological):**
- [ ] Clean serif font for history text (use Georgia or similar)
- [ ] Sans-serif for UI (Inter or similar)
- [ ] Muted earth tones: #8B7355, #D4A574, #654321, #F5E6D3
- [ ] High contrast for importance/era colors
- [ ] Subtle shadows and depth
- [ ] Generous whitespace
- [ ] Animations on card hover and modal open/close

### **Responsive Design:**
- Desktop: Horizontal scrollable timeline
- Tablet: Slightly compressed, still scrollable
- Mobile: Vertical stack, full-width cards, modal optimized

---

## 7. Deployment to Vercel

Once the project is complete:

1. **Push to GitHub** (Claude Code can help):
   ```bash
   git add .
   git commit -m "Initial timeline app"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to `vercel.com`
   - Click "New Project"
   - Select your GitHub repo
   - Deploy (takes ~1 min)

3. **Environment Variables** (if needed):
   - Add to Vercel project settings (usually none needed for this project)

---

## 8. Example Prompt for Claude Code

Use this as a starting point in Claude Code:

```
I want to build a historical timeline web app with the following features:

1. Next.js 14+ with TypeScript and Tailwind CSS
2. Three zoom levels: 1000-year, 500-year, 100-year
3. MDX-based content from 4000 BC to now
4. Timeline explorer page that:
   - Shows zoom buttons at top
   - Displays scrollable timeline cards
   - Cards show title, summary, year range, era color
   - Click to expand and see full MDX content
   - Modal/sidebar for detail view
   - Smooth animations on transitions
   - Responsive for mobile

5. File structure with:
   - /content/timeline/{millennia, 500-year, centuries}/
   - Each level has .mdx files with YAML frontmatter
   - Frontmatter includes: startYear, endYear, title, summary, color, importance, era, relatedPeriods
   - Full MDX content with history text

6. Components:
   - TimelineExplorer (main page)
   - TimelineCard (collapsed view)
   - PeriodDetail (expanded MDX view)
   - ZoomControls
   - Custom MDX components (EventCard, etc.)

7. API route to fetch periods by level

Please create the complete project structure, all necessary files, sample MDX data for the 8 major millennium periods, and styling with a clean, museum-like aesthetic.
```

---

## 9. Testing Locally

After Claude Code builds the project:

```bash
cd timeline-app
npm install
npm run dev
```

Then visit: `http://localhost:3000`

Test:
- [ ] Timeline loads with 1000-year cards
- [ ] Clicking cards opens modal with full content
- [ ] Zoom buttons switch between levels smoothly
- [ ] Responsive design works on mobile (use browser DevTools)
- [ ] All MDX content renders correctly
- [ ] Images load (if included)

---

## 10. Next Steps After Initial Build

### **Expand Content:**
- Fill in all 40 500-year periods
- Add 400+ century periods
- Add images to /public/images/
- Expand event descriptions

### **Add Features:**
- Search functionality (search by year, event, era)
- Filter by category (wars, technology, art, etc.)
- Breadcrumb navigation between zoom levels
- Social sharing
- Print timeline view
- Dark mode toggle

### **SEO & Performance:**
- Add meta tags for each period page
- Sitemap generation
- Image optimization
- MDX compilation caching

---

## 11. MDX File Naming Convention

Use this for consistency:

**Millennia**: `{startYear}-{endYear}-{bc-or-ad}.mdx`
- `4000-3000-bc.mdx`
- `1-1000-ad.mdx`
- `2000-2026-ad.mdx`

**500-year**: `{startYear}-{endYear}-{bc-or-ad}.mdx`
- `4000-3500-bc.mdx`
- `500-1000-ad.mdx`

**Centuries**: `{year}-{bc-or-ad}.mdx`
- `4000-bc.mdx`
- `1500-ad.mdx`
- `2000-ad.mdx`

---

## 12. Troubleshooting

| Issue | Solution |
|-------|----------|
| MDX files not loading | Check file path matches `/content/timeline/{level}/{slug}.mdx` |
| Zoom buttons don't change timeline | Ensure API route at `/api/timeline/[level]` returns correct data |
| Styles look wrong | Verify Tailwind CSS in `tailwind.config.ts` includes content path |
| Modal won't close | Check ESC key handler and close button onClick |
| Vercel deployment fails | Check `next.config.js` has MDX configuration |

---

## Ready?

Start Claude Code and paste the example prompt from **Step 8** to get started!

Good luck! 🚀
