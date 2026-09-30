# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

No test runner is configured.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **UI**: React 19 + React Bootstrap 5 + Tailwind CSS 4
- **Font**: "Press Start 2P" (pixelated retro font — used intentionally throughout)
- **Auth**: NextAuth.js v4 with Google OAuth, JWT sessions
- **Database**: MongoDB Atlas (`life_organizer` DB)
- **Markdown**: react-markdown + remark-gfm (GFM tables/task lists) + rehype-raw (renders legacy HTML notes)
- **Timers**: react-timer-hook (Pomodoro), react-stopwatch equivalent
/
## Architecture

### Route Protection
`middleware.ts` uses NextAuth to protect `/tasks`, `/workreports`, `/workouts`, and `/notes`. Only the whitelisted Google account (`jankovdamian@gmail.com`) can authenticate — enforced in `app/lib/auth.ts`.

### Data Flow
Pages are client components that call **Server Actions** (`app/actions/`) directly. Server actions call `requireAuth()` then `getDb()` and perform upserts. No separate API layer — data goes: Client Component → Server Action → MongoDB.

### MongoDB Collections
- `tasks`: Documents keyed by ISO date string (`_id: "2024-03-16"`), with a `tasks[]` array of Todo objects
- `reports`: Documents keyed by ISO date string, with `content` (Markdown string)
- `workouts`: Documents with unique `_id`, `content` (Markdown), optional `folderName`
- `notes`: Same shape as workouts

### Key Patterns
- **Upsert pattern**: All saves use `findOneAndUpdate` with `upsert: true`
- **Auto-save**: Client components watch state via `useEffect` and call server actions on change
- **Shared component**: `NotesWrapper` is reused by both `/notes` and `/workouts` pages
- **Editor**: `MarkdownEditor` (`app/components/markdowneditor/`) is the single editor for `/notes`, `/workouts` and `/workreports` — a View/Edit toggle over a plain textarea, defaulting to View. `content` written before the Markdown switch is raw HTML and still renders via `rehype-raw`
- **Session**: `SessionProvider` wraps the entire app in `app/layout.tsx`

### Environment Variables Required
```
MONGODB_URI
NEXTAUTH_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```
