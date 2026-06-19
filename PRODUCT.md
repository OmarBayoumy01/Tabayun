# Product

## Register

product

## Users

Everyday people — the general public, not specialists. Someone has been sent a
photo or video (over WhatsApp, social media, a dating app, a news feed) and has a
nagging question: _is this real?_ They arrive uncertain, sometimes anxious, with
no forensic training and no patience for jargon. Usage is occasional and
goal-driven: drop in a file, get a clear answer, leave reassured. They are on
their own device, often mobile, and they need to trust the result without
understanding the model behind it.

The job to be done: **"Tell me, in plain language I can trust, whether this image
or video is authentic or AI-generated/manipulated."**

## Product Purpose

Tabayun is a deepfake & AI-media detector. A user uploads a photo or video; the
app analyzes it and returns a single, legible verdict — **authentic** or
**AI-generated / fake** — alongside a re-viewable history of past scans. Files are
analyzed and discarded, never stored.

The product exists because synthetic media is now good enough to fool people, and
the people most exposed are the least equipped to judge it. Success looks like: a
non-expert uploads a file, understands the verdict and how much to trust it within
seconds, and walks away calmer and better-informed — not more frightened. The
result must feel credible without being clinical, and clear without being
alarmist.

## Brand Personality

**Friendly, modern, reassuring.** The voice of a knowledgeable friend who happens
to understand this stuff — warm, plain-spoken, never condescending and never
hyped. Tone is calm and confident: it states what it found, acknowledges
uncertainty honestly, and avoids both fear-mongering and false certainty.

It should feel like a well-made everyday consumer utility (the polish of a good
banking or health app) rather than a security console or an AI demo. Approachable
over authoritative; steady over flashy. Delight lives in small, considerate
moments (a smooth upload, a clear result reveal), not in spectacle.

## Anti-references

- **Hypey AI-startup aesthetic.** No neon gradients, no gradient text, no
  glassmorphism, no glowing orbs or buzzword soup. Nothing that looks like it's
  selling "AI" as a vibe. The intelligence should be felt in the clarity of the
  answer, not advertised in the chrome.
- **Cold enterprise dashboard.** No gray-on-gray data walls, dense corporate
  panels, or intimidating control-room density. A worried everyday person should
  feel welcomed, not confronted with a console.
- **(Implied) Alarmist security tool.** Even though the domain is "detection,"
  avoid the dark hacker/red-alert register. Fear is not the product.
- **Generic shadcn starter.** The stock-violet, default-card, no-point-of-view
  template look. Tabayun should have a recognizable, intentional identity.

## Design Principles

1. **The verdict is the product.** Every screen earns its place by getting the
   user to a clear, trustworthy answer faster. Layout, color, and motion serve
   legibility of the result above all else.
2. **Calm over alarm.** A detection tool handles scary subject matter; the
   interface must not amplify the fear. Communicate findings — including "this is
   fake" — with steady neutrality, never red-alert theatrics.
3. **Honest confidence.** Show how sure the result is and never imply more
   certainty than exists. Plain language, no jargon, no overclaiming. Trust is
   earned by being straight with people.
4. **Familiar, not clever.** Standard affordances done impeccably. A non-expert
   should never have to learn a novel control. Earned familiarity beats novelty.
5. **Inclusive by default.** The answer must land for everyone — never conveyed by
   color alone, always legible, always operable by keyboard and assistive tech.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**, held genuinely rather than nominally:

- **Contrast:** body text ≥ 4.5:1, large/bold text ≥ 3:1, including placeholder
  and muted text. No light-gray-on-tinted-white body copy.
- **Colorblind-safe verdicts (critical):** the authentic/fake distinction must
  never rely on red-vs-green alone. Always pair color with an icon and an explicit
  text label (≈8% of men have red-green color vision deficiency, and this app's
  entire value is one binary signal).
- **Keyboard & focus:** every interactive element reachable and operable by
  keyboard, with a visible, AA-contrast focus indicator.
- **Reduced motion:** every animation has a `prefers-reduced-motion: reduce`
  alternative (crossfade or instant).
- **Assistive tech:** verdicts, loading, and errors announced to screen readers;
  upload control properly labeled; status changes use live regions where
  appropriate.
