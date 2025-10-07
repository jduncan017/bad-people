# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Bad People - Party Game Prompt Generator**

This is a web application that generates infinite prompts for the "Bad People" party game. The app replaces physical question cards with a dynamic, client-side prompt generation system using semantic categories and template-based prompts.

Built with T3 Stack Next.js, React 19, TypeScript, and Tailwind CSS.

## What This App Does

The app generates prompts like "Who would most likely win the lottery?" by:
1. Using 15 semantic categories (e.g., Life Events, Personality Traits, Spicy 🌶️)
2. Combining templates with slot-based replacements
3. Tracking session history to prevent repeats
4. Supporting special game modes (Drinking Mode 🍺, Challenge Mode 🎭)

**Key Features:**
- Infinite prompt generation with no repeats per session
- Category filtering
- Game modes with frequency control (Off/Low/Med/High)
- Session persistence (localStorage for prompts, cookies for settings)
- "Bad prompt" reporting system
- Mobile-responsive design

## Development Commands

- `npm run dev` - Start development server with Turbo mode
- `npm run build` - Build the application for production (runs `build:prompts` first)
- `npm run build:prompts` - Rebuild prompts.json from TypeScript source files
- `npm run start` - Start production server
- `npm run preview` - Build and start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run typecheck` - Run TypeScript type checking
- `npm run check` - Run both linting and type checking
- `npm run format:check` - Check code formatting with Prettier
- `npm run format:write` - Format code with Prettier

## Architecture

### Directory Structure
- `src/app/` - Next.js App Router pages and layouts
- `src/data/` - Prompt data source files (TypeScript)
  - `semanticTypes/` - Individual semantic category arrays
  - `semanticTypes.ts` - Combines all semantic types
  - `templates.ts` - Regular game templates
  - `drinkingTemplates.ts` - Drinking mode templates
  - `challengeTemplates.ts` - Challenge mode templates
  - `buildPrompts.ts` - Build script to generate prompts.json
- `public/prompts.json` - Generated JSON file consumed by the app
- `src/styles/` - Global CSS and Tailwind styles
- `src/env.js` - Environment variable validation

### Key Technologies
- **Next.js 15** with App Router
- **React 19**
- **TypeScript** with strict configuration
- **Tailwind CSS 4.0** for styling
- **js-cookie** for persistent mode settings
- **tsx** for running TypeScript build scripts
- **@t3-oss/env-nextjs** for type-safe environment variables
- **Zod** for schema validation

### Path Aliases
- `~/*` maps to `./src/*` (configured in tsconfig.json)

### Prompt System

The prompt generation system works as follows:

1. **Semantic Types** - 15 categories stored in `/src/data/semanticTypes/`
2. **Templates** - Three types of templates:
   - Regular templates (15 prompts)
   - Drinking mode templates (8 prompts)
   - Challenge mode templates (6 prompts)
3. **Build Process** - `npm run build:prompts` compiles TypeScript files into `/public/prompts.json`
4. **Runtime** - App fetches JSON and generates prompts client-side

### Data Management

**Adding New Prompts:**
1. Edit the appropriate file in `/src/data/semanticTypes/` or template files
2. Run `npm run build:prompts` to regenerate JSON
3. The app will automatically use new prompts on refresh

**Important Guidelines for Prompts:**
- **Always use specific, defined penalties** - Never use vague terms like "take a penalty"
- **Examples of good penalties:**
  - "or lose a point!"
  - "or take 3 drinks!"
  - "or skip your next turn!"
- **Examples to avoid:**
  - "or take a penalty!" ❌
  - "or face consequences!" ❌
  - "or else!" ❌
- **Be specific about drinking amounts** - Use "one drink", "two drinks", "finish your drink"
- **Challenge prompts should be clear and actionable**

### Storage Strategy

- **localStorage** - Used for session data (prompt history, shown prompts, bad prompts, stats)
  - Limit: 5-10MB (effectively unlimited for this use case)
  - Persists across browser sessions
- **Cookies** - Used for mode settings only (drinking/challenge frequency)
  - Limit: 4KB per cookie
  - 365-day expiration

### Environment Variables
Environment variables are validated through `src/env.js` using Zod schemas. Add new variables to both the schema and runtimeEnv object. Use `SKIP_ENV_VALIDATION=true` to skip validation during builds.

### Styling
Uses Tailwind CSS with the Geist font family. Global styles are in `src/styles/globals.css`.

**Color Scheme:**
- Background: Dark zinc (zinc-950, zinc-900)
- Primary: Orange-to-amber gradient
- Accents: Orange-500, Amber-500
- Mode badges: Blue (Drinking 🍺), Purple (Challenge 🎭)
- Frequency pills: Grey (Off), Green (Low), Yellow (Med), Red (High)