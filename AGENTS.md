# AGENTS.md - Development Guidelines

## Project Overview
Backend portfolio project using:
- **Runtime**: Bun
- **Framework**: Next.js (fullstack)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Linter/Formatter**: Biome

---

## Build, Test & Lint Commands

### Package Management
```bash
bun install              # Install dependencies
bun update              # Update dependencies
```

### Development
```bash
bun dev                 # Start dev server (http://localhost:3000)
bun build              # Build for production
bun start              # Start production server
```

### Code Quality
```bash
biome check .          # Check all files for errors
biome check . --write  # Auto-fix formatting and issues
biome lint .           # Lint only (without formatting)
biome format .         # Format only
```

### Running Tests
```bash
bun test                  # Run all tests
bun test --watch         # Run tests in watch mode
bun test src/mytest.test.ts  # Run single test file
```

---

## Code Style Guidelines

### File Organization
- **API Routes**: `app/api/**/*.ts` - Use dynamic routes with proper HTTP methods
- **Components**: `app/components/**/*.tsx` - React components (use shadcn/ui where applicable)
- **Lib**: `app/lib/**/*.ts` - Utility functions, helpers
- **Types**: `app/types/**/*.ts` - TypeScript interfaces and types
- **Tests**: `**/*.test.ts` or `**/*.spec.ts` - Co-locate with source files

### Imports & Exports
```typescript
// ✅ Use ES modules
import { Component } from '@/components/Component'
import type { Props } from '@/types/props'
export const MyComponent = () => {}
export default MyComponent

// ❌ Avoid mixed import styles
import * as everything from 'lib'  // Use named imports instead
```

### TypeScript & Types
```typescript
// ✅ Define types explicitly
interface UserRequest {
  id: string
  email: string
}

type ApiResponse<T> = {
  data: T
  success: boolean
  error?: string
}

// ✅ Use proper return types
export const fetchUser = async (id: string): Promise<UserRequest> => {}

// ❌ Avoid implicit any
const process = (data) => {}  // Missing type
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Functions**: camelCase (`getUserById`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_RETRIES`)
- **Files**: kebab-case or match component name (`user-profile.tsx`)
- **API Routes**: kebab-case (`app/api/users/[id]/route.ts`)
- **Booleans**: Prefix with `is`, `has`, `can`, `should` (`isLoading`, `hasError`)

### Formatting
Biome enforces:
- 2-space indentation
- Single quotes for strings
- Semicolons at end of statements
- Trailing commas in multi-line objects/arrays
- Max line length: 100 characters (configurable)

Run `biome check . --write` to auto-fix all issues.

### Error Handling
```typescript
// ✅ Use try-catch with proper types
try {
  const data = await fetchData()
  return data
} catch (error) {
  if (error instanceof TypeError) {
    console.error('Type error:', error.message)
  }
  throw new Error(`Failed to fetch: ${error}`)
}

// ✅ API error responses
export const GET = async () => {
  try {
    return Response.json({ data: [] })
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// ❌ Silent failures
try {
  await riskyOperation()
} catch {}  // Don't swallow errors
```

### Async/Await
```typescript
// ✅ Use async/await for readability
const data = await fetchUser(id)

// ❌ Avoid nested promises
fetchUser(id).then(user => {
  updateUser(user).then(result => {})
})
```

### React Component Best Practices
```typescript
// ✅ Use functional components with hooks
export const Button = ({ onClick, children }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>
}

// ✅ Use Server Components by default
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}

// ✅ Mark client components explicitly
'use client'
import { useState } from 'react'
export const Counter = () => {
  const [count, setCount] = useState(0)
  return <div>{count}</div>
}

// ❌ Avoid prop drilling - use context for deeply nested state
```

---

## Next.js Specific

### App Router Guidelines
- Use `app/` directory (not `pages/`)
- Create `route.ts` files for API endpoints
- Use `page.tsx` for route pages
- Use `layout.tsx` for shared layouts
- Support dynamic routes: `app/posts/[slug]/page.tsx`

### Environment Variables
- Create `.env.local` for local development
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Access with `process.env.VARIABLE_NAME`

---

## Biome Configuration

See `biome.json` or `biome.jsonc` for linting rules. Key settings:
- Line width: 100
- Indentation: 2 spaces
- Quote style: single
- Trailing commas: all
- Semicolons: always

Update via `biome init` or manually edit the config file.

---

## Git Workflow

