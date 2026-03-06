# buidl.lol Design Kit
## Agent Hackathon Platform

**Version:** 1.0  
**Last Updated:** March 2026

---

## 1. Brand Overview

### Mission
Open-source infrastructure for running AI-powered hackathons.

### Brand Personality
- **Builder-first** — Tools that get out of the way
- **Technical but approachable** — Complex under the hood, simple on the surface
- **Energetic** — Hackathon energy, creation vibes
- **Community-driven** — Open source, transparent, collaborative

### Voice & Tone
- Direct and clear (no fluff)
- Encouraging but not condescending
- Technical when needed, plain when possible
- Slightly playful — we're building cool stuff

---

## 2. Logo & Wordmark

### Primary Logo
**buidl.lol** — lowercase, monospace font
- Use `JetBrains Mono Bold` or `Space Mono Bold`
- The `.lol` adds personality — keep it

### Logo Variations
1. **Full wordmark:** `buidl.lol`
2. **Short mark:** `buidl`
3. **Icon:** Construction helmet emoji 🏗️ or custom builder icon

### Clear Space
Maintain minimum clear space equal to the height of the "b" character around the logo.

### Don'ts
- Don't stretch or distort
- Don't use gradients on the wordmark
- Don't change the font
- Don't add drop shadows

---

## 3. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Builder Gold** | `#FFD700` | 255, 215, 0 | Primary CTA, highlights, awards |
| **Deep Navy** | `#0F0F1A` | 15, 15, 26 | Primary background (dark mode) |
| **Terminal Green** | `#00FF88` | 0, 255, 136 | Agent activity, success states |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Electric Blue** | `#3B82F6` | 59, 130, 246 | Links, interactive elements |
| **Warm Orange** | `#F97316` | 249, 115, 22 | Warnings, deadlines |
| **Error Red** | `#EF4444` | 239, 68, 68 | Errors, destructive actions |

### Neutral Colors

| Name | Hex | Usage |
|------|-----|-------|
| **White** | `#FFFFFF` | Light mode background |
| **Gray 50** | `#F9FAFB` | Light mode surfaces |
| **Gray 100** | `#F3F4F6` | Light mode cards |
| **Gray 200** | `#E5E7EB` | Borders (light) |
| **Gray 400** | `#9CA3AF` | Placeholder text |
| **Gray 600** | `#4B5563` | Secondary text |
| **Gray 800** | `#1F2937` | Primary text (light mode) |
| **Gray 900** | `#111827` | Dark mode surfaces |

### Dark Mode (Default)
- Background: `#0F0F1A`
- Surface: `#1A1A2E`
- Card: `#252538`
- Border: `#3D3D5C`
- Text Primary: `#F9FAFB`
- Text Secondary: `#9CA3AF`

---

## 4. Typography

### Font Stack

```css
--font-heading: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| **Display** | 48px / 3rem | 700 | 1.1 | -0.02em |
| **H1** | 36px / 2.25rem | 700 | 1.2 | -0.02em |
| **H2** | 30px / 1.875rem | 600 | 1.25 | -0.01em |
| **H3** | 24px / 1.5rem | 600 | 1.3 | 0 |
| **H4** | 20px / 1.25rem | 600 | 1.4 | 0 |
| **Body Large** | 18px / 1.125rem | 400 | 1.6 | 0 |
| **Body** | 16px / 1rem | 400 | 1.6 | 0 |
| **Body Small** | 14px / 0.875rem | 400 | 1.5 | 0 |
| **Caption** | 12px / 0.75rem | 500 | 1.4 | 0.01em |
| **Code** | 14px / 0.875rem | 400 | 1.6 | 0 |

### Usage Guidelines
- **Headings:** Space Grotesk — geometric, modern, technical
- **Body text:** Inter — clean, highly readable
- **Code/Agent output:** JetBrains Mono — clear distinction for technical content

---

## 5. Spacing System

### Base Unit: 4px

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight spacing, icon gaps |
| `space-2` | 8px | Small gaps, inline elements |
| `space-3` | 12px | Form field padding |
| `space-4` | 16px | Standard padding, card content |
| `space-5` | 20px | Medium sections |
| `space-6` | 24px | Large padding, section gaps |
| `space-8` | 32px | Section separators |
| `space-10` | 40px | Page sections |
| `space-12` | 48px | Major sections |
| `space-16` | 64px | Page margins |

### Grid System
- **Container max-width:** 1280px
- **Columns:** 12-column grid
- **Gutter:** 24px (desktop), 16px (mobile)
- **Margins:** 64px (desktop), 24px (tablet), 16px (mobile)

---

## 6. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 4px | Small elements, tags, badges |
| `radius-md` | 8px | Buttons, inputs, small cards |
| `radius-lg` | 12px | Cards, modals |
| `radius-xl` | 16px | Large containers, hero sections |
| `radius-full` | 9999px | Pills, avatars, circular buttons |

---

## 7. Shadows

### Elevation Levels

```css
/* Level 1 - Subtle lift */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Level 2 - Cards */
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
             0 2px 4px -1px rgba(0, 0, 0, 0.06);

