---
name: Cinematic Noir Portfolio
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3938'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a29'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c6c7c0'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#90918b'
  outline-variant: '#454742'
  surface-tint: '#c8c6c3'
  primary: '#ffffff'
  on-primary: '#30312e'
  primary-container: '#e4e2de'
  on-primary-container: '#656461'
  inverse-primary: '#5e5e5c'
  secondary: '#c8c6c6'
  on-secondary: '#303030'
  secondary-container: '#494949'
  on-secondary-container: '#b9b8b8'
  tertiary: '#ffffff'
  on-tertiary: '#332f30'
  tertiary-container: '#e8e1e2'
  on-tertiary-container: '#686364'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e4e2de'
  primary-fixed-dim: '#c8c6c3'
  on-primary-fixed: '#1b1c1a'
  on-primary-fixed-variant: '#474744'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e8e1e2'
  tertiary-fixed-dim: '#ccc5c6'
  on-tertiary-fixed: '#1e1b1c'
  on-tertiary-fixed-variant: '#4a4647'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
typography:
  display-lg:
    fontFamily: ebGaramond
    fontSize: 84px
    fontWeight: '300'
    lineHeight: 90px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  body-md:
    fontFamily: ebGaramond
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  label-mono:
    fontFamily: spaceMono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.1em
  ui-button:
    fontFamily: spaceMono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
spacing:
  unit: 4px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

This design system is built for high-end cinematic storytelling and professional portfolios. It prioritizes the "image as king" by utilizing a stark, monochrome environment that recedes to let content lead. The aesthetic is a fusion of **Minimalism** and **Brutalism**, characterized by razor-sharp edges, high-contrast typography, and a distinct lack of decorative color.

The emotional response should be one of prestige, mystery, and intentionality. To achieve the "3D depth" requested, the interface relies on tonal stacking and harsh, direct shadows rather than soft glows. A subtle film grain texture should be applied globally to the background layers to break the digital perfection of the hex codes and provide a tactile, analog feel.

## Colors

The palette is strictly restricted to a monochrome spectrum to maintain a cinematic, "noir" atmosphere. 

- **Primary Text (#f2f0ec):** A warm, off-white (paper-like) used for maximum legibility and high-contrast headlines.
- **Muted Text (#4a4a4a):** Used for secondary information, meta-data, and less critical UI labels.
- **Main Background (#080808):** A deep, near-black that serves as the canvas.
- **Alt Background (#0d0d0d):** Used for raised surfaces or section differentiation to create subtle depth.
- **Border (#1e1e1e):** The structural glue of the design, used for defining containers and dividers without breaking the low-light immersion.

## Typography

The typographic strategy relies on the tension between the classical elegance of **ebGaramond** and the technical precision of **spaceMono**.

1.  **Headlines & Display:** Use ebGaramond in Light or Regular weights. Large display sizes should use tight letter-spacing to evoke a modern editorial feel. 
2.  **Body Text:** ebGaramond provides high readability for long-form narrative content, keeping with the "literary" cinematic vibe.
3.  **UI Elements & Labels:** Use spaceMono for all functional elements, such as navigation, buttons, and technical metadata (e.g., timestamps, focal lengths, categories). This creates a "slate" or "control room" aesthetic.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy inspired by architectural blueprints. Elements are placed on a 12-column grid with generous outer margins to frame the content.

- **Negative Space:** Use white space aggressively to isolate elements. A "less is more" approach is required to maintain the minimalist brand promise.
- **Vertical Rhythm:** Use increments of 4px. Large sections should be separated by significant vertical gaps (e.g., 160px+) to create a rhythmic, pacing-based browsing experience similar to a film sequence.
- **Mobile Reflow:** On mobile, margins shrink to 20px, and the 12-column grid collapses to a single-column stack, maintaining the sharp 1px borders as separators.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Stacking** and **Hard Shadows**, moving away from soft, diffused lighting.

1.  **Layers:** 
    - Base: `#080808` (Main background with grain).
    - Level 1: `#0d0d0d` (Raised cards or sections).
2.  **3D Projection:** To simulate depth, use "Offset Borders" or "Hard Shadows." Instead of a blur, use a 1px or 2px solid offset in `#f2f0ec` or a slightly lighter grey to create a "stepping" effect.
3.  **Interactivity:** Elements should feel like physical switches. Upon hover, an element might shift 2px down and to the right, with its shadow "collapsing," simulating a physical press.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every UI element—buttons, input fields, images, and cards—must have square corners. This reinforces the brutalist, cinematic precision of the design. 1px borders are the primary method of containment. No exceptions are made for "pill" buttons or rounded icons; everything exists within a rectangular or square bounding box.

## Components

- **Buttons:** Rectangular with a 1px `#f2f0ec` border. Text is `ui-button` (spaceMono). On hover, invert the colors (Background: `#f2f0ec`, Text: `#080808`).
- **Input Fields:** A simple 1px bottom border (`#1e1e1e`). The label sits above in `label-mono`. Focus state turns the bottom border to `#f2f0ec`.
- **Cards:** No background by default; defined by 1px borders or a slight tonal shift to `#0d0d0d`. Images within cards should have a subtle 10% opacity film grain overlay.
- **Chips/Labels:** Small boxes with `label-mono` text, surrounded by 1px borders. These should look like technical metadata tags on a film roll.
- **Navigation:** Top-aligned, spanning the full container width. Use `ui-button` for links. Current page is indicated by a solid underline or a "filled" box.
- **Film Grain Overlay:** Apply a global fixed-position SVG noise filter at low opacity (2-4%) over the entire viewport to unify the digital and cinematic elements.