- Branch naming: `feature/name`, `fix/issue`, `refactor/area`
- Commit messages: `type(scope): short description`
  - Types: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`
  - Example: `feat(api): add user authentication endpoint`
- Run `biome check . --write` before committing

---

## Performance & Best Practices

- Minimize bundle size - use dynamic imports for heavy components
- Cache API responses appropriately
- Use Next.js Image component for optimization
- Implement proper error boundaries
- Use `React.memo` for expensive re-renders
- Leverage Server Components to reduce client-side JavaScript

## Design Direction

- **What does this product do?**
  Portfolio pessoal showcase de skills, mindset e projetos como backend dev. Foco em system design, cloud infra, automação, APIs escaláveis e maintainability. Energia: eficiência, confiabilidade, precisão técnica + paixão por otimização e hands-on (Linux, setups limpos).

- **Who uses it?**
  Recrutadores tech, leads de vagas backend/senior, engenheiros colaboradores. São power users do mundo dev — leem código, stacks, valorizam clareza e densidade de informação sem fluff visual.

- **What's the emotional job?**
  **Trust + Efficiency + Focus**. Transmitir: "Esse cara constrói sistemas que não quebram, escalam bem e são fáceis de manter". Toque sutil de delight nerd (terminal vibes, otimização).

- **What would make this memorable?**
  Feel de **terminal moderno + GitHub dark** — clean, dark mode default, monospace accents, borders sutis. Evitar genérico (warmth excessivo ou dramatic bold).

### Choose a Personality


**Precision & Density** — Tight spacing, monochrome, information-forward. For power users who live in the tool. Think Linear, Raycast, terminal aesthetics.


### Choose a Color Foundation

- **Cool foundations** (slate, blue-gray) — professional, trustworthy, serious

**Light or dark?** Dark modes aren't just light modes inverted. Dark feels technical, focused, premium. Light feels open, approachable, clean. Choose based on context.

**Accent color** — Pick ONE that means something. Blue for trust. Green for growth. Orange for energy. Violet for creativity. Don't just reach for the same accent every time.

### Choose a Layout Approach

- **Top navigation** for simpler tools with fewer sections

### Choose Typography

- **Humanist sans** (SF Pro) — warmer, more approachable

---

## Core Craft Principles

These apply regardless of design direction. This is the quality floor.

### The 4px Grid
All spacing uses a 4px base grid:
- `4px` - micro spacing (icon gaps)
- `8px` - tight spacing (within components)
- `12px` - standard spacing (between related elements)
- `16px` - comfortable spacing (section padding)
- `24px` - generous spacing (between sections)
- `32px` - major separation

### Symmetrical Padding
**TLBR must match.** If top padding is 16px, left/bottom/right must also be 16px. Exception: when content naturally creates visual balance.

```css
/* Good */
padding: 16px;
padding: 12px 16px; /* Only when horizontal needs more room */

/* Bad */
padding: 24px 16px 12px 16px;
```

### Border Radius Consistency
Stick to the 4px grid. Sharper corners feel technical, rounder corners feel friendly. Pick a system and commit:

- Sharp: 4px, 6px, 8px
- Soft: 8px, 12px
- Minimal: 2px, 4px, 6px

Don't mix systems. Consistency creates coherence.

### Depth & Elevation Strategy

**Match your depth approach to your design direction.** Depth is a tool, not a requirement. Different products need different approaches:

**Borders-only (flat)** — Clean, technical, dense. Works for utility-focused tools where information density matters more than visual lift. Linear, Raycast, and many developer tools use almost no shadows — just subtle borders to define regions. This isn't lazy; it's intentional restraint.

**Subtle single shadows** — Soft lift without complexity. A simple `0 1px 3px rgba(0,0,0,0.08)` can be enough. Works for approachable products that want gentle depth without the weight of layered shadows.

**Layered shadows** — Rich, premium, dimensional. Multiple shadow layers create realistic depth for products that want to feel substantial. Stripe and Mercury use this approach. Best for cards that need to feel like physical objects.

**Surface color shifts** — Background tints establish hierarchy without any shadows. A card at `#fff` on a `#f8fafc` background already feels elevated. Shadows can reinforce this, but color does the heavy lifting.

Choose ONE approach and commit. Mixing flat borders on some cards with heavy shadows on others creates visual inconsistency.

```css
/* Borders-only approach */
--border: rgba(0, 0, 0, 0.08);
--border-subtle: rgba(0, 0, 0, 0.05);
border: 0.5px solid var(--border);

/* Single shadow approach */
--shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* Layered shadow approach (when appropriate) */
--shadow-layered:
  0 0 0 0.5px rgba(0, 0, 0, 0.05),
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 2px 4px rgba(0, 0, 0, 0.03),
  0 4px 8px rgba(0, 0, 0, 0.02);
```

