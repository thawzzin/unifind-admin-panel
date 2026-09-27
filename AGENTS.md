# UniFind Admin Panel — AGENTS.md

## 1. Project Context

`unifind-admin-panel` is the administrative web application for **UniFind**, a university-campus lost and found system.

It is separate from the student/staff-facing `unifind-client` application.

The admin panel exists to help authorized university administrators efficiently oversee UniFind operations without exposing unnecessary complexity.

This phase is **UI-first**. Build the admin experience with realistic mock data before integrating the backend API.

## 2. Technology Stack

Use:

- Next.js with App Router
- TypeScript
- React
- shadcn/ui
- Tailwind CSS
- TanStack Query
- Redux Toolkit only when genuinely needed

Do not introduce another component library, server-state library, form library, or global-state solution without a clear requirement.

## 3. Development Approach

Develop one feature at a time.

For every requested feature:

1. Inspect existing code and conventions.
2. State a short implementation plan.
3. Implement only the requested scope.
4. Reuse existing patterns/components.
5. Run relevant checks available in the repository.
6. Summarize changed files and decisions.
7. Suggest a focused commit message.
8. Stop and wait for the next instruction.

Do not implement the whole admin panel at once.

Do not create Git commits unless explicitly asked.

## 4. UI-First / Mock-Data Phase

Until backend integration is explicitly requested:

- Do not call a real backend API.
- Do not invent backend endpoints.
- Use typed mock data.
- Access mock data through mock service functions.
- Use TanStack Query around mock asynchronous functions when the data represents future server state.
- Build realistic loading, empty, error, and success states where relevant.

Recommended conceptual flow:

```text
Admin Feature
    ↓
TanStack Query hook
    ↓
Mock service
    ↓
Typed mock fixtures
```

Later, mock services can be replaced by HTTP API services without rewriting the whole interface.

## 5. Admin Product Principles

The admin interface should optimize for:

- Operational clarity
- Fast scanning
- Safe actions
- Clear status visibility
- Efficient moderation
- Minimal ambiguity
- Responsive layouts
- Accessibility

Avoid adding enterprise complexity that a university lost-and-found operation does not need.

## 6. Admin Scope

The admin panel will eventually support areas such as:

- Operational overview
- Lost/found item management
- Claim review
- Category management
- User management
- Moderation

This list is context only.

Do not implement these modules until they are explicitly requested.

## 7. Domain Model

UniFind has two item types:

```text
LOST
FOUND
```

Lost item statuses:

```text
ACTIVE
RECOVERED
```

Found item statuses:

```text
AVAILABLE
RETURNED
```

Claim statuses:

```text
PENDING
APPROVED
REJECTED
```

Do not invent additional workflow statuses unless product requirements change.

## 8. Admin Role

The admin panel is intended for authorized `ADMIN` users.

During the mock phase, authentication may be simulated if required for UI development, but keep the mock session isolated and replaceable.

Do not treat hiding navigation items as real authorization.

When the backend is integrated, authorization must come from the backend.

## 9. Design Direction

Use a modern, professional university operations aesthetic.

The UI should feel:

- Clean
- Structured
- Calm
- Trustworthy
- Efficient
- Information-dense only where useful

Avoid:

- Generic AI-generated dashboard styling
- Excessive gradients
- Decorative charts with no operational value
- Huge KPI cards dominating every page
- Excessive rounded containers nested inside other rounded containers
- Overly colorful status systems

The admin UI may be denser than the client UI, but it should remain easy to scan.

## 10. Layout

A desktop admin shell will typically use:

```text
Sidebar
   +
Top/header area
   +
Main content
```

The exact shell should follow the requested design and existing project structure.

The interface must still work on tablets and narrower screens.

Do not assume every administrator uses a large desktop monitor.

## 11. Navigation

Keep primary navigation short and domain-based.

Potential future sections include:

```text
Overview
Items
Claims
Categories
Users
```

Do not add navigation entries for features that do not exist yet unless explicitly designing the complete shell/navigation.

Avoid deep navigation hierarchies.

## 12. shadcn/ui

Use shadcn/ui as the UI primitive foundation.

Prefer existing primitives such as:

- Button
- Table
- Card
- Badge
- Dialog
- Alert Dialog
- Sheet
- Dropdown Menu
- Input
- Select
- Tabs
- Skeleton
- Tooltip

Compose primitives rather than building duplicate component systems.

Use destructive confirmation patterns for destructive actions.

## 13. Tailwind CSS

Use Tailwind for styling and responsive behavior.

Prefer consistent spacing and theme tokens.

Avoid:

- Repeated arbitrary values
- Large amounts of inline CSS
- Duplicated class combinations across many features
- One-off visual systems per page

Keep visual language consistent across the admin panel.

## 14. Component Architecture

A reasonable direction is:

```text
src/
├── app/
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
├── features/
├── hooks/
├── lib/
├── mocks/
├── services/
├── store/
└── types/
```

Treat this as guidance, not a reason to rewrite a coherent existing project structure.

Feature-specific components should live close to their feature when practical.

## 15. Server and Client Components

Use Server Components by default where appropriate.

Use `"use client"` only when required for:

- Interactive state
- Event handlers
- Browser APIs
- TanStack Query client hooks
- Redux hooks
- Other client-only functionality

Do not make the entire admin application a client component unnecessarily.

## 16. TanStack Query

Use TanStack Query for server-like state, including mocked server state.

Examples:

- Items
- Claims
- Categories
- Users
- Overview statistics derived from server data

Use stable query keys.

Keep query/mutation functions outside presentation components.

Use invalidation/update patterns intentionally after mutations.

Do not duplicate TanStack Query data in Redux.

## 17. Redux

Redux is optional.

Do not use Redux for:

- Item lists
- Claims
- Categories
- Users
- API loading state
- API errors

TanStack Query owns those concerns.

Use Redux only if a genuine application-wide client-state requirement emerges that is not better represented by URL state, local state, context, or TanStack Query.

Do not create empty Redux infrastructure simply because Redux is part of the preferred toolset.

## 18. URL State

Admin table state should generally use URL search parameters when it should survive refresh or be shareable.

Examples:

- Page
- Search
- Status
- Item type
- Category
- Sort

Prefer:

```text
/items?type=FOUND&status=AVAILABLE&page=2
```

over hiding all table state inside Redux.

## 19. TypeScript

Use strict TypeScript.

Rules:

- Avoid `any`.
- Use `unknown` and narrow it when needed.
- Create reusable domain types.
- Keep mock data type-safe.
- Avoid unsafe assertions.
- Do not duplicate domain types unnecessarily.

The types used by mock services should be suitable for later API integration.

## 20. Tables

Admin tables should prioritize scanning and actions.

Do not put every field into a table.

For item management, useful columns may eventually include:

- Item
- Type
- Category
- Location
- Reporter
- Status
- Date
- Actions

Use detail pages/drawers/dialogs for information that does not need to be visible in every row.

Tables must handle:

- Loading
- Empty
- Error
- Pagination
- Filtering

when relevant to the feature.

## 21. Actions

Actions should be explicit and safe.

Avoid ambiguous icon-only actions when the meaning is not obvious.

Use confirmation for destructive or consequential actions.

Do not place many equally prominent buttons in every row.

Use menus for secondary actions where appropriate.

## 22. Status Presentation

Use badges or similarly compact indicators.

Status styling must be consistent across the application.

Do not rely on color alone; always include readable status text.

Keep the domain's intentionally small status model intact.

## 23. Claims

Claims are separate from item status.

A claim may be:

```text
PENDING
APPROVED
REJECTED
```

A FOUND item can remain `AVAILABLE` while a claim is pending.

Do not visually imply that `PENDING` is an item status.

Claim review interfaces should eventually make ownership-verification information clear to authorized admins without exposing it elsewhere.

## 24. Sensitive Information

Admin access does not mean every sensitive field should be shown everywhere.

Show sensitive ownership-verification details only where operationally necessary, such as a claim-review context.

Do not include sensitive information in broad tables, overview cards, logs, or unrelated screens.

Mock data should reflect this separation.

## 25. Categories

Categories are backend-managed reference data.

Admin category management should eventually support appropriate create/edit behavior.

Do not hardcode the authoritative category set into unrelated components.

During the mock phase, centralize category fixtures/services.

## 26. Overview / Dashboard

If an overview is requested, show only metrics and operational information that help admins act.

Potentially useful information could include:

- Active lost reports
- Available found items
- Pending claims
- Recently returned items
- Recent reports requiring attention

Do not invent vanity analytics simply to fill space.

Avoid charts unless the data has a meaningful time/segment comparison.

## 27. Search and Filtering

Admin search/filtering should help narrow operational datasets quickly.

Keep controls understandable.

Potential item filters include:

- Type
- Status
- Category
- Location
- Date

Potential claim filters include:

- Status
- Item
- Claimer
- Date

Do not add every imaginable filter upfront.

## 28. Pagination

Use pagination for datasets that can grow.

During the mock phase, model pagination similarly to the future API shape when practical.

Do not render hundreds of mock records merely to simulate scale.

## 29. Mock Data

Use realistic university lost-and-found data.

