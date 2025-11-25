// Helper to update main view for step
function updateMainViewForStep(stepIndex) {
  // Toggle .active on step buttons and panels
  document.querySelectorAll('.stepper .step').forEach((step, idx) => {
    step.classList.toggle('active', idx === stepIndex - 1);
  });
  document.querySelectorAll('.step-view').forEach((panel, idx) => {
    panel.classList.toggle('active', idx === stepIndex - 1);
  });

  // Map/Envelope view logic
  const mapTab = document.getElementById('tab-map');
  const envelopeTab = document.getElementById('tab-envelope');
  const mapView = document.getElementById('map-view');
  const envelopeView = document.getElementById('envelope-view');
  if (stepIndex === 1 || stepIndex === 2) {
    // Always show map view only
    mapTab.classList.add('active');
    envelopeTab.classList.remove('active');
    mapView.classList.add('active');
    envelopeView.classList.remove('active');
    mapView.style.display = '';
    envelopeView.style.display = 'none';
  } else if (stepIndex === 3) {
    if (window.currentEnvelope) {
      // Show 3D envelope view
      mapTab.classList.remove('active');
      envelopeTab.classList.add('active');
      mapView.classList.remove('active');
      envelopeView.classList.add('active');
      mapView.style.display = 'none';
      envelopeView.style.display = '';
    } else {
      // Fall back to map view
      mapTab.classList.add('active');
      envelopeTab.classList.remove('active');
      mapView.classList.add('active');
      envelopeView.classList.remove('active');
      mapView.style.display = '';
      envelopeView.style.display = 'none';
    }
  }
}

// Override step navigation to use updateMainViewForStep
document.getElementById('step1-continue').addEventListener('click', function() {
  updateMainViewForStep(2);
});
document.getElementById('step2-back').addEventListener('click', function() {
  updateMainViewForStep(1);
});
document.getElementById('step2-continue').addEventListener('click', async function() {
  // Gather program settings from Step 2
  const programSettings = {
    far: document.getElementById('far').value,
    maxHeight: document.getElementById('max-height').value,
    bonuses: Array.from(document.querySelectorAll('.bonus-check:checked')).map(chk => chk.value)
    // Add more fields as needed
  };
  // Call getEnvelope
  window.currentEnvelope = await getEnvelope(window.selectedSite, programSettings);

  // Enable 3D Envelope tab
  const tabEnvelope = document.getElementById('tab-envelope');
  tabEnvelope.disabled = false;

  // Switch to Step 3 and update view
  updateMainViewForStep(3);
});
document.getElementById('step3-back').addEventListener('click', function() {
  updateMainViewForStep(2);
});

// Also call updateMainViewForStep on direct stepper clicks
document.querySelectorAll('.step').forEach(el => {
  el.addEventListener('click', () => {
    const step = Number(el.dataset.step);
    if (window.selectedSite || step === 1) {
      updateMainViewForStep(step);
    }
  });
});
// Mocked async function to get envelope geometry
async function getEnvelope(selectedSite, programSettings) {
  // Simulate async fetch and return placeholder geometry
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        type: 'Envelope',
        site: selectedSite,
        settings: programSettings,
        geometry: {
          vertices: [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,10],[1,0,10],[1,1,10],[0,1,10]],
          faces: [[0,1,2,3],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]]
        }
      });
    }, 500);
  });
}

// Global envelope object
window.currentEnvelope = null;

// Step 2 Generate Envelope button logic
document.getElementById('step2-continue').addEventListener('click', async function() {
  // Gather program settings from Step 2
  const programSettings = {
    far: document.getElementById('far').value,
    maxHeight: document.getElementById('max-height').value,
    bonuses: Array.from(document.querySelectorAll('.bonus-check:checked')).map(chk => chk.value)
    // Add more fields as needed
  };
  // Call getEnvelope
  window.currentEnvelope = await getEnvelope(window.selectedSite, programSettings);

  // Enable 3D Envelope tab
  const tabEnvelope = document.getElementById('tab-envelope');
  tabEnvelope.disabled = false;

  // Switch to 3D Envelope tab and view
  document.getElementById('tab-map').classList.remove('active');
  tabEnvelope.classList.add('active');
  document.getElementById('map-view').classList.remove('active');
  document.getElementById('envelope-view').classList.add('active');
});
// ============================================
// NYC PLUTO AESTHETIC - 3-STEP WORKFLOW
// ============================================

// STATE MANAGEMENT
let appState = {
  currentStep: 1,
  selectedLocation: null,
  programType: 'Residential',
  targetFAR: null,
  appliedBonuses: [],
  envelopeGenerated: false
};

