// ============================================================
// Random Color Generator — full-featured
// ============================================================

const colorDisplay   = document.getElementById('colorDisplay');
const colorHex       = document.getElementById('colorHex');
const hexValue       = document.getElementById('hexValue');
const rgbValue       = document.getElementById('rgbValue');
const generateBtn   = document.getElementById('generateBtn');
const copyBtn       = document.getElementById('copyBtn');
const toggleBtn     = document.getElementById('toggleBtn');
const clearBtn      = document.getElementById('clearBtn');
const historyList   = document.getElementById('historyList');

// ---- State -------------------------------------------------

const MAX_HISTORY = 12;
let history       = [];
let autoInterval  = null;
let isAuto        = false;

// ---- Core: generate random hex color -----------------------

function randomHexColor() {
  const hex = Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0');
  return `#${hex.toUpperCase()}`;
}

// ---- Core: hex → RGB string --------------------------------

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// ---- Update the UI with a new color ------------------------

function applyColor(hex) {
  colorDisplay.style.background = hex;
  colorHex.textContent          = hex;
  hexValue.textContent          = hex;
  rgbValue.textContent          = hexToRgb(hex);
}

// ---- Add to history and re-render --------------------------

function addToHistory(hex) {
  // Don't duplicate the most recent color
  if (history[0] === hex) return;

  history.unshift(hex);
  if (history.length > MAX_HISTORY) history.pop();
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML =
      '<span class="history-empty">No colors yet</span>';
    return;
  }

  history.forEach((hex) => {
    const swatch = document.createElement('div');
    swatch.className = 'history-swatch';
    swatch.style.background = hex;
    swatch.title = hex;
    swatch.addEventListener('click', () => {
      applyColor(hex);
    });
    historyList.appendChild(swatch);
  });
}

// ---- Generate a brand-new color ----------------------------

function generateNewColor() {
  const hex = randomHexColor();
  applyColor(hex);
  addToHistory(hex);

  // Subtle card glow on generation
  const card = document.querySelector('.color-card');
  card.style.transition = 'box-shadow 0.3s ease';
  card.style.boxShadow = `0 20px 60px ${hex}44`;
  setTimeout(() => {
    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
  }, 600);
}

// ---- Copy HEX to clipboard ---------------------------------

async function copyHex() {
  const hex = hexValue.textContent;
  try {
    await navigator.clipboard.writeText(hex);
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy HEX';
    }, 1500);
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = hex;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyBtn.textContent = '✅ Copied!';
    setTimeout(() => {
      copyBtn.textContent = '📋 Copy HEX';
    }, 1500);
  }
}

// ---- Auto-generate toggle ----------------------------------

function toggleAuto() {
  isAuto = !isAuto;

  if (isAuto) {
    generateNewColor(); // fire one immediately
    autoInterval = setInterval(generateNewColor, 800);
    toggleBtn.textContent = '⏹ Stop';
    toggleBtn.classList.add('active');
  } else {
    clearInterval(autoInterval);
    autoInterval = null;
    toggleBtn.textContent = '▶ Auto';
    toggleBtn.classList.remove('active');
  }
}

// ---- Clear history -----------------------------------------

function clearHistory() {
  history = [];
  renderHistory();
}

// ---- Keyboard shortcut: Spacebar to generate ----------------

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    // Don't capture space when user is focused inside a button
    // (accessibility: buttons activate on Space already)
    if (document.activeElement?.tagName === 'BUTTON') return;
    e.preventDefault();
    generateNewColor();
  }
});

// ---- Event listeners ---------------------------------------

generateBtn.addEventListener('click', generateNewColor);
copyBtn.addEventListener('click', copyHex);
toggleBtn.addEventListener('click', toggleAuto);
clearBtn.addEventListener('click', clearHistory);

// ---- Seed with one color on load ---------------------------

generateNewColor();