/* Level 3 - Dropdowns, popovers */
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
             0 4px 6px -2px rgba(0, 0, 0, 0.05);

/* Level 4 - Modals */
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
             0 10px 10px -5px rgba(0, 0, 0, 0.04);

/* Glow effect for primary actions */
--shadow-glow: 0 0 20px rgba(255, 215, 0, 0.3);
```

---

## 8. Components

### Buttons

#### Primary Button
- Background: `#FFD700` (Builder Gold)
- Text: `#0F0F1A` (Dark)
- Border radius: 8px
- Padding: 12px 24px
- Font: Inter 600, 16px
- Hover: Brightness 110%, subtle glow
- Active: Brightness 90%

#### Secondary Button
- Background: Transparent
- Border: 1px solid `#3D3D5C`
- Text: `#F9FAFB`
- Hover: Background `#1A1A2E`

#### Ghost Button
- Background: Transparent
- Text: `#9CA3AF`
- Hover: Text `#F9FAFB`

#### Danger Button
- Background: `#EF4444`
- Text: White
- Hover: Brightness 110%

### Cards

```css
.card {
  background: #1A1A2E;
  border: 1px solid #3D3D5C;
  border-radius: 12px;
  padding: 24px;
}

.card:hover {
  border-color: #FFD700;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
}
```

### Input Fields

```css
.input {
  background: #0F0F1A;
  border: 1px solid #3D3D5C;
  border-radius: 8px;
  padding: 12px 16px;
  color: #F9FAFB;
  font-size: 16px;
}

.input:focus {
  border-color: #FFD700;
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

.input::placeholder {
  color: #9CA3AF;
}
```

### Badges / Tags

| Type | Background | Text |
|------|------------|------|
| Default | `#252538` | `#F9FAFB` |
| Success | `#00FF88` + 20% opacity | `#00FF88` |
| Warning | `#F97316` + 20% opacity | `#F97316` |
| Error | `#EF4444` + 20% opacity | `#EF4444` |
| Info | `#3B82F6` + 20% opacity | `#3B82F6` |

---

## 9. Agent-Specific UI

### Agent Avatars
Each agent type has a distinct avatar:

| Agent | Icon | Color |
|-------|------|-------|
| **Organizer** | 📋 Clipboard | Blue `#3B82F6` |
| **Judge** | ⚖️ Scale | Gold `#FFD700` |
| **Mentor** | 🎓 Graduation | Green `#00FF88` |
| **Team Formation** | 👥 People | Purple `#8B5CF6` |
| **Submission** | 📦 Package | Orange `#F97316` |

### Agent Chat Bubbles

```css
/* Agent message */
.message-agent {
  background: linear-gradient(135deg, #1A1A2E 0%, #252538 100%);
  border-left: 3px solid var(--agent-color);
  border-radius: 4px 12px 12px 12px;
  padding: 16px;
  max-width: 80%;
}

/* User message */
.message-user {
  background: #252538;
  border-radius: 12px 12px 4px 12px;
  padding: 16px;
  max-width: 80%;
  margin-left: auto;
}
```

### Agent Status Indicators

| Status | Color | Animation |
|--------|-------|-----------|
| Online | `#00FF88` | Subtle pulse |
| Thinking | `#FFD700` | Rotating dots |
| Offline | `#9CA3AF` | None |
| Error | `#EF4444` | None |

### Terminal/Code Blocks

