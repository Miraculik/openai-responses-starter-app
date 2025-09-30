# App Design Guide — Dark Chat Interface (ChatGPT-style)

This guide defines a dark theme and minimal-change steps to make the app look highly similar to the screenshot (ChatGPT-like interface), while minimizing risk and edits.

## 1) Visual goals
- High-contrast dark UI with near-black canvas, muted surfaces, rounded message bubbles, and subtle borders.
- Clear hierarchy: sidebar/nav, chat transcript, input area, right tools panel.
- Accent color used sparingly for focus, links, primary actions, and selection.

## 2) Color palette (extracted/approximated from screenshot)

Design tokens (hex):
- App background `--color-bg`: #0E1116
- Sidebar background `--color-sidebar`: #0B0F14
- Surface 1 (cards/bubbles) `--color-surface-1`: #151922
- Surface 2 (secondary panels) `--color-surface-2`: #1B2030
- Bubble (user) `--color-bubble-user`: #242A38
- Bubble (assistant) `--color-bubble-assistant`: #161B26
- Border/subtle line `--color-border`: #273142
- Primary text `--color-fg`: #E7EAF0
- Secondary text `--color-muted`: #A4AABD
- Tertiary text `--color-subtle`: #8C93A5
- Accent (brand) `--color-accent`: #10A37F
- Accent hover `--color-accent-600`: #0D876A
- Link `--color-link`: #8AB4F8
- Code surface `--color-code-bg`: #0F1720
- Code border `--color-code-border`: #1F2A37
- Success `--color-success`: #22C55E
- Warning `--color-warning`: #F59E0B
- Danger `--color-danger`: #EF4444

These values are optimized for contrast (WCAG AA for body text on surfaces). Adjust if your display calibration differs.

## 3) Typography
- Keep existing fonts: Geist Sans for UI, Geist Mono for code.
- Base body: 14px–15px; chat content 15px; small metadata 12–13px.
- Line-height: 1.5–1.6.

## 4) Radius, spacing, shadows
- Radius: 16px bubbles, 12px panels, 20px large containers.
- Spacing: 8 / 12 / 16 / 24 as primary steps.
- Shadows: very subtle; rely mostly on borders in dark mode.

## 5) CSS variables (minimal-change approach)
Add variables to `globals.css` so we can remap common Tailwind utility colors via small class edits or targeted overrides.

```css
:root {
  --color-bg: #0E1116;
  --color-sidebar: #0B0F14;
  --color-surface-1: #151922;
  --color-surface-2: #1B2030;
  --color-bubble-user: #242A38;
  --color-bubble-assistant: #161B26;
  --color-border: #273142;
  --color-fg: #E7EAF0;
  --color-muted: #A4AABD;
  --color-subtle: #8C93A5;
  --color-accent: #10A37F;
  --color-accent-600: #0D876A;
  --color-link: #8AB4F8;
  --color-code-bg: #0F1720;
  --color-code-border: #1F2A37;
  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
}

.dark {
  color-scheme: dark;
}
```

Utility helpers (optional, reduce edits by introducing semantic classes):

```css
.bg-app-bg { background-color: var(--color-bg); }
.bg-sidebar { background-color: var(--color-sidebar); }
.bg-surface-1 { background-color: var(--color-surface-1); }
.bg-surface-2 { background-color: var(--color-surface-2); }
.bg-bubble-user { background-color: var(--color-bubble-user); }
.bg-bubble-assistant { background-color: var(--color-bubble-assistant); }
.text-foreground { color: var(--color-fg); }
.text-muted { color: var(--color-muted); }
.text-subtle { color: var(--color-subtle); }
.border-subtle { border-color: var(--color-border); }
.ring-accent { --tw-ring-color: var(--color-accent); }
.accent-bg { background-color: var(--color-accent); }
.accent-bg:hover { background-color: var(--color-accent-600); }
.link { color: var(--color-link); }
.code-surface { background-color: var(--color-code-bg); border-color: var(--color-code-border); }
```