// DEMO LOCATIONS
const demoLocations = {
    BK09: {
      id: 'BK09',
      center: [-73.95, 40.66],
      zoom: 14,
      address: '1010 Nostrand Ave - Brooklyn 11225',
      borough: 'Brooklyn',
      block: 1290,
      lot: 1,
      bbl: '3012900001',
      owner: 'Crown Heights Realty LLC',
      lotarea: '5,000 sf',
      buildings: '1',
      year: '1930',
      stories: '6',
      area: '30,000 sf',
      construct: 'Masonry',
      frontage: '50 ft',
      depth: '100 ft',
      basements: 'No',
      land: '5,000 sf',
      shape: 'Rectangular',
      corner: 'No',
      value: '$2,500,000',
      zone: 'R7D',
      cb: 'Brooklyn 309',
      special: 'None',
      historic: 'No',
      maxfar: '4.2',
      height: '80 ft'
    },
  TIMES_SQ: {
    id: 'TIMES_SQ',
    center: [-73.9855, 40.7580],
    zoom: 16,
    address: '1271 AVENUE OF THE AMERICAS - NEW YORK 10020',
    borough: 'Manhattan',
    block: 1003,
    lot: 29,
    bbl: '1001234567',
    owner: 'Times Square Properties Inc',
    lotarea: '8,250 sf',
    buildings: '2',
    year: '1961',
    stories: '47',
    area: '1,962,900 sf',
    construct: 'Fireproof Steel',
    frontage: '201 ft',
    depth: '410 ft',
    basements: 'Yes',
    land: '8,250 sf',
    shape: 'Regular',
    corner: 'Yes',
    value: '$542,600,000',
    zone: 'C6-7T',
    cb: 'Manhattan 105',
    special: 'None',
    historic: 'No',
    maxfar: '12.0',
    height: '1000 ft'
  },
  DUMBO: {
    id: 'DUMBO',
    center: [-73.9897, 40.7029],
    zoom: 16,
    address: '1 MAIN STREET - BROOKLYN 11201',
    borough: 'Brooklyn',
    block: 2045,
    lot: 15,
    bbl: '3002345678',
    owner: 'DUMBO Development LLC',
    lotarea: '6,400 sf',
    buildings: '1',
    year: '1985',
    stories: '6',
    area: '780,000 sf',
    construct: 'Masonry',
    frontage: '180 ft',
    depth: '320 ft',
    basements: 'Partial',
    land: '6,400 sf',
    shape: 'Irregular',
    corner: 'No',
    value: '$185,300,000',
    zone: 'M1-2/R8A',
    cb: 'Brooklyn 202',
    special: 'DUMBO Historic District',
    historic: 'Yes',
    maxfar: '8.0',
    height: '500 ft'
  },
  LIC: {
    id: 'LIC',
    center: [-73.9449, 40.7447],
    zoom: 15,
    address: '45-01 21st STREET - LONG ISLAND CITY 11101',
    borough: 'Queens',
    block: 3021,
    lot: 8,
    bbl: '4003456789',
    owner: 'LIC Partners',
    lotarea: '9,100 sf',
    buildings: '3',
    year: '1978',
    stories: '12',
    area: '1,450,000 sf',
    construct: 'Steel Frame',
    frontage: '220 ft',
    depth: '410 ft',
    basements: 'Yes',
    land: '9,100 sf',
    shape: 'Regular',
    corner: 'Yes',
    value: '$315,800,000',
    zone: 'M1-5/R7X',
    cb: 'Queens 501',
    special: 'None',
    historic: 'No',
    maxfar: '10.0',
    height: '800 ft'
  }
};

// INITIALIZE MAP
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  center: [-73.95, 40.66],
  zoom: 14
});

map.addControl(new maplibregl.NavigationControl(), 'top-right');
map.addControl(new maplibregl.ScaleControl({ maxWidth: 80, unit: 'imperial' }), 'bottom-left');

// STEP NAVIGATION
function setActiveStep(step) {
  if (step < 1 || step > 3) return;
  
  // Hide all views
  document.querySelectorAll('.step-view').forEach(el => el.classList.remove('active'));
  
  // Show active view
  document.getElementById(`step-${step}`).classList.add('active');
  
  // Update stepper
  document.querySelectorAll('.step').forEach((el, idx) => {
    el.classList.toggle('active', (idx + 1) === step);
  });
  
  appState.currentStep = step;
}
// Step navigation logic
function setActiveStep(stepNum) {
  document.querySelectorAll('.step-view').forEach(view => {
    view.classList.remove('active');
  });
  const activeView = document.getElementById(`step-${stepNum}`);
  if (activeView) activeView.classList.add('active');

  // Update stepper indicator
  document.querySelectorAll('.stepper .step').forEach((step, idx) => {
    step.classList.toggle('active', idx === stepNum - 1);
  });
}

