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
