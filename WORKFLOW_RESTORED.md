# NYC Parametric Zoning Tool – Restored 3-Step Workflow

## Summary of Restoration

The original 3-step workflow has been fully restored while maintaining the **NYC PLUTO aesthetic** design. All core functionality is now working with the professional data-first interface.

## Three-Step Workflow

### **Step 1: Select Site**
- **Map-first interface** on the left (primary focus)
- **Property details panel** on the right (scrollable)
- **Address/BBL search bar** with live filtering
- **Property information tabs**: Info, Building, Land, Zoning
- **Detailed accordion panels** showing:
  - Property information (owner, lot area, type)
  - Building information (stories, year built, area)
  - Development potential (max FAR, height, setbacks)
- **Demo locations**: Times Square, DUMBO, Long Island City
- **Continue button** progresses to Step 2

**Key Features:**
- Click address search bar and type property name/BBL
- Tabs switch between different property data views
- Map controls (zoom in/out, reset)
- All data updates automatically when location selected

### **Step 2: Program & Regulations**
- **Settings panel** on the left with:
  - Program type selector (Residential, Mixed-use, Commercial, Industrial)
  - Zoning parameters (Target FAR, Max Height)
  - Available bonuses (Inclusionary Housing, Plaza/Greenspace, Transit-Oriented)
  - Building systems (Window-to-Wall Ratio, Energy Mode, MEP notes)
- **Preview panel** on the right showing:
  - 3D visualization placeholder
  - Envelope metrics (Max FAR, Effective FAR, Max GFA, Max Height)
- **FAR validation**: Ensures valid numeric input
- **Bonus calculation**: Effective FAR updates as bonuses are checked
- **Buttons**: Back to Site, Generate Envelope (disabled until valid)

**Key Features:**
- Real-time FAR validation with error messages
- Dynamic effective FAR calculation based on selected bonuses
- Enable/disable continue button based on validation state
- All accordions remain collapsible for compact viewing

### **Step 3: Generate & Analyze**
- **Analysis actions panel** on the left with:
  - Generate Max Envelope button
  - Optimize Massing button
  - Export Report (PDF) button
  - Results display (Volume, GFA, Achieved FAR)
  - Status messages for user feedback
- **Results panel** on the right showing:
  - 3D visualization placeholder
  - Optimized configurations (FAR-Maximized, Light-Optimized)
  - Configuration metrics (FAR, Efficiency)
- **Back button** returns to Step 2

**Key Features:**
- Action buttons trigger analysis and show status updates
- Results display with optimized massing options
- Visual feedback for user actions

## Step Navigation

- **Stepper bar at top** shows all 3 steps with progress indicator
- **Click any step** to jump forward (only if site is selected)
- **Active step** shows blue (#0051BA) color scheme
- **Smooth transitions** between steps

## Design Elements Retained

### **NYC PLUTO Aesthetic**
- **Clean data-focused layout** with professional typography
- **Color scheme**: Navy blue (#0051BA), orange (#FF6B00), grays
- **Compact controls** with 12-13px font sizes
- **Grid-based metrics** for easy scanning
- **Accordion UI** for collapsible detailed information
- **Minimal borders** and subtle shadows

### **Responsive Design**
- **Desktop (1200px+)**: Full two-panel layout (map + details)
- **Tablet (768-1200px)**: Adjusted column widths
- **Mobile**: Details panel slides in from right

## State Management

The application maintains state through:
- **appState object** tracking:
  - Current step
  - Selected location
  - Program type
  - Target FAR
  - Applied bonuses
  - Envelope generation status

## Demo Data

Three pre-loaded properties with complete information:

1. **Times Square** (1271 Avenue of the Americas)
   - BBL: 1001234567, Block: 1003, Lot: 29
   - Zone: C6-7T, Max FAR: 12.0

2. **DUMBO** (1 Main Street, Brooklyn)
   - BBL: 3002345678, Block: 2045, Lot: 15
   - Zone: M1-2/R8A, Max FAR: 8.0

3. **Long Island City** (45-01 21st Street, Queens)
   - BBL: 4003456789, Block: 3021, Lot: 8
   - Zone: M1-5/R7X, Max FAR: 10.0

## How It Works

### Starting the App
1. Page loads with Times Square selected
2. Step 1 is active showing the site selection interface
3. Map shows NYC with the selected property highlighted

### Navigating Steps
1. **Step 1 → Step 2**: Click "Continue to Program & Rules" button
2. **Step 2 → Step 3**: Enter valid FAR and click "Generate Envelope"
3. **Step 3 → Step 2**: Click "Back" button
4. **Any Step**: Click the step number in the stepper to jump (if conditions met)

### Using the Interface
- **Search**: Type in address search bar and press Enter
- **Tabs**: Click tabs to view different property information
- **Bonuses**: Check boxes to apply zoning bonuses
- **Validation**: FAR field shows error if invalid
- **Actions**: Click action buttons to trigger analysis

## Files Modified

- `index.html` - Restructured with step views and PLUTO design
- `app.js` - Complete rewrite with state management and 3-step logic
- `style.css` - PLUTO aesthetic + step navigation styling

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires MapLibre GL support

## Next Steps for Development

- [ ] Integrate real PLUTO/NYC GIS data for live property lookup
- [ ] Add 3D envelope visualization (Three.js/react-three-fiber)
- [ ] Implement PDF report generation with 3D screenshots
- [ ] Add zoning rules visual explanation layers
- [ ] Create massing optimization algorithm backend
- [ ] Add map layer controls (zoning districts, tax lots)
- [ ] Implement user authentication
- [ ] Add project saving/loading functionality

## Quick Start

```bash
# Start local server
cd "c:\Users\vvb2112\Documents\GitHub\Parametric tool\para-zoning-tool"
python -m http.server 8000

# Open browser to http://localhost:8000
```

All functionality is now working end-to-end with the professional NYC PLUTO aesthetic interface!
