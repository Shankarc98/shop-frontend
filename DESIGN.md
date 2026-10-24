---
name: Sankar Electronics
description: A neighborhood electronics shop for products, repairs, and local guidance.
colors:
  brand: "#762338"
  brand-dark: "#551728"
  brand-pale: "#f2e8e9"
  signal: "#e4a82f"
  ink: "#202329"
  muted: "#5d626a"
  paper: "#fffefa"
  ground: "#f5f5f2"
  rule: "#d8d8d2"
  green: "#287357"
  danger: "#a12f35"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 5vw, 4.7rem)"
    fontWeight: 760
    lineHeight: 0.99
    letterSpacing: "-0.055em"
  body:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, Segoe UI, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.55
    letterSpacing: "0.035em"
rounded:
  card: "2px"
  control: "3px"
  field: "4px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    height: "46px"
  button-primary-hover:
    backgroundColor: "{colors.brand-dark}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    height: "46px"
---

# Design System: Sankar Electronics

## Overview

**Creative North Star: "The Neighborhood Parts Counter"**

The storefront should feel like a helpful electronics counter: genuine shop imagery, clear shelf-label wayfinding, and practical choices presented without ceremony. Its burgundy identity and crisp, compact type give product discovery a recognizable local voice, while the same visual language carries into the quieter, task-focused admin screens.

Keep the interface direct and grounded in the shop's real products, services, and customer support. The existing catalog and enquiry APIs own customer and operational data; the design must not imply unsupported checkout, sales totals, testimonials, or product claims.

**Key Characteristics:**
- Shop burgundy against clean paper and a soft neutral ground.
- Compact, high-contrast Inter typography with readable body copy.
- Square-edged cards, clear rules, and real local photography.
- Storefront hierarchy for discovery; restrained layouts for administration.

## Colors

The palette is anchored in the shop's burgundy identity, with warm-neutral surfaces and restrained status colors.

### Primary
- **Shop burgundy** (`#762338`): Primary actions, links, active navigation, and selected states.
- **Deep burgundy** (`#551728`): Headline emphasis and hover states.
- **Pale burgundy** (`#f2e8e9`): Soft selected and hover surfaces.

### Secondary
- **Signal amber** (`#e4a82f`): Small proof and wayfinding accents; do not use for body text on light surfaces.

### Neutral
- **Ink** (`#202329`): Headings and primary text.
- **Muted ink** (`#5d626a`): Supporting text and secondary labels.
- **Paper** (`#fffefa`): Cards, header, and form surfaces.
- **Soft ground** (`#f5f5f2`): Page background.
- **Rule** (`#d8d8d2`): Dividers, outlines, and table structure.
- **White** (`#ffffff`): Text on the burgundy primary action.

### Status
- **Success** (`#287357`): Positive form and operation feedback.
- **Danger** (`#a12f35`): Errors and destructive actions.

## Typography

**Display Font:** Inter Variable, self-hosted, with Segoe UI and Arial fallbacks  
**Body Font:** Inter Variable, self-hosted, with Segoe UI and Arial fallbacks  
**Label Font:** Inter Variable, self-hosted, with Segoe UI and Arial fallbacks

**Character:** Compact, neutral grotesk typography keeps category names, prices, and operational data easy to scan. The same family serves every role; weight, size, and tight display tracking create hierarchy without a second decorative voice.

### Hierarchy
- **Display** (760, `clamp(2.75rem, 5vw, 4.7rem)`, `0.99`): Homepage headline.
- **Headline** (700, `clamp(1.8rem, 3vw, 2.55rem)`): Page and section headings.
- **Body** (400, `16px`, `1.55`): Descriptive and instructional copy.
- **Label** (700, `12px`, `0.035em`, uppercase only for short proof labels): Compact status, navigation, and metadata.

### Named Rules
**The One-Family Rule.** Keep display, body, and control text in the local Inter family; use hierarchy rather than introducing a second typeface.

## Layout

The storefront content uses a centered `1240px` maximum width with 24px minimum side gutters on wide screens. The masthead can span a wider `1440px` alignment. The homepage opens with a split text-and-photography hero, followed immediately by category navigation and product discovery.

Responsive rules reorganize rather than simply shrink content: navigation and hero stack below `760px`; category and product grids reduce to two columns below `560px`; a fixed bottom navigation appears at `468px` and below. Admin lists collapse into readable product cards and stacked forms at narrow widths. Preserve comfortable tap targets and prevent horizontal scrolling.

## Elevation & Depth

The system is flat by default. Borders and tonal surfaces define the product index and operational tables; soft shadows are reserved for overlays and focused contextual surfaces.

### Shadow Vocabulary
- **Search suggestions** (`0 12px 30px rgb(32 35 41 / 13%)`): Separate the open suggestion list from nearby content.
- **Dialogs** (`0 24px 70px rgb(0 0 0 / 25%)`): Establish focus for modal admin editing.

## Shapes

Use compact, nearly square geometry: `2px` cards and category links, `3px` buttons, and `4px` search and form fields. Thin rules carry structure; do not round ordinary product panels into pills. Circular shapes are reserved for carousel position indicators.

## Components

### Navigation
- The storefront masthead pairs the existing shop logo with product search and the supported page links.
- At mobile widths, use the existing compact fixed bottom navigation; keep all original destinations reachable.
- Admin navigation remains separate and clearly identifies store operations.

### Buttons
- **Primary:** Burgundy fill, white label, `3px` corners, `11px 18px` padding, and a `46px` minimum height.
- **Secondary:** Transparent surface with an ink label and a visible border.
- **Hover / Focus:** Shift primary actions to deep burgundy; preserve the high-contrast visible keyboard focus ring.
- **Disabled:** Retain the action in context, with a disabled cursor and reduced opacity.

### Cards / Containers
- Product, category, and service panels use paper surfaces, thin rules, and `2px` corners.
- Keep product imagery legible and contain failed remote images with the existing fallback.
- Admin data remains actionable through its existing edit, delete, and status controls.

### Inputs / Fields
- Search and forms use generous hit areas, clear labels, a neutral fill, and a `4px` field radius.
- Focus changes the border and provides a visible outline; required and error states must remain explicit.

## Do's and Don'ts

- Do use only the existing shop logo, local photography, and backend-owned catalog and enquiry data.
- Do preserve all current route paths, API contracts, authentication, and admin actions.
- Do keep error, loading, and empty states explicit and recoverable.
- Don't invent inventory, prices, sales metrics, testimonials, or unsupported cart and checkout flows.
- Don't replace real product or shop imagery with stock-photo URLs or decorative gradients.
- Don't add visual noise that competes with the product index or makes admin tasks harder to scan.