**The craft is in the choice, not the complexity.** A flat interface with perfect spacing and typography is more polished than a shadow-heavy interface with sloppy details.

### Card Layouts Vary, Surface Treatment Stays Consistent
Monotonous card layouts are lazy design. A metric card doesn't have to look like a plan card doesn't have to look like a settings card. One might have a sparkline, another an avatar stack, another a progress ring, another a two-column split.

Design each card's internal structure for its specific content — but keep the surface treatment consistent: same border weight, shadow depth, corner radius, padding scale, typography. Cohesion comes from the container chrome, not from forcing every card into the same layout template.

### Isolated Controls
UI controls deserve container treatment. Date pickers, filters, dropdowns — these should feel like crafted objects sitting on the page, not plain text with click handlers.

**Never use native form elements for styled UI.** Native `<select>`, `<input type="date">`, and similar elements render OS-native dropdowns and pickers that cannot be styled. Build custom components instead:

- Custom select: trigger button + positioned dropdown menu
- Custom date picker: input + calendar popover
- Custom checkbox/radio: styled div with state management

**Custom select triggers must use `display: inline-flex` with `white-space: nowrap`** to keep text and chevron icons on the same row. Without this, flex children can wrap to new lines.

### Typography Hierarchy
- Headlines: 600 weight, tight letter-spacing (-0.02em)
- Body: 400-500 weight, standard tracking
- Labels: 500 weight, slight positive tracking for uppercase
- Scale: 11px, 12px, 13px, 14px (base), 16px, 18px, 24px, 32px

### Monospace for Data
Numbers, IDs, codes, timestamps belong in monospace. Use `tabular-nums` for columnar alignment. Mono signals "this is data."

### Animation
- 150ms for micro-interactions, 200-250ms for larger transitions
- Easing: `cubic-bezier(0.25, 1, 0.5, 1)`
- No spring/bouncy effects in enterprise UI

### Contrast Hierarchy
Build a four-level system: foreground (primary) → secondary → muted → faint. Use all four consistently.

### Color for Meaning Only
Gray builds structure. Color only appears when it communicates: status, action, error, success. Decorative color is noise.

When building data-heavy interfaces, ask whether each use of color is earning its place. Score bars don't need to be color-coded by performance — a single muted color works. Grade badges don't need traffic-light colors — typography can do the hierarchy work. Look at how GitHub renders tables and lists: almost entirely monochrome, with color reserved for status indicators and actionable elements.

---

## Navigation Context

Screens need grounding. A data table floating in space feels like a component demo, not a product. Consider including:

- **Navigation** — sidebar or top nav showing where you are in the app
- **Location indicator** — breadcrumbs, page title, or active nav state
- **User context** — who's logged in, what workspace/org

When building sidebars, consider using the same background as the main content area. Tools like Supabase, Linear, and Vercel rely on a subtle border for separation rather than different background colors. This reduces visual weight and feels more unified.

---

## Dark Mode Considerations

Dark interfaces have different needs:

**Borders over shadows** — Shadows are less visible on dark backgrounds. Lean more on borders for definition. A border at 10-15% white opacity might look nearly invisible but it's doing its job — resist the urge to make it more prominent.

**Adjust semantic colors** — Status colors (success, warning, error) often need to be slightly desaturated or adjusted for dark backgrounds to avoid feeling harsh.

**Same structure, different values** — The hierarchy system (foreground → secondary → muted → faint) still applies, just with inverted values.

---

## Anti-Patterns

### Never Do This
- Dramatic drop shadows (`box-shadow: 0 25px 50px...`)
- Large border radius (16px+) on small elements
- Asymmetric padding without clear reason
- Pure white cards on colored backgrounds
- Thick borders (2px+) for decoration
- Excessive spacing (margins > 48px between sections)
- Spring/bouncy animations
- Gradients for decoration
- Multiple accent colors in one interface

### Always Question
- "Did I think about what this product needs, or did I default?"
- "Does this direction fit the context and users?"
- "Does this element feel crafted?"
- "Is my depth strategy consistent and intentional?"
- "Are all elements on the grid?"

---

## The Standard

Every interface should look designed by a team that obsesses over 1-pixel differences. Not stripped — *crafted*. And designed for its specific context.

Different products want different things. A developer tool wants precision and density. A collaborative product wants warmth and space. A financial product wants trust and sophistication. Let the product context guide the aesthetic.

The goal: intricate minimalism with appropriate personality. Same quality bar, context-driven execution.