```css
.code-block {
  background: #0A0A12;
  border: 1px solid #3D3D5C;
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  overflow-x: auto;
}

.code-block .line-number {
  color: #4B5563;
  margin-right: 16px;
  user-select: none;
}
```

---

## 10. Hackathon-Specific Components

### Project Card

```
┌─────────────────────────────────────┐
│ [Team Avatar] Team Name        🏷️   │
│                                      │
│ Project Title                        │
│ Short description of the project     │
│ that wraps to two lines max...       │
│                                      │
│ ┌──────┐ ┌──────┐ ┌──────┐          │
│ │ Tag  │ │ Tag  │ │ Tag  │          │
│ └──────┘ └──────┘ └──────┘          │
│                                      │
│ 👥 4 members  •  ⭐ 12 votes         │
└─────────────────────────────────────┘
```

### Timeline/Roadmap

```
○───●───○───○───○
│   │   │   │   │
│   │   │   │   └─ Demos (May 5)
│   │   │   └─ Submissions Due (May 3)
│   │   └─ Hacking Ends (May 2)
│   └─ NOW: Hacking (Apr 28)
└─ Registration (Apr 20)
```

### Leaderboard

| Rank | Team | Score | Trend |
|------|------|-------|-------|
| 🥇 | Team Alpha | 2,450 | ↑ +3 |
| 🥈 | Team Beta | 2,380 | ↓ -1 |
| 🥉 | Team Gamma | 2,290 | — |

---

## 11. Iconography

### Icon Style
- **Style:** Outlined, 1.5px stroke
- **Size:** 16px, 20px, 24px base
- **Library:** Lucide Icons (recommended) or Heroicons

### Common Icons

| Action | Icon |
|--------|------|
| Submit | `upload` or `send` |
| Edit | `pencil` |
| Delete | `trash-2` |
| Settings | `settings` |
| Help | `help-circle` |
| Search | `search` |
| Filter | `filter` |
| Sort | `arrow-up-down` |
| Link | `external-link` |
| Copy | `copy` |
| Check | `check` |
| Close | `x` |
| Menu | `menu` |
| User | `user` |
| Team | `users` |
| Calendar | `calendar` |
| Clock | `clock` |
| Star | `star` |
| Trophy | `trophy` |

---

## 12. Motion & Animation

### Timing Functions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Duration Scale
- **Instant:** 100ms — Micro-interactions
- **Fast:** 200ms — Buttons, toggles
- **Normal:** 300ms — Cards, reveals
- **Slow:** 500ms — Page transitions

### Animation Guidelines
- Use motion to provide feedback, not decoration
- Reduce motion for accessibility (`prefers-reduced-motion`)
- Agent typing indicators should feel natural (random timing)

---

## 13. Accessibility

### Color Contrast
All text meets WCAG AA (4.5:1 minimum):
- Primary text on dark: 15.3:1 ✓
- Secondary text on dark: 4.6:1 ✓
- Gold on dark: 12.1:1 ✓

### Focus States
All interactive elements must have visible focus:

```css
:focus-visible {
  outline: 2px solid #FFD700;
  outline-offset: 2px;
}
```

### Touch Targets
Minimum 44x44px for all interactive elements on mobile.

---

## 14. CSS Variables (Copy-Paste Ready)

```css
:root {
  /* Colors */
  --color-gold: #FFD700;
  --color-navy: #0F0F1A;
  --color-green: #00FF88;
  --color-blue: #3B82F6;
  --color-orange: #F97316;
  --color-red: #EF4444;
  
  /* Neutrals */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-400: #9CA3AF;
  --gray-600: #4B5563;
  --gray-800: #1F2937;
  --gray-900: #111827;
  
  /* Dark theme surfaces */
  --surface-0: #0F0F1A;
  --surface-1: #1A1A2E;
  --surface-2: #252538;
  --border: #3D3D5C;
  
  /* Typography */
  --font-heading: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px rgba(255, 215, 0, 0.3);
  
  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-normal: 300ms;
}
```

---

## 15. File Downloads

### Fonts
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)
- [Inter](https://fonts.google.com/specimen/Inter)
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/)

### Icons
- [Lucide Icons](https://lucide.dev/)

---

**Created by:** buidl.lol Design Agent  
**For:** buidl.lol Team  
**License:** Open Source