Avoid generic fixtures such as:

```text
Item 1
User 1
Lorem ipsum
```

Use realistic examples:

- MacBook charger found in Library 2F
- Student ID card found near cafeteria
- Black backpack lost in Lecture Hall B
- Calculator lost in Engineering Lab

Mock users can have plausible non-sensitive fictional names and university roles.

Keep fixtures centralized and typed.

## 30. Mock Services

Mock services should resemble future server operations.

Conceptual examples:

```ts
getAdminOverview()
getItems(filters)
getItemById(id)
updateItem(id, input)
getClaims(filters)
reviewClaim(id, decision)
getCategories()
getUsers(filters)
```

Do not create real HTTP endpoint URLs during the mock phase.

Mock functions may use Promises and small simulated delays to exercise asynchronous UI states.

## 31. Mutations During Mock Phase

Mock mutations should support UX development without becoming a fake database architecture.

Keep them simple.

Use TanStack Query mutation patterns so later API replacement is straightforward.

Do not store all mock server data in Redux.

## 32. Forms

Admin forms should be concise and task-specific.

Use clear labels and validation.

Do not expose internal database terminology unnecessarily.

Do not build one massive generic form abstraction for unrelated admin resources.

## 33. Dialogs vs Pages

Use dialogs/sheets for small, focused actions.

Use dedicated pages for workflows that require substantial context or multiple sections.

Do not force complex claim review into a tiny modal if a larger workspace is more usable.

## 34. Destructive Operations

Deletion or similarly destructive operations require clear confirmation.

Confirmation copy should identify what will happen.

Avoid generic confirmation text such as:

```text
Are you sure?
```

when more context can be provided.

## 35. Loading States

Use skeletons for tables, cards, and detail content where appropriate.

Avoid unnecessary full-screen spinners.

Keep layout stable while data loads.

## 36. Empty States

Empty states should distinguish between:

- No data exists
- No results match filters

Offer an appropriate next action where useful.

Do not use overly playful empty states in operational workflows.

## 37. Error States

Errors should be actionable and concise.

Do not expose stack traces, raw network objects, or internal backend errors.

Provide retry behavior where appropriate.

## 38. Accessibility

Admin interfaces must remain accessible.

Use:

- Semantic markup
- Keyboard-accessible controls
- Proper table semantics where appropriate
- Visible focus states
- Accessible dialogs
- Labels for controls
- Sufficient contrast

Do not make status/action meaning dependent solely on color or hover.

## 39. Responsive Behavior

Desktop is important, but admin screens must degrade gracefully on narrower screens.

For dense tables, consider appropriate responsive strategies rather than simply shrinking text.

Actions must remain usable on touch devices.

## 40. Performance

Use good defaults without premature optimization.

- Avoid unnecessary client components.
- Avoid global state for local concerns.
- Avoid excessive re-renders caused by poorly structured state.
- Paginate large datasets.
- Use responsive images when images are displayed.
- Do not add virtualization until dataset size justifies it.

## 41. Naming

Use domain-oriented names.

Prefer:

```text
ItemsTable
ItemFilters
ClaimReview
ClaimsTable
CategoryForm
UsersTable
AdminOverview
```

Avoid:

```text
DataTable2
MainContent
ThingCard
ModalComponent
```

Generic reusable components such as `DataTable` are acceptable only when they provide genuine reuse without hiding domain behavior.

## 42. Code Quality

Before completing a feature:

- Remove dead code.
- Remove unused imports.
- Check TypeScript.
- Check linting.
- Check responsive behavior.
- Check relevant loading/empty/error states.
- Check accessibility of interactive controls.
- Avoid unrelated refactors.
- Avoid unnecessary dependencies.

Run only scripts that actually exist in the repository.

## 43. Git / Commit Scope

Keep features independently commit-able.

Suggested style:

```text
feat(admin): build admin shell
feat(admin): add items management UI
feat(claims): add claim review interface
feat(categories): add category management UI
feat(users): add user management UI
```

Do not create commits unless explicitly requested.

## 44. Backend Integration Boundary

During the mock phase, keep this boundary clear:

```text
UI
 ↓
Feature hooks
 ↓
Service interface
 ↓
Mock implementation
```

Later:

```text
UI
 ↓
Feature hooks
 ↓
Service interface
 ↓
Real API implementation
```

Avoid coupling components directly to mock fixture imports whenever the data represents future backend state.

## 45. Final Rule

The UniFind admin panel is an operational tool, not a dashboard-design exercise.

Every screen should help an authorized university administrator perform a real task more clearly, quickly, and safely.

Prefer useful information and clear actions over visual density or feature count.