// Button event listeners
document.getElementById('step1-continue').addEventListener('click', function() {
  setActiveStep(2);
});
document.getElementById('step2-back').addEventListener('click', function() {
  setActiveStep(1);
});
document.getElementById('step2-continue').addEventListener('click', function() {
  setActiveStep(3);
});
document.getElementById('step3-back').addEventListener('click', function() {
  setActiveStep(2);
});

// Stepper click
document.querySelectorAll('.step').forEach(el => {
  el.addEventListener('click', () => {
    const step = Number(el.dataset.step);
    if (appState.selectedLocation || step === 1) {
      setActiveStep(step);
    }
  });
});

// PROPERTY SELECTION & DETAILS
function selectLocation(locKey) {
  const loc = demoLocations[locKey];
  appState.selectedLocation = locKey;
  
  // Update map
  map.flyTo({ center: loc.center, zoom: loc.zoom, essential: true });
  
  // Update all property details
  updatePropertyDisplay(loc);
  
  // Enable continue button
  document.getElementById('step1-continue').disabled = false;
}
    
    // Global object to store selected site details
    window.selectedSite = {
      address: '',
      bbl: '',
      borough: '',
      block: '',
      lot: '',
      lotArea: '',
      zoning: ''
    };
    
    // Example function to handle parcel selection
    function selectParcel(parcelData) {
      // Update global selectedSite object
      window.selectedSite.address = parcelData.address || '';
      window.selectedSite.bbl = parcelData.bbl || '';
      window.selectedSite.borough = parcelData.borough || '';
      window.selectedSite.block = parcelData.block || '';
      window.selectedSite.lot = parcelData.lot || '';
      window.selectedSite.lotArea = parcelData.lotArea || '';
      window.selectedSite.zoning = parcelData.zoning || '';
    
      // Update UI fields
      document.getElementById('prop-address').textContent = window.selectedSite.address;
      document.getElementById('prop-borough').textContent = window.selectedSite.borough;
      document.getElementById('prop-block').textContent = window.selectedSite.block;
      document.getElementById('prop-lot').textContent = window.selectedSite.lot;
      document.getElementById('prop-lotarea').textContent = window.selectedSite.lotArea;
      document.getElementById('metric-zone').textContent = window.selectedSite.zoning;
    
      // Enable the continue button
      document.getElementById('step1-continue').disabled = false;
    }

function updatePropertyDisplay(loc) {
  // Info tab
  document.getElementById('prop-address').textContent = loc.address;
  document.getElementById('prop-borough').textContent = loc.borough;
  document.getElementById('prop-block').textContent = loc.block;
  document.getElementById('prop-lot').textContent = loc.lot;
  document.getElementById('prop-owner').textContent = loc.owner;
  document.getElementById('prop-lotarea').textContent = loc.lotarea;
  document.getElementById('prop-type').textContent = loc.zone;
  document.getElementById('bldg-count').textContent = loc.buildings;
  document.getElementById('bldg-year').textContent = loc.year;
  document.getElementById('bldg-stories').textContent = loc.stories;
  document.getElementById('bldg-area').textContent = loc.area;
  document.getElementById('dev-maxfar').textContent = loc.maxfar;
  document.getElementById('dev-height').textContent = loc.height;
  
  // Building tab
  document.getElementById('metric-construct').textContent = loc.construct;
  document.getElementById('metric-frontage').textContent = loc.frontage;
  document.getElementById('metric-depth').textContent = loc.depth;
  document.getElementById('metric-basements').textContent = loc.basements;
  
  // Land tab
  document.getElementById('metric-land').textContent = loc.land;
  document.getElementById('metric-shape').textContent = loc.shape;
  document.getElementById('metric-corner').textContent = loc.corner;
  document.getElementById('metric-value').textContent = loc.value;
  
  // Zoning tab
  document.getElementById('metric-zone').textContent = loc.zone;
  document.getElementById('metric-cb').textContent = loc.cb;
  document.getElementById('metric-special').textContent = loc.special;
  document.getElementById('metric-historic').textContent = loc.historic;
  
  // Update search
  document.getElementById('address-search').value = loc.address;
}

// TAB SWITCHING
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    const tabGroup = btn.closest('.quick-tabs').parentElement;
    
    tabGroup.querySelectorAll('.tab-content').forEach(content => {
      content.style.display = 'none';
    });
    tabGroup.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('active');
    });
    
    document.getElementById(tabId).style.display = 'block';
    btn.classList.add('active');
  });
});

// ADDRESS SEARCH
document.getElementById('address-search').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = e.target.value.toLowerCase();
    
    for (const [key, loc] of Object.entries(demoLocations)) {
      if (loc.address.toLowerCase().includes(query) || 
          loc.bbl.includes(query)) {
        selectLocation(key);
        break;
      }
    }
  }
});

