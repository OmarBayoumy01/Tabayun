---
name: Tabayun
description: A calm, trustworthy deepfake & AI-media detector for everyday people.
colors:
  signal-violet: 'oklch(0.491 0.27 292.581)'
  signal-violet-deep: 'oklch(0.432 0.232 292.759)'
  violet-foreground: 'oklch(0.969 0.016 293.756)'
  ink: 'oklch(0.145 0 0)'
  surface: 'oklch(1 0 0)'
  panel: 'oklch(0.97 0 0)'
  muted-ink: 'oklch(0.556 0 0)'
  border: 'oklch(0.922 0 0)'
  verified-green: 'oklch(0.696 0.149 162.5)'
  alert-red: 'oklch(0.577 0.245 27.325)'
typography:
  headline:
    fontFamily: 'Inter Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.5rem'
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Inter Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1rem'
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Inter Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 'normal'
  label:
    fontFamily: 'Inter Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 'normal'
rounded:
  sm: '4px'
  md: '6px'
  lg: '7px'
  pill: '13px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
components:
  button-primary:
    backgroundColor: '{colors.signal-violet}'
    textColor: '{colors.violet-foreground}'
    rounded: '{rounded.pill}'
    padding: '0 12px'
    height: '32px'
  button-primary-hover:
    backgroundColor: 'oklch(0.491 0.27 292.581 / 0.8)'
    textColor: '{colors.violet-foreground}'
    rounded: '{rounded.pill}'
  button-destructive:
    backgroundColor: 'oklch(0.577 0.245 27.325 / 0.1)'
    textColor: '{colors.alert-red}'
    rounded: '{rounded.pill}'
    height: '32px'
  badge-secondary:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.ink}'
    rounded: '{rounded.pill}'
    padding: '2px 8px'
  badge-destructive:
    backgroundColor: 'oklch(0.577 0.245 27.325 / 0.1)'
    textColor: '{colors.alert-red}'
    rounded: '{rounded.pill}'
    padding: '2px 8px'
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: '24px'
---

# Design System: Tabayun

## 1. Overview

**Creative North Star: "The Trusted Second Opinion"**

Tabayun is the calm, knowledgeable friend you turn to when you're not sure a photo
or video is real. The interface behaves like that friend would: it listens (a
generous, unintimidating upload), it thinks (an honest, quiet loading state), and
it tells you straight (one clear verdict, in plain language, with no theatrics).
Everything on screen exists to deliver that verdict faster and make it more
believable. Nothing exists to look impressive.

The personality is **friendly, modern, and reassuring**. Surfaces are bright and
open; rounding is generous; color is used sparingly and meaningfully. The system
deliberately refuses two opposite traps. It is **not a hypey AI product** — no
gradient text, no glassmorphism, no glowing orbs, no neon "intelligence" theater;
the smarts are felt in the clarity of the answer, never advertised in the chrome.
And it is **not a cold enterprise console** — no gray-on-gray data walls, no
intimidating density. A worried everyday person should feel welcomed, not audited.
Because the subject matter ("is this fake?") is inherently a little scary, the
single most important atmospheric rule is **calm over alarm**: even a "fake"
result is delivered with steady neutrality, never red-alert panic.

**Key Characteristics:**

- **Verdict-first.** Layout, color, and motion serve one job: a legible answer.
- **Soft & friendly.** Generous rounding (pill buttons/badges), flat surfaces, gentle hover lifts.
- **Quietly confident.** One accent (Signal Violet), used only where it means something.
- **Honest, not loud.** State colors are muted tints, not full-saturation shouts.
- **Inclusive by default.** Verdicts never rely on color alone; AA contrast throughout.

## 2. Colors

A bright neutral canvas carrying a single confident accent, with two reserved
semantic colors for the only distinction that matters: authentic vs. fake.

### Primary

- **Signal Violet** (`oklch(0.491 0.27 292.581)`): Tabayun's identity color and the
  brand's deliberate commitment — owned, not the leftover default. Used for the
  primary action (Analyze, Sign in), the active/selected state, focus rings, and
  brand moments. Never for decoration.
