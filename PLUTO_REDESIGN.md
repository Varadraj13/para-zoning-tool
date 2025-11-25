# NYC Parametric Zoning Tool - PLUTO Aesthetic Redesign

## Overview

The frontend has been completely redesigned to match the **NYC Property Information Portal (PLUTO/Zola)** aesthetic—a professional, data-focused interface used across New York City's property and planning tools.

## Design Philosophy

The redesign focuses on:

- **Data-first layout**: Property information and zoning metrics are the primary content
- **Efficient space use**: Map takes up the majority of the screen; details panel on the right is compact and scrollable
- **Professional aesthetics**: Clean typography, muted colors (#111, #333, #666, #999), minimal borders
- **Quick access to information**: Tabs, accordions, and compact metric cards for easy scanning
- **NYC branding**: Orange accents (#FF6B00), blue primary actions (#0051BA)

## Layout Architecture

### Two-Panel Design

```
┌─────────────────────────────────────────────────────────┐
│  Nav: Logo, Title, Subtitle    | Search Props | API |  │
├──────────────────────────┬──────────────────────────────┤
│                          │  Details Panel (380px)       │
│                          │  - Property Details Tab      │
│      MAP PANEL           │  - Building Info Tab         │
│      (Primary Focus)     │  - Land Info Tab             │
│                          │  - Zoning Info Tab           │
│                          │  - Analysis Section          │
│                          │  (scrollable)                │
└──────────────────────────┴──────────────────────────────┘
```

### Map Panel
- **Search bar** at top (address, BBL, coordinates)
- **Map controls** (zoom in/out, reset)
- MapLibre GL interactive map with CartoDB basemap
- Primary focus for site selection and visualization

### Details Panel (Right Sidebar)
- **380px fixed width** (adjustable based on content density)
- **Fully scrollable** for property details
- **Tab system** for different data views:
  - **Property Info**: Owner, lot area, type
  - **Building Info**: Stories, construction type, frontage
  - **Land Info**: Land area, lot shape, corner lot status
  - **Zoning Info**: Zoning district, community board, special districts

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Text Primary | Dark Gray | #111 | Headings, labels, body text |
| Text Secondary | Medium Gray | #333 | Sub-headings |
| Text Tertiary | Light Gray | #666 | Helper text, metadata |
| Borders | Light Gray | #E0E0E0 | Lines, dividers |
| Background | Off-white | #F5F5F5, #FAFAFA | Panel backgrounds |
| Primary Action | NYC Blue | #0051BA | Generate, Optimize buttons |
| Secondary Action | NYC Orange | #FF6B00 | Export, important actions |
| Map Background | Light Gray | #E8E8E8 | Map container fallback |

## Typography

- **Font Family**: System UI stack (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Headings (h1-h3)**: 16px, 600 weight (brand), 14px (sections), 13px (subsections)
- **Body Text**: 13px, regular weight
- **Labels**: 12px, 600 weight
- **Helper Text**: 11px, regular weight, #666

## Component Details

### Navigation Bar
- Height: 60px
- Content: NYC logo + branding on left, action buttons on right
- Sticky at top, shadow below
- Uses light backgrounds with dark text for contrast

### Search Bar
- Full width input in map header
- Accepts: addresses, BBL numbers, coordinates
- Live filtering against demo locations
- Keyboard support (Enter to search)

### Property Details Accordion
- **Open by default**: First section (Property Info)
- **Icons**: 📋 Property, 🏢 Building, 🏗️ Development
- **Data rows**: Label on left, value on right
- **Metrics cards**: 2-column grid for "Building Info" and "Land Info" tabs

### Analysis Section
- **Action buttons**: Generate Envelope, Optimize Massing, Export Report
- **3-metric display**: Max Volume, Max GFA, Achieved FAR
- **Hover states**: All buttons have hover effects

### Tab System
- Horizontal tabs below "Property Details" header
- **Active state**: Blue underline (#0051BA), bold text
- **Inactive**: Light gray text, no underline
- **Interactive**: Click to switch tab content

## Demo Locations

Three sample properties pre-loaded:

1. **Times Square** (TIMES_SQ)
   - Address: 1500 Broadway, NYC
   - BBL: 1001234567
   - Block: 1003, Lot: 29

2. **DUMBO** (DUMBO)
   - Address: 1 Main Street, Brooklyn
   - BBL: 3002345678
   - Block: 2045, Lot: 15

3. **Long Island City** (LIC)
   - Address: 45-01 21st Street, Queens
   - BBL: 4003456789
   - Block: 3021, Lot: 8

### Accessing Demo Data

- Click search bar, type any part of address/BBL/name
- Press Enter to navigate to location
- Property details auto-populate
- Map flies to location with appropriate zoom

## Feature Status

### Implemented ✅
- Two-panel responsive layout
- Search functionality (address, BBL, name matching)
- Tab navigation system
- Property information display
- Building metrics (stories, area, etc.)
- Development potential metrics (FAR, height, setbacks)
- Map integration (MapLibre GL with CartoDB)
- Demo location loading

### Planned 📋
- 3D envelope visualization (Three.js/react-three-fiber)
- Generate Envelope button integration
- Optimize Massing algorithm
- PDF Report export
- PLUTO data layer on map
- NYC GIS integration for real parcels
- Zoning bonus display & toggles

## Responsive Design

- **Desktop (1200px+)**: Full two-panel layout
- **Tablet (768-1200px)**: Details panel resizes to 320px
- **Mobile (<768px)**: Details panel hidden; map takes full width (toggle button shows/hides)

## File Structure

```
para-zoning-tool/
├── index.html          # Main HTML (redesigned)
├── style.css           # Complete NYC-aesthetic styling
├── app.js              # New interaction logic
├── p5-envelope.js      # Placeholder (3D viz coming soon)
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a browser
2. Map loads centered on NYC (Times Square by default)
3. Use search bar to find other properties
4. Click tabs to view different property information
5. Click action buttons (Generate, Optimize, Export) for analysis

## Next Steps

1. **Integrate real PLUTO data**: Replace demo locations with live NYC GIS API
2. **Add 3D visualization**: Implement Three.js envelope rendering
3. **Zoning rules panel**: Display applicable zoning bonuses & regulations
4. **Report generation**: PDF export with property details + 3D screenshots
5. **Map layers**: PLUTO tax lots, zoning districts, special overlays

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires MapLibre GL support

## Credits

Design inspired by:
- NYC Property Information Portal (PLUTO/Zola)
- Professional tax assessor tools
- City planning dashboards
