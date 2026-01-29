

# TranscriptFlow - Premium YouTube Transcript Extractor

## Overview
A beautifully designed, modern web app for extracting YouTube transcripts with real functionality, premium UI animations, and Stripe-powered subscriptions.

---

## Design System

### Visual Identity
- **Theme:** Dark mode default with deep backgrounds (#0a0a0f, #0f0f1a)
- **Accent Colors:** Vibrant multi-color gradient (purple → blue → teal → cyan)
- **Effects:** Glassmorphism cards with backdrop blur, subtle glow effects
- **Typography:** Inter/Plus Jakarta Sans for headings, system sans-serif for body, JetBrains Mono for transcripts
- **Corners:** 16px rounded corners for cards, pill-shaped buttons
- **Animations:** Smooth micro-interactions, hover effects, page transitions

---

## Pages & Features

### 1. Home Page (/)
**Hero Section:**
- Animated gradient background with floating/morphing blob shapes
- Bold headline with gradient text effect
- Subtitle explaining the value proposition
- Main URL input area with drag-and-drop support

**Extraction Interface:**
- Large URL input with paste detection & validation feedback (green checkmark)
- "Extract Transcript" button with loading state
- Video preview card showing: thumbnail, title, channel, duration, word count
- Transcript viewer with toggle: Plain Text / Timestamped
- Search within transcript with highlighted matches
- Export buttons: TXT, SRT, JSON (with tier restrictions shown)

**Channel Extraction Panel:**
- Expandable section for channel URLs
- Video limit slider (10-500)
- Output format toggle (combined vs individual)
- Real-time progress UI with animated progress bar, glow effect
- Results grid with batch download

**Features Showcase:**
- Animated feature cards with icons
- AI features placeholder section (future expansion)

### 2. Pricing Page (/pricing)
- Three-tier pricing table with glassmorphism cards
- Free / Pro ($9.99) / Business ($29.99)
- Feature comparison with checkmarks
- "Popular" badge on Pro tier with glow effect
- Stripe checkout integration for paid tiers
- Current plan indicator for returning users

### 3. Static Pages
- **/terms** - Terms of Service
- **/privacy** - Privacy Policy
- Clean, readable layout with proper typography

---

## UI Components to Build

### Core Components
- **AnimatedBackground:** Floating gradient blobs/shapes
- **GlassCard:** Glassmorphism container with blur and border
- **GradientButton:** Primary action button with hover glow
- **URLInput:** Input with paste detection, validation, drag-drop
- **VideoPreview:** Thumbnail + metadata card
- **TranscriptViewer:** Two-mode display with search
- **ProgressCard:** Animated progress bar with real-time updates
- **ExportButtons:** TXT/SRT/JSON with format icons

### Navigation
- Responsive header with logo, nav links, theme toggle
- Mobile hamburger menu with slide-out drawer
- Smooth theme transition animation

### Feedback
- Toast notifications (success/error/info)
- Loading spinners and skeleton states
- Empty states with illustrations
- Confetti animation on first extraction

---

## Backend Integration

### Supabase Edge Functions
1. **extract-transcript:** Single video extraction using unofficial YouTube transcript method
2. **extract-channel:** Batch extraction from channel URLs with progress updates
3. **stripe-webhook:** Handle Stripe subscription events
4. **create-checkout:** Create Stripe checkout sessions

### Stripe Integration
- Products for Pro and Business tiers
- Monthly subscription billing
- Customer portal for managing subscriptions
- Webhook handling for subscription status

### Database (Supabase)
- **subscriptions:** Track user subscription status (linked to Stripe)
- **usage_tracking:** Daily extraction counts for tier limits

---

## Animations & Effects

- Page fade-in transitions
- Button hover: subtle scale + glow shift
- Progress bar: smooth fill with animated gradient glow
- Card hover: lift effect with shadow
- Toast: slide-in from top
- Skeleton: pulse animation
- Success: checkmark animation + optional confetti
- Theme toggle: smooth color transition
- Floating blobs: slow morphing/floating movement

---

## Technical Approach

1. **Start with design system:** Set up colors, typography, animation utilities in Tailwind
2. **Build reusable components:** GlassCard, buttons, inputs with animations
3. **Create home page:** Hero, extraction UI with mock data first
4. **Connect real extraction:** Edge function for YouTube transcripts
5. **Add pricing page:** Stripe integration for subscriptions
6. **Polish:** Add all micro-animations, loading states, empty states
7. **Add static pages:** Terms, Privacy with clean layouts

---

## What's Included
✅ Premium dark UI with multi-color gradients
✅ Glassmorphism design with animations
✅ Single video transcript extraction (real)
✅ Channel batch extraction (real)
✅ Export to TXT, SRT, JSON
✅ Stripe subscription payments
✅ Responsive design
✅ Theme toggle (dark/light)

## Deferred for Later
⏸️ User authentication
⏸️ Transcript library & favorites
⏸️ Extraction history
⏸️ User settings page
⏸️ API access for Business tier

