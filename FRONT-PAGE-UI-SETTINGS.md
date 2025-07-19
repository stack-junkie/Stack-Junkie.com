# Front Page UI Settings Reference

This document identifies all the front page UI elements, their settings, and where to modify them.

## Hero Section

### Purpose/Description: Main hero banner with title, subtitle, description, and call-to-action buttons
### Class: HeroSection
### File Name: src/components/HeroSection.astro
### Row #: 1-597

### Settings:
- **title**: Default "AI-powered development workflows" (Line 15)
- **subtitle**: Default "From electronics tech to full-stack developer" (Line 16)  
- **description**: Default "Follow my $1.00 Challenge journey..." (Line 17)
- **primaryCtaText**: Default "Start Reading" (Line 18)
- **primaryCtaLink**: Default "/blog" (Line 19)
- **secondaryCtaText**: Default "View Projects" (Line 20)
- **secondaryCtaLink**: Default "/projects" (Line 21)

### Visual Settings:
- **Hero height**: min-height: 0vh, padding: 4rem 0 6rem (Line 100)
- **Background gradient**: Linear gradient with teal (#71e9db) and black (Lines 104-107)
- **Title font size**: clamp(3rem, 5vw, 6rem) - Range: 3rem to 6rem (Line 207)
- **Title font weight**: 800 (Line 208)
- **Title line height**: 1.25 (Line 210)
- **Subtitle font size**: clamp(1.25rem, 2vw, 1.5rem) - Range: 1.25rem to 1.5rem (Line 227)
- **Description font size**: clamp(1rem, 1.5vw, 1.125rem) - Range: 1rem to 1.125rem (Line 246)
- **Primary button padding**: 1rem 2rem (Line 259)
- **Primary button background**: Teal gradient (Lines 264-265)
- **Secondary button padding**: 1rem 2rem (Line 295)
- **Particle count**: 40 particles (Line 550)
- **Particle animation duration**: 15-25 seconds (Line 553)

## Navigation Bar

### Purpose/Description: Sticky navigation with site title, menu links, and search
### Class: Navbar
### File Name: src/components/Navbar.astro
### Row #: 1-472

### Settings:
- **Site title**: "Stack-Junkie" (Line 8)
- **Navigation links**: Blog, Projects (Lines 11, 15)
- **Search placeholder**: "Search (Ctrl+K)" (Line 19)

### Visual Settings:
- **Background**: rgba(24, 24, 24, 0.8) with backdrop-filter blur (Lines 195-196)
- **Padding**: 1rem 2rem (Line 192)
- **Font size**: 1.25em (Line 209)
- **Link hover background**: var(--primary) (Line 256)
- **Search width**: 160px (Line 283)
- **Mobile breakpoint**: 640px (Line 351)

## Profile Card (Left Column)

### Purpose/Description: Profile picture, name, and quick info list
### Class: Card with flex-col-card
### File Name: src/pages/index.astro
### Row #: 34-49

### Settings:
- **Profile image**: ProfilePicture from "../assets/pfp.png" (Line 36)
- **Image size**: 80x80 pixels (Line 36)
- **Name**: {name} from spectre:globals (Line 37)
- **Quick info**: Loaded from quickInfo collection (Line 38-46)

### Data Source:
- **Quick info data**: src/content/info.json
- **Schema**: id (number), icon (lucide/simple-icons), text (string)

## Socials Card (Left Column)

### Purpose/Description: Social media links with icons
### Class: Card
### File Name: src/pages/index.astro
### Row #: 50-59

### Settings:
- **Title**: "Socials" (Line 51)
- **Links**: Loaded from socials collection (Line 52-58)

### Data Source:
- **Socials data**: src/content/socials.json
- **Schema**: id (number), icon (lucide/simple-icons), text (string), link (URL)

## About Me Card (Right Column)

### Purpose/Description: About section with user icon and content
### Class: Card
### File Name: src/pages/index.astro
### Row #: 61-70

### Settings:
- **Icon**: Lucide "user" icon, 24x24 (Line 64)
- **Title**: "About Me" (Line 65)
- **Content**: Loaded from about.mdx (Line 67)

### Data Source:
- **About content**: src/content/other/about.mdx

## Latest Posts Card (Right Column)

### Purpose/Description: Recent blog posts with titles and dates
### Class: Card
### File Name: src/pages/index.astro
### Row #: 71-86

### Settings:
- **Icon**: Lucide "rss" icon, 24x24 (Line 73)
- **Title**: "Latest Posts" (Line 74)
- **Post count**: 2 posts (slice(0, 2)) (Line 76)
- **Sort order**: Newest first (createdAt descending) (Line 76)

### Data Source:
- **Posts data**: src/content/posts/ collection
- **Schema**: title, description, createdAt, draft status

## Latest Projects Card (Right Column)

### Purpose/Description: Recent projects with titles and dates
### Class: Card
### File Name: src/pages/index.astro
### Row #: 87-105

### Settings:
- **Icon**: Lucide "folder-git" icon, 24x24 (Line 89)
- **Title**: "Latest Projects" (Line 90)
- **Project count**: 2 projects (slice(0, 2)) (Line 92)
- **Sort order**: Newest first (date descending) (Line 92)

### Data Source:
- **Projects data**: src/content/projects/ collection
- **Schema**: title, description, date

## Global Color Scheme

### Purpose/Description: Site-wide color variables and theming
### Class: CSS Variables
### File Name: src/styles/globals.css
### Row #: 1-7

### Settings:
- **Primary color**: #8c5cf5 (purple) (Line 2)
- **Primary RGB**: 140, 92, 245 (Line 4)
- **Primary light**: #a277ff (Line 6)
- **Primary lightest**: #c2a8fd (Line 7)

## Background Effects

### Purpose/Description: Animated background canvas elements
### Class: Background
### File Name: src/components/Background.astro
### Row #: 1-26

### Settings:
- **Canvas elements**: bg-canvas and overlay-canvas (Lines 5-6)
- **Z-index**: -1 (both canvases) (Lines 18, 22)
- **Position**: Fixed, full viewport (Lines 10-16)

### Script Source:
- **Background script**: src/scripts/page-background.ts (Line 8)

## Layout Grid

### Purpose/Description: Two-column layout structure for main content
### Class: LayoutGrid
### File Name: src/layouts/Layout.astro
### Row #: 106-110

### Settings:
- **Left slot**: Profile and socials cards (Line 107)
- **Right slot**: About, posts, and projects cards (Line 108)
- **Container**: max-width: 1200px, centered (from HeroSection styles)

## Responsive Breakpoints

### Mobile Phone: 480px and below
- **Hero title**: clamp(1.75rem, 10vw, 2.5rem) (HeroSection.astro, Line 515)
- **Button padding**: 0.875rem 1.5rem (Line 525)
- **Hero padding**: 3rem 0 4rem (Line 507)

### Mobile Tablet: 768px and below  
- **Hero title**: clamp(2rem, 8vw, 3rem) (HeroSection.astro, Line 477)
- **Container padding**: 0 1rem (Line 467)
- **Buttons**: Full width, stacked vertically (Lines 485-495)

### Desktop: 1024px and above
- **Grid**: Two columns with 4rem gap (HeroSection.astro, Line 175)
- **Hero padding**: 4rem 0 6rem (Line 100)

## Animation Settings

### Particles (Hero Section)
- **Count**: 40 particles (Line 550)
- **Size**: 1-3px random (Line 553-556)
- **Speed**: 15-25 second animation duration (Line 553)
- **Movement**: Upward drift with random horizontal positioning

### Hover Effects
- **Transition duration**: 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) (Navbar.astro, Line 249)
- **Button hover transform**: translateY(-1px) (HeroSection.astro, Line 268)
- **Glow effects**: drop-shadow(0 0 4px var(--primary)) (globals.css, Line 57)

