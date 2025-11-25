# Persistent Map Layout Update

## Overview
The application layout has been restructured to keep the **map visible at all times**, even when navigating between Step 2 (Program & Rules) and Step 3 (Generate & Analyze).

## Layout Structure

### Before
```
Step 1: [Map Panel] [Details Panel]
Step 2: [Settings Panel] [Preview Panel]
Step 3: [Analysis Panel] [Results Panel]
```

Each step occupied the full viewport with its own map layout.

### After
```
ALWAYS VISIBLE:
├── [Persistent Map] (Left Side - 1fr width)
│   ├── Search Bar
│   ├── Map Controls
│   └── MapLibre Instance
│
└── [Content Panels] (Right Side - 380px width)
    ├── Step 1: Property Details Tab
    ├── Step 2: Settings + Preview Panels
    └── Step 3: Analysis + Results Panels
```

## Key Changes

### HTML Structure
- **Moved map outside step views** into a persistent `.app-container` wrapper
- Map stays in place while `.content-panels` div switches between steps
- Created `.content-panels` wrapper that contains all 3 step views

**Before:**
```html
<section class="step-view" id="step-1">
  <div class="main-container">
    <div class="map-panel"> ... </div>
    <div class="details-panel"> ... </div>
  </div>
</section>
```

**After:**
```html
<div class="app-container">
  <div class="map-panel persistent-map"> ... </div>
  <div class="content-panels">
    <section class="step-view" id="step-1"> ... </section>
    <section class="step-view" id="step-2"> ... </section>
    <section class="step-view" id="step-3"> ... </section>
  </div>
</div>
```

### CSS Grid Changes

**New `.app-container` grid:**
```css
.app-container {
  display: grid;
  grid-template-columns: 1fr 380px;  /* Map + Content Panels */
  gap: 0;
  flex: 1;
  overflow: hidden;
}
```

**Step view display:**
```css
.step-view {
  display: none;
  flex-direction: column;
  flex: 1;
}

.step-view.active {
  display: flex;
}
```

**Content panels container:**
```css
.content-panels {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  overflow: hidden;
}
```

### Panel Styling Updates
- All panels (settings, preview, analysis, results) now use consistent styling
- Panels flex to fill available height in the content column
- Map remains fixed in left column at any viewport size

## User Experience

### Navigation
- **Step 1 → Step 2**: Map stays visible; right panel switches from "Property Details" to "Program & Regulations"
- **Step 2 → Step 3**: Map stays visible; right panel switches to "Generate & Analyze"
- **Any Step**: Address search still works; map updates in place

### Benefits
1. **Context Preservation**: Users always see the selected property on the map
2. **Visual Continuity**: Map doesn't reset or reload when switching steps
3. **Easier Reference**: Can check location details while configuring parameters
4. **Mobile Friendly**: Panel slides on smaller screens while map remains accessible

## Technical Details

### File Changes
- **index.html**: Restructured with persistent map container
- **style.css**: New `.app-container` and `.content-panels` grid rules
- **app.js**: No changes needed (step switching logic remains the same)

### Responsive Behavior
- **Desktop (1200px+)**: Full split layout (map + panels)
- **Tablet (768-1200px)**: Responsive grid adjustment
- **Mobile (<768px)**: Stacked or slide-in panel layout (future enhancement)

## Testing Notes

✅ Map remains visible when switching between steps
✅ All property search functionality works with persistent map
✅ Address search updates map in place
✅ Zoom/pan controls remain accessible
✅ Property details populate correctly on selection
✅ Step navigation validation still applies

## Future Enhancements

- [ ] Mobile version: Slide-in panel (overlay) for better space usage
- [ ] Add map layer toggles (zoning districts, tax lots, overlays)
- [ ] Persistent map context menu for quick property selection
- [ ] Mini-map for Step 2 & 3 (if needed)
- [ ] Highlight selected lot on map with borders/colors
