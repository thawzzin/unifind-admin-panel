---
version: alpha
name: "UniFind Admin"
description: "A calm campus operations workspace inspired by a well-organized university service desk."
colors:
  background: "#F5F7FA"
  foreground: "#172033"
  surface: "#FFFFFF"
  surface-subtle: "#EDF1F5"
  muted: "#64748B"
  border: "#DBE2EA"
  primary: "#153B67"
  primary-foreground: "#FFFFFF"
  accent: "#2878BD"
  accent-subtle: "#E7F1F9"
  focus: "#2878BD"
typography:
  sans:
    fontFamily: "Geist, Arial, Helvetica, sans-serif"
  utility:
    fontFamily: "Geist Mono, ui-monospace, monospace"
rounded:
  sm: "0.375rem"
  md: "0.625rem"
  lg: "0.875rem"
spacing:
  page-inline-mobile: "1rem"
  page-inline-tablet: "1.5rem"
  page-inline-desktop: "2rem"
  content-max: "100rem"
components:
  navigation: {}
  button: {}
  sheet: {}
  content-surface: {}
---

# UniFind Admin Design System

## Overview

### Creative North Star

The interface should feel like a well-run university service desk: clearly labeled trays, dependable forms, and calm staff-facing tools. It is operational rather than promotional.

### Product context and register

- **Audience and primary job:** Authorized university administrators scanning lost-and-found activity and completing routine operational tasks.
- **Target market and evidence:** University campuses, as defined by the repository product brief. No country-specific conventions are assumed.
- **Locale and language policy:** English is the current interface locale; future localization should replace owned copy consistently rather than mixing languages.
- **Usage scene:** Repeated use on desktop and laptop, with tablet and basic mobile access for checks away from a desk.
- **Register:** Product.
- **Memorable signature:** A slim blue route marker makes the current work area unmistakable without turning navigation into decorative pills.
- **Restraint:** Tables, forms, status, and consequential actions must remain familiar, compact, and quiet.
- **Anti-references:** Avoid promotional SaaS dashboards, large statistic tiles, gradients, decorative charts, and nested rounded containers because they dilute operational hierarchy.
- **Token ownership/runtime mapping:** This file mirrors the canonical hand-maintained CSS variables in `app/globals.css` (Model B). Tailwind v4 maps those variables through `@theme inline`; shared components consume semantic utilities.

## Colors

Paper-white `surface` sits on the cool `background`; the contrast is reinforced by `border`, not heavy shadow. University navy `primary` identifies brand and important actions. Clear blue `accent` is reserved for current location and focus. `muted` supports secondary information while preserving readable contrast. The initial MVP supports a light theme only; forced-color mode returns scrollbar control to the system.

## Typography

Geist Sans is the body and interface family. Weight, size, and spacing create hierarchy; headings remain compact rather than oversized. Geist Mono is reserved for future identifiers or technical values, not general prose. Labels use sentence case except short structural eyebrows, which may use tracked uppercase text.

## Layout

Desktop uses a persistent 17rem sidebar, a compact sticky header, and a flexible content column. The sidebar becomes an accessible modal sheet below the large breakpoint. Page padding progresses from 1rem to 1.5rem to 2rem, with a 100rem maximum content width for future operational tables. The document owns vertical scrolling; local overflow should be introduced only by components that genuinely need it.

## Elevation & Depth

Tonal layers and one-pixel borders provide normal hierarchy. Static content is flat. Elevation is reserved for overlays such as the mobile navigation sheet, which uses a restrained shadow and backdrop.

## Shapes

Controls use the medium 0.625rem radius, small indicators use 0.375rem, and overlays may use 0.875rem where helpful. Large pill-shaped containers are avoided. Circular geometry is limited to identity avatars and universally understood small indicators.

## Components

### Foundational visual states

Interactive targets have visible hover, active, and two-pixel focus-ring states. Disabled controls remove pointer interaction and reduce opacity. Reduced-motion preferences collapse transitions. Loading and async states will be defined with their owning features rather than simulated in the Phase 1 shell.

### Buttons and actions

Primary buttons use navy with white text; outline and ghost variants cover secondary emphasis. Buttons keep stable dimensions and text labels unless a familiar icon has an accessible name.

### Navigation and data display

The active route combines text, a subtle blue-tinted surface, and the slim blue route marker so state never depends on color alone. Desktop navigation is persistent; narrow navigation is a focus-trapped sheet with Escape dismissal and focus restoration. Future data tables should preserve row comparison through controlled horizontal overflow on narrow screens.

### Forms and overlays

Future forms and dialogs should use maintained shadcn primitives. The mobile sheet is the canonical narrow-screen navigation overlay. It owns its backdrop, focus trap, scroll lock, close affordance, and accessible title and description.

### Iconography

Lucide is the canonical icon family, using outline icons at 18–20px in routine controls. Icons support labels and do not replace unfamiliar action text.

### Motion

Motion communicates overlay entry and interaction state only. Transitions are brief and interruptible, and all animation respects `prefers-reduced-motion`.

### Content and data visualization

Copy is direct, calm, and task-oriented. Actions use explicit verbs. Charts are not a default; future visualizations must answer an operational question and retain a textual alternative.

## Do's and Don'ts

- **Do:** Keep the administrator's current section and next action obvious.
- **Do:** Build hierarchy with spacing, typography, borders, and semantic tokens.
- **Don't:** Use gradients, oversized hero copy, or ornamental analytics.
- **Don't:** Hide operational meaning behind color, icon-only controls, or hover-only behavior.