- **Signal Violet Deep** (`oklch(0.432 0.232 292.759)`): the darker step, used as
  the dark-theme primary and for emphasis where the base violet needs more weight.
- **Violet Foreground** (`oklch(0.969 0.016 293.756)`): near-white text/icon color
  that rides on top of Signal Violet for AA contrast on primary surfaces.

### Secondary (semantic verdict colors)

These two are not decorative palette members — they are the product's vocabulary.

- **Verified Green** (`oklch(0.696 0.149 162.5)`, the Tailwind emerald family): the
  _authentic_ verdict. Calm, positive, never lime-bright. Currently applied via
  Tailwind `emerald` utilities; it should be promoted to a real semantic token.
- **Alert Red** (`oklch(0.577 0.245 27.325)`): the _AI / fake_ verdict and genuine
  destructive/error states. Used almost always as a **10% tint behind red text**,
  not as a solid fill — the warning reads clearly without shouting.

### Neutral

- **Ink** (`oklch(0.145 0 0)`): primary text. The contrast anchor; body copy never drifts to light gray.
- **Surface** (`oklch(1 0 0)`): page and card background. Pure, bright, open.
- **Panel** (`oklch(0.97 0 0)`): secondary fills — secondary buttons, muted chips, hover beds.
- **Muted Ink** (`oklch(0.556 0 0)`): supporting/meta text (timestamps, descriptions). Verified to hold ≥4.5:1 on Surface.
- **Border** (`oklch(0.922 0 0)`): hairline dividers and the 1px card/control outline that defines structure in place of shadow.

### Named Rules

**The Verdict-Not-By-Color Rule.** A verdict is _never_ communicated by color
alone. Every verdict pairs Signal/Green/Red with an icon (shield-check /
shield-alert) **and** an explicit text label ("Authentic" / "AI · Fake").
Color-blind users and grayscale renders must read the result perfectly.

**The Quiet Alert Rule.** Alert Red appears as a tint (`/10`–`/20`) behind red
text and small icons — never as a full-bleed red banner or panic panel. The tool
informs; it does not frighten.

**The One Voice Rule.** Signal Violet covers ≤10% of any screen. Its scarcity is
what makes the primary action obvious.

## 3. Typography

**Body & UI Font:** Inter Variable (with `ui-sans-serif, system-ui, sans-serif`)
**Display Font:** none — Inter carries every level.
**Latent:** Geist Variable is installed but not currently wired to a token; Inter is the single source of truth.

**Character:** One impeccably-tuned humanist sans does all the work — headings,
labels, buttons, body, and data. This is a product surface, not a magazine; a
single trustworthy voice beats a display/body pairing and keeps the focus on the
answer.

### Hierarchy

- **Headline** (600, 1.5rem / `text-2xl`, lh 1.2, ls -0.02em): page titles, e.g. "Deepfake & AI Detector".
- **Title** (600, 1rem, lh 1.3): card titles — "Upload media", "Detection result", "Scan history".
- **Body** (400, 0.875rem / `text-sm`, lh 1.5): descriptions and content. Cap prose at 65–75ch.
- **Label** (500, 0.75rem / `text-xs`): badges, verdict chips, timestamps, meta.

### Named Rules

**The One Family Rule.** Inter only, differentiated by weight and size. Display or
decorative fonts in UI labels, buttons, or data are prohibited. A fixed rem scale
(not fluid `clamp()`) — users view at consistent DPI and a shrinking sidebar
heading looks worse, not better.

## 4. Elevation

The system is **flat by default**. Depth comes from a 1px Border and the bright/
panel tonal split, not from ambient shadows. Shadow is reserved as a _response to
state_ — it appears on hover to signal "this is liftable/clickable," and recedes
at rest. This keeps the surface calm and avoids the heavy, dated card-shadow look.

### Shadow Vocabulary

