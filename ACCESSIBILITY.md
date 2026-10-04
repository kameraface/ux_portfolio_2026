# Accessibility notes for implementation

Design system lives in `ux_portfolio_2026_sitedesign.pen`. Use this checklist when building pages in GitHub so canvas ADA work carries into code.

Target: **WCAG 2.2 AA** (typical ADA web mapping).

---

## Design tokens (AA-checked)

| Token | Value | Notes |
| --- | --- | --- |
| Background | `#141414` | Page / field fill |
| Text primary | `#FFFFFF` | 18.4:1 on bg |
| Text muted | `#999999` | 6.5:1 on bg (AA; not AAA) |
| Primary / accent | `#FFCC00` | CTAs, field borders |
| Text on accent | `#222222` | CTA labels on yellow |
| Focus ring | `#AE5EC2` | Secondary / Roasty Ghost Chip |
| Error | `#F33751` | Field border + error text |
| Secondary | `#AE5EC2` | Updated from `#7E009E` for AA on dark |
| Camp-O-Rama | `#178573` | Updated from `#188B78` for AA on white |
| Quaternary | `#FF9900` | Case-study accent (not focus ring) |

Do **not** use old Secondary `#7E009E` as body text on `#141414`.

---

## Focus (must implement in CSS, not hover-only)

Canvas components document a **focus** state. In code:

- Show focus styles on `:focus-visible` (keyboard), not only `:hover`
- Ring: **2px** solid `#AE5EC2`, **1px** offset from the control
- Corner radius: follow the control (`4` field ? ring `5`; `8` CTA ? ring `9`; square controls ? `0`)
- Example:

```css
:focus-visible {
  outline: 2px solid #AE5EC2;
  outline-offset: 1px;
}
```

Apply to: links, nav items, CTAs, form controls, hamburger, section links, back-to-top.

---

## Forms

Canvas: label above field; optional only when labeled “(Optional)”; error = red border + bold message below.

In code:

- Associate every input with a visible `<label>` (`for` / `id` or wrap)
- Do **not** rely on placeholder alone (Password Gate previously failed this)
- Error text: `#F33751`, **12px** (2px smaller than 14px field text), **font-weight 700**, below the field
- Expose errors to assistive tech (`aria-invalid`, `aria-describedby` pointing at the error message)
- No required-field asterisks needed for this site; only Message is optional

---

## Images

- Hero / portrait: meaningful `alt` (who/what, not “image of”)
- Case study and Play photos: descriptive `alt`, or `alt=""` if purely decorative and adjacent text already names them
- Logo in header/footer: `alt` with site/name (e.g. “Karl Uschold UX”)

---

## Structure & semantics

- One clear `h1` per page; section titles as `h2` / `h3` in order (About, Work, Skills, Play, Connect, etc.)
- Nav as `<nav>` with accessible name if there is more than one
- Landmark regions: `header`, `main`, `footer`
- Buttons that navigate can be links; true actions stay `<button>`
- Icon + text contact row: keep visible text (don’t ship icon-only links without `aria-label`)

---

## Motion & targets

- Prefer `prefers-reduced-motion` for any scroll/animation
- WCAG 2.2 AA minimum target **24×24px** (design CTAs ~35px tall — OK). Prefer **44×44** where easy (hamburger, back-to-top already ~40)

---

## Page-specific

| Page | Notes |
| --- | --- |
| Homepage | Heading order; project “View Work” as links; Skills yellow block already high contrast |
| 404 | Clear recovery path (“Return Home”); status can be conveyed in `<title>` / heading |
| Password gate | Labeled fields; wrong-password / request errors use Error pattern; don’t block with color alone |

---

## Quick verify before shipping a page

1. Keyboard-only: tab through all interactive controls; focus ring always visible  
2. Labels persist when fields are filled (placeholders may disappear)  
3. Images have appropriate `alt`  
4. Headings outline makes sense in order  
5. Contrast holds for body, muted, CTA, error, and focus ring on actual backgrounds  
