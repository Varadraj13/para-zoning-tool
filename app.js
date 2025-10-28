// Minimal interactivity for the wireframe (no frameworks)
const steps = {
  1: document.getElementById('step-1'),
  2: document.getElementById('step-2'),
  3: document.getElementById('step-3'),
};
const stepEls = Array.from(document.querySelectorAll('.stepper .step'));

function setActiveStep(n) {
  Object.entries(steps).forEach(([k, el]) => {
    el.hidden = Number(k) !== n;
  });
  stepEls.forEach(el => {
    el.classList.toggle('active', Number(el.dataset.step) === n);
  });
}

document.getElementById('to-step-2').addEventListener('click', () => setActiveStep(2));
document.getElementById('to-step-3').addEventListener('click', () => setActiveStep(3));

// Initialize the map with OpenStreetMap data
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'osm': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap contributors'
      }
    },
    layers: [{
      id: 'osm',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 19
    }]
  },
  center: [-73.9856, 40.7497], // New York City coordinates
  zoom: 13
});

// Add navigation controls
map.addControl(new maplibregl.NavigationControl(), 'top-right');

// Add scale control
map.addControl(new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'imperial'
}), 'bottom-left');

// Define demo plot coordinates (actual GPS coordinates)
const demoPlots = {
  'TIMES_SQ': {
    center: [-73.9855, 40.7580],
    zoom: 16
  },
  'DUMBO': {
    center: [-73.9897, 40.7029],
    zoom: 16
  },
  'LIC': {
    center: [-73.9449, 40.7447],
    zoom: 15
  }
};

const summaryEl = document.getElementById('summary');
const plotButtons = Array.from(document.querySelectorAll('.plot-btn'));

// Add click handlers for the plot buttons
plotButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const plotId = btn.dataset.plot;
    const plot = demoPlots[plotId];
    
    map.flyTo({
      center: plot.center,
      zoom: plot.zoom,
      essential: true
    });
  });
});

// Add reset view handler
document.getElementById('reset-view').addEventListener('click', () => {
  map.flyTo({
    center: [-73.9856, 40.7497],
    zoom: 13,
    essential: true
  });
});

function setSummary(data) {
  summaryEl.classList.remove('muted');
  summaryEl.innerHTML = `
    <div class="summary-grid">
      <strong>Address</strong> <span>${data.address}</span>
      <strong>Lot Area</strong> <span>${data.lotArea.toLocaleString()} sf</span>
      <strong>Zoning</strong> <span>${data.zoning}</span>
      <strong>Owner</strong> <span>${data.owner}</span>
    </div>
  `;
}

// selection summary layout
const style = document.createElement('style');
style.textContent = `
.summary-grid { display:grid; grid-template-columns:120px 1fr; gap:6px 12px; align-items:center; }
`;
document.head.appendChild(style);

plotButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.plot;
    plotButtons.forEach(b => b.classList.toggle('selected', b === btn));
    // Update polyline
    polylineEl.setAttribute('points', demoPolylines[key] || '');
    // Update summary with mocked values
    const data = ({
      'TIMES_SQ': { address: 'Times Sq, New York, NY', lotArea: 8250, zoning: 'C6-7T', owner: 'Unknown / NYC DOF' },
      'DUMBO': { address: 'DUMBO, Brooklyn, NY', lotArea: 6400, zoning: 'M1-2/R8A', owner: 'Unknown / NYC DOF' },
      'LIC': { address: 'Long Island City, Queens, NY', lotArea: 9100, zoning: 'M1-5/R7X', owner: 'Unknown / NYC DOF' },
    })[key];
    setSummary(data);
  });
});

// Validation for FAR and WWR (Step 2)
const farInput = document.getElementById('far');
const farError = document.getElementById('far-error');
const wwrInput = document.getElementById('wwr');
const wwrError = document.getElementById('wwr-error');
const gateBtn = document.getElementById('to-step-3');

function validateFAR() {
  const val = farInput.value.trim();
  if (val === '') { farError.textContent = ''; return true; }
  const num = Number(val);
  if (Number.isNaN(num)) { farError.textContent = 'Enter a numeric FAR'; return false; }
  if (num <= 0 || num > 20) { farError.textContent = 'FAR must be between 0.1 and 20'; return false; }
  farError.textContent = ''; return true;
}

function validateWWR() {
  const val = wwrInput.value.trim();
  if (val === '') { wwrError.textContent = ''; return true; }
  const num = Number(val);
  if (Number.isNaN(num)) { wwrError.textContent = 'Enter a numeric %'; return false; }
  if (num < 0 || num > 95) { wwrError.textContent = 'WWR must be 0–95%'; return false; }
  wwrError.textContent = ''; return true;
}

function recomputeGate() {
  const ok = validateFAR() && validateWWR();
  gateBtn.disabled = !ok;
}

farInput.addEventListener('input', recomputeGate);
wwrInput.addEventListener('input', recomputeGate);

// Allow clicking steps to navigate (wireframe convenience)
stepEls.forEach(el => {
  el.addEventListener('click', () => setActiveStep(Number(el.dataset.step)));
});

// Initialize
setActiveStep(1);
recomputeGate();