This lets us change a handful of classes in a few files instead of touching every Tailwind utility.

## 6) Tailwind setup (non-breaking)
Extend colors to allow `bg-[token]` usage if preferred. (Optional—semantic classes above already work.)

```ts
// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      'app-bg': 'var(--color-bg)',
      'sidebar': 'var(--color-sidebar)',
      'surface-1': 'var(--color-surface-1)',
      'surface-2': 'var(--color-surface-2)',
      'fg': 'var(--color-fg)',
      'muted': 'var(--color-muted)',
      'subtle': 'var(--color-subtle)',
      'accent': 'var(--color-accent)',
      'border-subtle': 'var(--color-border)',
    },
  }
}
```

## 7) Minimal edits by file (safe changes only)

Focus on containers and the few places with hardcoded light colors.

1) `app/layout.tsx`
   - Body wrapper: replace `bg-gray-200 text-stone-900` with `bg-app-bg text-foreground`.

2) `components/assistant.tsx`
   - Container: change `bg-white` to `bg-surface-1`.

3) `components/message.tsx`
   - Assistant bubble: change `bg-white` to `bg-bubble-assistant` and text to `text-foreground`.
   - User bubble: change `bg-[#ededed]` to `bg-bubble-user` and text to `text-foreground`.

4) `components/tool-call.tsx`
   - Panels: change `bg-[#fafafa]` to `bg-surface-2`.
   - Ensure code blocks use `.code-surface` (background and border).

5) `components/tools-panel.tsx`
   - Root: change `bg-[#f9f9f9]` to `bg-surface-2` and add `text-foreground`.

6) Shared borders
   - Where `border-stone-200` appears, replace with `border-subtle`.

These edits are localized and avoid refactoring component structure.

## 8) Component guidelines

### Chat transcript
- Max width 750px (already present). Keep generous vertical spacing between items.
- Show assistant/user bubbles with 16px radius; align user to right, assistant to left.
- Metadata (timestamps, tool labels) in `text-subtle`.

### Input area
- Full-width rounded container on dark surface (`bg-surface-1`).
- Textarea transparent; caret and placeholder in `text-subtle`.
- Primary send button: `.accent-bg text-white rounded-full`; hover darkens.
- Focus ring: `.ring-2 ring-accent`.

### Sidebar / right tools panel
- Sidebar uses `bg-sidebar`; right panel uses `bg-surface-2`.
- Section titles `text-muted`, content `text-foreground`.
- Controls (switches, buttons) use accent for active state.

### Tool call cards
- Header row with icon + title in accent; body on `bg-surface-2`.
- Code blocks on `--color-code-bg` with border `--color-code-border`.

### Annotations and pills
- Pills use subtle background from surfaces; borders with `--color-border`.
- Links use `--color-link` and underline on hover.

## 9) Accessibility & interaction
- Maintain 4.5:1 contrast for body text on surfaces.
- Hover/focus states must be visible (accent ring and color shift).
- Respect prefers-reduced-motion; only fade/scale small elements.

## 10) Example class replacements (cheat sheet)
- `bg-gray-200` → `bg-app-bg`
- `bg-white` → `bg-surface-1` (assistant bubbles/panels), or `bg-bubble-assistant` for chat bubbles
- `bg-[#fafafa]` → `bg-surface-2`
- `bg-[#ededed]` → `bg-bubble-user`
- `text-stone-900`/`text-black` → `text-foreground`
- `text-zinc-500` → `text-muted`
- `border-stone-200` → `border-subtle`

## 11) Optional theming switch
If you later add a theme toggle, apply `.dark` on `<html>` and keep the variables in `:root` for dark by default. For a light theme, introduce a `.light` scope with alternate values.

---

By introducing semantic utility helpers and changing a small number of color classes in a handful of files, the UI closely matches the screenshot while minimizing churn and risk.