## Typography

### Font Families
- **Hero title**: 'JetBrains Mono', monospace (HeroSection.astro, Line 205)
- **Body text**: 'Inter', sans-serif (HeroSection.astro, Line 260)
- **Import**: Google Fonts (Line 95)

### Font Weights
- **Hero title**: 800 (Line 208)
- **Buttons**: 600 (Line 260)
- **Subtitle**: 500 (Line 230)

---

## Footer

### Purpose/Description: Site footer with newsletter, navigation links, and copyright
### Class: site-footer
### File Name: src/components/Footer.astro
### Row #: 1-126

### Settings:
- **Main Content Padding**: 3rem 2rem (Line 49)
- **Grid Layout**: 3 columns (1fr 1fr 1fr) (Line 50)
- **Grid Gap**: 3rem (Line 52)
- **Bottom Section Padding**: 10rem 20rem (Line 102)
- **Bottom Border**: 100px solid border-top (Line 105)
- **Mobile Breakpoint**: 768px (Line 115)
- **Mobile Padding**: 2rem 1rem (Line 119)
- **Mobile Bottom Padding**: 1rem (Line 123)

### Structure:
1. **Newsletter Component** (Line 7)
2. **Main Content Grid** (Lines 9-31)
   - Site Info Section
   - Quick Links Section
   - Challenge Info Section
3. **Bottom Section** (Lines 34-38)
   - Copyright Text

### Visual Settings:
- **Background**: var(--color-surface) (Line 44)
- **Top Border**: 1px solid var(--color-border) (Line 45)
- **Text Color**: var(--color-text-muted) (Line 92, 112)
- **Link Hover**: var(--color-primary) (Line 96)
- **Bottom Background**: var(--color-surface-variant) (Line 102)

## Quick Edit Guide

To modify front page elements:

1. **Change hero text**: Edit lines 15-21 in `src/components/HeroSection.astro`
2. **Modify colors**: Edit CSS variables in `src/styles/globals.css` lines 2-7
3. **Update profile info**: Edit `src/content/info.json` and `src/content/socials.json`
4. **Change about content**: Edit `src/content/other/about.mdx`
5. **Adjust layout spacing**: Modify padding/margin values in respective component files
6. **Update responsive breakpoints**: Edit media queries in component style sections