// MAP CONTROLS
document.querySelectorAll('.map-btn').forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    if (idx === 0) map.zoomIn();
    else if (idx === 1) map.zoomOut();
    else map.flyTo({ center: [-73.9856, 40.7497], zoom: 13 });
  });
});

// STEP 1: CONTINUE
document.getElementById('step1-continue').addEventListener('click', () => {
  if (appState.selectedLocation) {
    const loc = demoLocations[appState.selectedLocation];
    document.getElementById('preview-maxfar').textContent = loc.maxfar;
    document.getElementById('preview-height').textContent = loc.height;
    setActiveStep(2);
  }
});

// STEP 2: VALIDATION & BONUSES
function validateStep2() {
  const far = document.getElementById('far').value.trim();
  const farError = document.getElementById('far-error');
  
  if (!far) {
    farError.textContent = 'Enter target FAR';
    return false;
  }
  
  const farNum = parseFloat(far);
  if (isNaN(farNum) || farNum <= 0 || farNum > 20) {
    farError.textContent = 'FAR must be 0.1–20';
    return false;
  }
  
  farError.textContent = '';
  return true;
}

document.getElementById('far').addEventListener('input', () => {
  validateStep2();
  updateEffectiveFAR();
});

document.querySelectorAll('.bonus-check').forEach(check => {
  check.addEventListener('change', updateEffectiveFAR);
});

function updateEffectiveFAR() {
  if (!appState.selectedLocation) return;
  
  const loc = demoLocations[appState.selectedLocation];
  let baseFAR = parseFloat(loc.maxfar);
  let effectiveFAR = baseFAR;
  
  const bonuses = document.querySelectorAll('.bonus-check:checked');
  bonuses.forEach(bonus => {
    if (bonus.value === 'inclusionary') effectiveFAR += baseFAR * 0.20;
    else if (bonus.value === 'plaza') effectiveFAR += baseFAR * 0.10;
    else if (bonus.value === 'transit') effectiveFAR += baseFAR * 0.15;
  });
  
  document.getElementById('preview-effar').textContent = effectiveFAR.toFixed(2);
  
  // Enable continue if FAR is valid
  const isValid = validateStep2();
  document.getElementById('step2-continue').disabled = !isValid;
}

document.getElementById('step2-continue').addEventListener('click', () => {
  if (validateStep2()) {
    appState.envelopeGenerated = true;
    setActiveStep(3);
  }
});

document.getElementById('step2-back').addEventListener('click', () => setActiveStep(1));

// STEP 3: ACTIONS
document.getElementById('generate-envelope').addEventListener('click', () => {
  const msg = document.getElementById('status-msg');
  msg.textContent = '✓ Envelope generated for ' + demoLocations[appState.selectedLocation].address;
  msg.classList.remove('error');
  msg.classList.add('success');
  msg.style.display = 'block';
});

document.getElementById('optimize-massing').addEventListener('click', () => {
  const msg = document.getElementById('status-msg');
  msg.textContent = '✓ Optimized massing calculations complete';
  msg.classList.remove('error');
  msg.classList.add('success');
  msg.style.display = 'block';
});

document.getElementById('export-report').addEventListener('click', () => {
  if (appState.selectedLocation) {
    const loc = demoLocations[appState.selectedLocation];
    alert('Exporting PDF report for ' + loc.address);
    // PDF generation would happen here
  }
});

document.getElementById('step3-back').addEventListener('click', () => setActiveStep(2));

// LOAD DEFAULT DATA
selectLocation('BK09');
setActiveStep(1);
// Load zoning rules for a given BBL and populate Step 2 fields
async function loadZoningRules(bbl) {
  try {
    const response = await fetch('mock-rules.json');
    const rules = await response.json();
    const zoning = rules[bbl];
    if (!zoning) {
      // No rules found for this BBL
      document.getElementById('far').value = '';
      document.getElementById('max-height').value = '';
      document.getElementById('step2-continue').disabled = true;
      return;
    }
    // Populate FAR and max height
    document.getElementById('far').value = zoning.far;
    document.getElementById('max-height').value = zoning.maxHeight;
    // Populate yards (if you have yard fields, add them here)
    // Example: document.getElementById('yard-front').value = zoning.yards.front;
    // Example: document.getElementById('yard-side').value = zoning.yards.side;
    // Example: document.getElementById('yard-rear').value = zoning.yards.rear;
    // Populate bonuses
    const bonuses = zoning.bonuses || [];
    document.querySelectorAll('.bonus-check').forEach(chk => {
      chk.checked = bonuses.includes(chk.value);
    });
    // Enable continue button
    document.getElementById('step2-continue').disabled = false;
  } catch (err) {
    console.error('Error loading zoning rules:', err);
  }
}
