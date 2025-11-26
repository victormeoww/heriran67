# Design Overhaul Plan: Structural Editorial

The current design feels too "floating" and sparse. To fix this without adding external images, we will implement a **structured, grid-based editorial design** inspired by classic newspapers and modern typographic posters. We will use **borders, contrasting backgrounds, and dramatic typography** to create visual interest.

## 1. Structural "Newspaper" Grid
- **Objective**: Ground the content so it doesn't float in white space.
- **Implementation**:
    - Add a global "grid lines" system using CSS borders.
    - Wrap the main content in a bordered container (`max-w-[1400px] border-x`).
    - Use vertical lines to separate the main content from the sidebar.
    - Add "kicker" lines (horizontal rules) above headers.

## 2. Dramatic Typography & Hero Section
- **Objective**: Make the first impression impactful.
- **Implementation**:
    - **Hero**: Change the Featured Post to use a **split layout** (or full width box) with a distinct background color (`bg-charcoal` text-cream or `bg-burgundy/5`).
    - **Headline**: Make the featured headline **huge** (`text-7xl` to `text-9xl`) and tighter (`tracking-tighter`).
    - **Quote**: Move the "Voices from the shadows" quote to a dedicated "masthead" area or a sidebar distinct element, rather than floating above.

## 3. Decorative Pattern Borders
- **Objective**: Use the `PersianPattern` to create custom borders.
- **Implementation**:
    - Create a repeating pattern strip to use as a horizontal divider (HR) between major sections.
    - Use the pattern as a watermark behind the featured post title.

## 4. Header Redesign
- **Objective**: Make it feel like a publication masthead.
- **Implementation**:
    - **Top Bar**: Add a small top bar with the date and "Secure Connection" status.
    - **Main Nav**: Place navigation in a bordered row *below* the logo.
    - **Logo**: Center the logo and make it dominant.

## 5. Post Feed Layout
- **Objective**: Improve density and scanability.
- **Implementation**:
    - **Grid**: Use a rigid grid with vertical dividers between items.
    - **Typography**: Enhance hierarchy (Category > Title > Excerpt > Read More).

## Execution Order
1.  **Header**: Implement the masthead style (date bar, logo, nav bar).
2.  **Layout/Page**: Add the main container and grid lines.
3.  **Hero/Featured**: Redesign the featured post to be a "cover story" with background contrast.
4.  **PostCard**: Update variants for the new grid (borders, spacing).
5.  **Footer**: Align with the new grid.