- **Hover lift** (`box-shadow` ≈ Tailwind `shadow-md`/`shadow-lg` + `translateY(-2px)`): applied to interactive cards (e.g. history scans) on hover/focus only.
- **Focus ring** (`ring-3` of `ring/30` on the control's own hue): the accessibility-critical elevation; always visible on keyboard focus.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat with a 1px border at rest. Shadow
and lift are earned by interaction (hover, focus), never applied decoratively to
static panels.

## 5. Components

### Buttons

- **Shape:** generously rounded, near-pill (`rounded-2xl` ≈ 13px) on a 32px-tall control — soft and friendly.
- **Primary:** Signal Violet fill, Violet Foreground text, `h-8 px-3`, weight 500. The one loud element per view.
- **Hover / Focus:** primary fades to ~80% opacity; focus shows a 3px violet ring (`ring/30`); `:active` nudges down 1px for tactility.
- **Destructive:** _subtle by design_ — Alert Red text on a 10% red tint, not a solid red button. Loud destructive fills are prohibited (Quiet Alert Rule).
- **Secondary / Outline / Ghost:** Panel fill / bordered / transparent respectively, all resolving to Ink text on hover over Panel.

### Chips / Badges (verdict carriers)

- **Shape:** pill (`rounded-2xl`), `h-5`, `text-xs`, weight 500.
- **Verdict — Authentic:** Verified Green + `ShieldCheck` icon + "Authentic" label.
- **Verdict — Fake:** Alert Red (tinted) + `ShieldAlert` icon + "AI · Fake" label.
- Color is always accompanied by icon and text (Verdict-Not-By-Color Rule).

### Cards / Containers

- **Corner Style:** `rounded-xl` (≈7px+).
- **Background:** Surface; **Border:** 1px Border hairline.
- **Shadow Strategy:** flat at rest; lift on hover only for _interactive_ cards (history). Static panels (Upload, Result) stay flat.
- **Internal Padding:** 24px (`lg`); compact sub-cards use 10px.

### Inputs / Fields

- **Style:** Surface fill, 1px Border, rounded to match the control scale.
- **Focus:** border shifts to ring color with a 3px ring; no glow.
- **Error:** `aria-invalid` drives a Border + ring in Alert Red — tinted, not alarming.

### Navigation / App Shell

- Standard product chrome (top bar / side nav). Inter labels, Ink default, Signal Violet for the active item only. Collapse structurally on small screens — never via fluid type.

### Signature Component — The Verdict

The single most important surface. A reassuring icon (ShieldCheck green / ShieldAlert red), the verdict badge, and one plain-language sentence ("No signs of AI generation or manipulation were found."). Calm, centered, legible. This is where "The Trusted Second Opinion" lives or dies — it must feel like a steady answer, not an emergency.

## 6. Do's and Don'ts

### Do:

- **Do** treat the verdict as the product — make the answer the most legible thing on the screen.
- **Do** pair every verdict with an icon **and** a text label, so it reads in grayscale and for color-blind users (the entire app hinges on one binary signal).
- **Do** keep Signal Violet to ≤10% of a screen, reserved for the primary action, active state, and focus.
- **Do** deliver "fake" results calmly — Alert Red as a tint behind red text, with a steady explanatory sentence.
- **Do** use Inter at one weight/size scale; let hierarchy come from weight and size, not new fonts.
- **Do** keep surfaces flat with a 1px border at rest; reserve shadow/lift for hover and focus.
- **Do** ensure body and muted text clear 4.5:1 against Surface; never drop body copy to light gray "for elegance".
- **Do** promote the hardcoded `emerald` authentic color to a real semantic token for consistency.

### Don't:

- **Don't** use gradient text, glassmorphism, glowing orbs, or neon "AI" theater — this is not a hypey AI startup.
- **Don't** build cold, gray-on-gray enterprise density or intimidating data walls — this is for a worried everyday person.
- **Don't** slip into the alarmist security/hacker register: no full-bleed red banners, no fear-driven dark "cyber" theming.
- **Don't** ship the generic shadcn-default look — Signal Violet is an owned identity, not an untouched template accent.
- **Don't** convey a verdict (or any critical state) by color alone.
- **Don't** use `border-left`/`border-right` > 1px as a colored accent stripe; use full borders or background tints.
- **Don't** introduce a display/decorative font into UI labels, buttons, or data.
- **Don't** animate decoratively; motion conveys state (150–250ms) and always has a `prefers-reduced-motion` alternative.
