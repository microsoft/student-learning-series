# Ep 2 — Design Personalization Prompts

**Purpose:** once your four foundations are built (Header, Experience, Skills, Education), use these prompts to make the site *yours* — professional, but personal. Every prompt here is written to be **reliable on the lowest student model** (GPT‑5 mini, which Auto serves for straightforward tasks): concrete, one change at a time, describe don't assume.

---

## How to prompt for design (works on any model, including the mini)

The lesson is still **Context + Specifics + Style** — just applied to *look and feel* instead of content.

1. **One change per prompt.** Weaker/faster models are most reliable when a prompt does exactly one thing. Chain small wins.
2. **Describe the outcome, then give a concrete anchor.** "Warmer, calmer" is a direction; "cream background, one navy accent" is what makes it land.
3. **Protect what works.** Start design prompts with *"Keep all my content and structure — only change the look."* This stops a model from rewriting your text.
4. **Ask for options, then choose.** "Give me three color directions as hex values" → "Go with #2." Great for exploring without committing.
5. **If a small model over‑reaches,** re‑prompt: *"That changed too much. Only change X; revert everything else."*

> 💡 Copy a prompt below, replace the **[bracketed]** parts with your taste, and paste it into the Copilot CLI. Do them in order for the smoothest result.

---

## 0 · Set a design direction (do this first)
One vibe guides every later choice, so pick it up front.

> Keep all my content and structure — only change the look. I want my portfolio to feel **[professional & minimal / warm & approachable / bold & editorial / modern‑tech]**. Propose a cohesive design direction: a palette (one background, one text color, one accent), a heading + body font pairing, and a spacing style. Show me the palette as hex values first, then apply it.

- **Personalize:** swap the vibe, or add a reference — *"clean like Stripe," "calm like a Notion page," "editorial like a magazine."*
- **Keep it pro:** cohesion beats variety. One accent color, one font pairing, consistent spacing.

---

## 1 · Color & theme
> Keep everything else the same. Change my accent color to **[deep teal #0f766e]** and update buttons, links, and the nav highlight to match. Make sure all text still passes WCAG AA contrast on my background.

Light / warm alternative:
> Switch to a light theme: near‑white background, dark‑slate text, and a single **[terracotta]** accent. Keep it high‑contrast and professional.

- **Personalize:** pick a color that means something — your school, heritage, or a favorite. One accent, used consistently, looks intentional.
- **Pitfall:** avoid fully‑saturated red/green *text* on dark backgrounds; always ask it to check contrast.

---

## 2 · Typography
> Keep my content. Use a professional font pairing: a characterful sans‑serif for headings (e.g., **[Space Grotesk]**) and a highly readable sans‑serif for body (e.g., **[Inter]**), loaded from Google Fonts. Set a clear type scale and keep body text at least 16px.

- **Personalize:** serif headings (e.g., *Fraunces*) read editorial and human; geometric sans reads modern‑tech. Match the font to your vibe from step 0.
- **Keep it pro:** two fonts maximum. Pair one distinctive heading font with one neutral body font.

---

## 3 · The hero — your first impression (the 7‑second zone)
> Keep my content. Redesign my hero to be more striking but uncluttered: a larger name, my one‑line value proposition, and two clear buttons. Add a subtle background — a soft radial gradient in my accent color, low opacity.

Add a photo or monogram:
> Add a circular headshot to my hero from `assets/me.jpg` at about 120px with a subtle border. If that image doesn't exist, fall back to my initials in a filled circle in my accent color.

- **Personalize:** your tagline is the most personal line on the page. Make it about the *value you bring*, not just your title — e.g., "I turn messy data into decisions."

---

## 4 · Project cards
> Keep my projects and links. Restyle the project cards: equal height, a gentle hover lift with a soft shadow, a thin accent‑colored top border, and tech tags as small rounded pills. Keep the 16:9 thumbnail area and make the whole card clickable.

- **Personalize:** choose a card personality — *flat & minimal*, *soft glassy*, or *bordered & structured*.
- **Pitfall:** keep every card the same height so the grid stays tidy on all screen sizes.

---

## 5 · Layout & rhythm
> Give the page more breathing room: increase the space between sections, cap the content width at about 1100px and center it, and add a faint divider line between sections. Keep it fully responsive.

Denser alternative (for content‑heavy portfolios):
> Make the layout more compact and information‑dense while keeping it readable and aligned.

- **Keep it pro:** whitespace reads as confidence. When in doubt, add space.

---

## 6 · Motion — subtle and tasteful
> Add gentle, professional motion: fade‑and‑rise each section as it scrolls into view, and a smooth hover transition on buttons and cards. Keep every animation under 300ms and respect `prefers-reduced-motion`.

- **Pitfall:** motion should be *felt, not noticed*. No bouncing, spinning, or autoplay. If it distracts from the content, cut it.

---

## 7 · Dark / light toggle (a personal feature)
> Add a dark/light mode toggle button in my nav. Remember the choice with `localStorage`, follow the visitor's system setting on first load, and make sure both themes pass AA contrast.

- **Personalize:** let your *default* theme match your vibe — light for warm/editorial, dark for modern‑tech.

---

## 8 · Signature touches (light branding — pick at most one or two)
> Create a simple monogram favicon from my initials **[JR]** in my accent color and wire it into the page `<head>`.

More options:
> Add a tasteful footer with my name, a one‑line sign‑off, and links to GitHub, LinkedIn, and email.

- **Personalize:** a monogram, a subtle custom cursor, or a small signature‑style sign‑off can make the site feel like *you*.
- **Keep it pro:** restraint. One or two signature touches, not five.

---

## 9 · Make it unmistakably yours (a human detail)
> Add one short, professional personal line under About — one sentence about a hobby, what I'm currently learning, or what I care about. Keep it genuine and brief.

- **Why:** one authentic detail is more memorable than another list of skills. It's the difference between a résumé and a *person*.

---

## 10 · Final polish & the professional checklist
> Do a polish pass: consistent spacing and alignment, AA color contrast, clearly visible keyboard focus states, and check it looks right at 375px, 768px, and 1280px. Tell me anything that still looks off.

**Professional checklist**
- [ ] One accent color, used consistently
- [ ] Two fonts maximum
- [ ] Project cards all the same height
- [ ] Text passes AA contrast (light *and* dark)
- [ ] Visible keyboard focus outlines
- [ ] Looks right on a phone (375px)
- [ ] Fast — no heavy libraries for a simple site

---

## Attainability on the lowest model

These prompts are written for **GPT‑5 mini**, the lowest model Auto serves students in the Copilot CLI. The rules that keep them reliable on a small model:

- **Scope each prompt to one change** and lead with *"keep everything else the same."*
- **Give a concrete value** (a hex code, a px size, a font name) rather than leaving it open.
- **Verify visually and re‑prompt** if it over‑reaches — small models occasionally change more than asked; a one‑line correction fixes it.

Do them in order, review after each, and the site stays coherent — no matter which model Auto picks.
