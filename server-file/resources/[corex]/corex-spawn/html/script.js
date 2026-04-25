/**
 * COREX Outfit - UI Script
 * Handles clothing customization interface
 */

// Resource name constant (used for NUI callbacks)
const RESOURCE_NAME = 'corex-spawn';

// Category configurations
const categories = {
    face: {
        title: 'FACE & GENES'
    },
    mask: {
        title: 'MASKS',
        components: [
            { id: 1, label: 'MASK MODEL', key: 'mask' }
        ]
    },
    hair: {
        title: 'HAIR & EYES',
        components: [
            { id: 2, label: 'HAIR STYLE', key: 'hair' }
        ]
    },
    torso: {
        title: 'UPPER BODY',
        components: [
            { id: 3, label: 'HANDS / ARMS', key: 'hands' },
            { id: 8, label: 'UNDERSHIRT', key: 'undershirt' },
            { id: 10, label: 'DECALS', key: 'decals' },
            { id: 11, label: 'JACKETS / TOPS', key: 'tops' }
        ]
    },
    legs: {
        title: 'LEGS & PANTS',
        components: [
            { id: 4, label: 'PANTS / LEGS', key: 'legs' }
        ]
    },
    shoes: {
        title: 'SHOES & FEET',
        components: [
            { id: 6, label: 'SHOES', key: 'shoes' }
        ]
    },
    accessories: {
        title: 'ACCESSORIES',
        components: [
            { id: 5, label: 'BAGS / PARACHUTE', key: 'bags' },
            { id: 7, label: 'ACCESSORY', key: 'accessory' },
            { id: 9, label: 'BODY ARMOR', key: 'kevlar' }
        ],
        props: [
            { id: 0, label: 'HATS / HELMETS', key: 'hats' },
            { id: 1, label: 'GLASSES', key: 'glasses' },
            { id: 2, label: 'EARRINGS', key: 'ears' },
            { id: 6, label: 'WATCHES', key: 'watches' },
            { id: 7, label: 'BRACELETS', key: 'bracelets' }
        ]
    }
};

const HEAD_BLEND_FIELDS = [
    { key: 'shapeFirst', label: 'FATHER FACE', min: 0, max: 45, step: 1 },
    { key: 'shapeSecond', label: 'MOTHER FACE', min: 0, max: 45, step: 1 },
    { key: 'shapeThird', label: 'THIRD FACE', min: 0, max: 45, step: 1 },
    { key: 'skinFirst', label: 'FATHER SKIN', min: 0, max: 45, step: 1 },
    { key: 'skinSecond', label: 'MOTHER SKIN', min: 0, max: 45, step: 1 },
    { key: 'skinThird', label: 'THIRD SKIN', min: 0, max: 45, step: 1 },
    { key: 'shapeMix', label: 'FACE MIX', min: 0, max: 1, step: 0.1 },
    { key: 'skinMix', label: 'SKIN MIX', min: 0, max: 1, step: 0.1 },
    { key: 'thirdMix', label: 'THIRD MIX', min: 0, max: 1, step: 0.1 }
];

const FACE_FEATURE_FIELDS = [
    { key: 'noseWidth', label: 'NOSE WIDTH' },
    { key: 'nosePeakHigh', label: 'NOSE PEAK HEIGHT' },
    { key: 'nosePeakSize', label: 'NOSE PEAK LENGTH' },
    { key: 'noseBoneHigh', label: 'NOSE BONE HEIGHT' },
    { key: 'nosePeakLowering', label: 'NOSE TIP LOWERING' },
    { key: 'noseBoneTwist', label: 'NOSE BONE TWIST' },
    { key: 'eyeBrownHigh', label: 'BROW HEIGHT' },
    { key: 'eyeBrownForward', label: 'BROW FORWARD' },
    { key: 'cheeksBoneHigh', label: 'CHEEKBONE HEIGHT' },
    { key: 'cheeksBoneWidth', label: 'CHEEKBONE WIDTH' },
    { key: 'cheeksWidth', label: 'CHEEKS WIDTH' },
    { key: 'eyesOpening', label: 'EYE OPENING' },
    { key: 'lipsThickness', label: 'LIPS THICKNESS' },
    { key: 'jawBoneWidth', label: 'JAW WIDTH' },
    { key: 'jawBoneBackSize', label: 'JAW HEIGHT' },
    { key: 'chinBoneLowering', label: 'CHIN LOWERING' },
    { key: 'chinBoneLenght', label: 'CHIN LENGTH' },
    { key: 'chinBoneSize', label: 'CHIN SIZE' },
    { key: 'chinHole', label: 'CHIN HOLE' },
    { key: 'neckThickness', label: 'NECK THICKNESS' }
];

const HEAD_OVERLAY_FIELDS = [
    { key: 'blemishes', label: 'BLEMISHES', hasColor: false },
    { key: 'beard', label: 'BEARD', hasColor: true, palette: 'hair' },
    { key: 'eyebrows', label: 'EYEBROWS', hasColor: true, palette: 'hair' },
    { key: 'ageing', label: 'AGEING', hasColor: false },
    { key: 'makeUp', label: 'MAKEUP', hasColor: true, palette: 'makeUp' },
    { key: 'blush', label: 'BLUSH', hasColor: true, palette: 'makeUp' },
    { key: 'complexion', label: 'COMPLEXION', hasColor: false },
    { key: 'sunDamage', label: 'SUN DAMAGE', hasColor: false },
    { key: 'lipstick', label: 'LIPSTICK', hasColor: true, palette: 'makeUp' },
    { key: 'moleAndFreckles', label: 'MOLES & FRECKLES', hasColor: false },
    { key: 'chestHair', label: 'CHEST HAIR', hasColor: true, palette: 'hair' },
    { key: 'bodyBlemishes', label: 'BODY BLEMISHES', hasColor: false }
];

const EYE_COLOR_SWATCHES = [
    '#6fa54d',
    '#2f8f66',
    '#8ac5ff',
    '#4f7fd8',
    '#9a7447',
    '#5b3b25',
    '#8b7a42',
    '#4b4f57',
    '#9aa0a8',
    '#d890bc',
    '#e2c44f',
    '#7c59c8',
    '#101010',
    '#7a818c',
    'linear-gradient(135deg, #ffcf66 0%, #ff7f3f 100%)',
    'linear-gradient(135deg, #d7ff57 0%, #58d652 100%)',
    'linear-gradient(135deg, #73bfff 0%, #905cff 100%)',
    'linear-gradient(135deg, #ff4b4b 0%, #a30000 100%)',
    'linear-gradient(135deg, #83ffd7 0%, #37b7ff 100%)',
    'linear-gradient(135deg, #0d0d0d 0%, #0d0d0d 50%, #f5f5f5 50%, #f5f5f5 100%)',
    'radial-gradient(circle, #ffe58f 0 25%, #6a4517 26% 55%, #e6e6e6 56% 100%)',
    'linear-gradient(135deg, #c8f26b 0%, #587e29 100%)',
    'linear-gradient(135deg, #ff9c47 0%, #7a0d0d 100%)',
    'linear-gradient(135deg, #8cff91 0%, #3d5a47 100%)',
    'linear-gradient(135deg, #d6c1a1 0%, #7a6242 100%)',
    'radial-gradient(circle at 30% 35%, #2c2c2c 0 10%, transparent 11%), radial-gradient(circle at 70% 35%, #2c2c2c 0 10%, transparent 11%), linear-gradient(180deg, #ffd84a 0%, #e6ab00 100%)',
    'linear-gradient(135deg, #f5f5f5 0%, #ff5555 100%)',
    'linear-gradient(135deg, #ff3b30 0%, #3b0000 100%)',
    'linear-gradient(135deg, #d8f27a 0%, #7f9340 100%)',
    'linear-gradient(135deg, #86ffec 0%, #4f74ff 100%)',
    'linear-gradient(135deg, #d9dfe5 0%, #5b646f 100%)',
    'linear-gradient(135deg, #8caf6d 0%, #435534 100%)'
];

let currentCategory = 'face';
let clothingData = null;
let currentMode = 'creation';
let allowCancel = false;
let isCameraDragging = false;
let lastCameraDragY = 0;
let currentSkin = {
    components: {},
    props: {},
    headBlend: {},
    faceFeatures: {},
    headOverlays: {},
    hair: {},
    eyeColor: { value: 0, max: 31 }
};

// DOM Elements
const uiContainer = document.getElementById('ui-container');
const categoryTitle = document.getElementById('category-title');
const itemCount = document.getElementById('item-count');
const controlsContainer = document.getElementById('controls-container');
const cancelButton = document.getElementById('btn-cancel');
const clothingPanel = document.querySelector('.clothing-panel');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderControls();
        });
    });

    // Gender buttons
    document.querySelectorAll('.gender-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            changeGender(btn.dataset.gender);
        });
    });

    // Rotation buttons
    document.getElementById('rotate-left').addEventListener('click', () => {
        fetch(`https://${RESOURCE_NAME}/rotateCharacter`, {
            method: 'POST',
            body: JSON.stringify({ direction: 'left' })
        });
    });

    document.getElementById('rotate-right').addEventListener('click', () => {
        fetch(`https://${RESOURCE_NAME}/rotateCharacter`, {
            method: 'POST',
            body: JSON.stringify({ direction: 'right' })
        });
    });

    // Action buttons
    cancelButton.addEventListener('click', () => {
        if (!allowCancel) return;
        closeUI();
    });
    document.getElementById('btn-confirm').addEventListener('click', confirmSelection);

    // Keyboard controls - only Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && allowCancel) {
            closeUI();
        }
    });

    // Mouse wheel for zoom
    document.addEventListener('wheel', (e) => {
        if (clothingPanel && e.target instanceof Element && e.target.closest('.clothing-panel')) {
            return;
        }

        e.preventDefault();
        const direction = e.deltaY > 0 ? 'out' : 'in';
        fetch(`https://${RESOURCE_NAME}/zoomCamera`, {
            method: 'POST',
            body: JSON.stringify({ direction: direction })
        });
    }, { passive: false });

    document.addEventListener('mousedown', (e) => {
        if (e.button !== 0 || uiContainer.style.display !== 'flex') {
            return;
        }

        if (clothingPanel && e.target instanceof Element && e.target.closest('.clothing-panel')) {
            return;
        }

        isCameraDragging = true;
        lastCameraDragY = e.clientY;
        uiContainer.classList.add('camera-dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isCameraDragging) {
            return;
        }

        const deltaY = e.clientY - lastCameraDragY;
        if (Math.abs(deltaY) < 2) {
            return;
        }

        lastCameraDragY = e.clientY;
        fetch(`https://${RESOURCE_NAME}/panCamera`, {
            method: 'POST',
            body: JSON.stringify({ deltaY })
        });
    });

    const stopCameraDrag = () => {
        isCameraDragging = false;
        uiContainer.classList.remove('camera-dragging');
    };

    document.addEventListener('mouseup', stopCameraDrag);
    document.addEventListener('mouseleave', stopCameraDrag);
    window.addEventListener('blur', stopCameraDrag);
}

// NUI Message Handler
window.addEventListener('message', (event) => {
    const data = event.data;

    switch (data.action) {
        case 'open':
            clothingData = data.clothing;
            currentMode = data.mode || 'creation';
            allowCancel = data.allowCancel === true;
            initializeSkinData();
            syncCancelState();
            syncGenderButtons();
            showUI();
            renderControls();
            break;
        case 'close':
            hideUI();
            break;
    }
});

// Initialize skin data from clothing data
function initializeSkinData() {
    if (!clothingData) return;

    currentSkin = {
        components: {},
        props: {},
        headBlend: {},
        faceFeatures: {},
        headOverlays: {},
        hair: {},
        eyeColor: { value: 0, max: 31 }
    };

    if (clothingData.components) {
        for (const [id, data] of Object.entries(clothingData.components)) {
            currentSkin.components[id] = { ...data };
        }
    }

    if (clothingData.props) {
        for (const [id, data] of Object.entries(clothingData.props)) {
            currentSkin.props[id] = { ...data };
        }
    }

    if (clothingData.headBlend) {
        for (const [key, data] of Object.entries(clothingData.headBlend)) {
            currentSkin.headBlend[key] = { ...data };
        }
    }

    if (clothingData.faceFeatures) {
        for (const [key, data] of Object.entries(clothingData.faceFeatures)) {
            currentSkin.faceFeatures[key] = { ...data };
        }
    }

    if (clothingData.headOverlays) {
        for (const [key, data] of Object.entries(clothingData.headOverlays)) {
            currentSkin.headOverlays[key] = { ...data };
        }
    }

    if (clothingData.hair) {
        for (const [key, data] of Object.entries(clothingData.hair)) {
            currentSkin.hair[key] = { ...data };
        }
    }

    if (clothingData.eyeColor) {
        currentSkin.eyeColor = { ...clothingData.eyeColor };
    }
}

// Show/Hide UI
function showUI() {
    uiContainer.style.display = 'flex';
}

function hideUI() {
    uiContainer.style.display = 'none';
    isCameraDragging = false;
    uiContainer.classList.remove('camera-dragging');
}

function syncCancelState() {
    cancelButton.classList.toggle('is-hidden', !allowCancel);
    cancelButton.disabled = !allowCancel;
    uiContainer.dataset.mode = currentMode;
}

function syncGenderButtons() {
    const isFemale = clothingData?.model === 'mp_f_freemode_01';
    document.querySelectorAll('.gender-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.gender === (isFemale ? 'female' : 'male'));
    });
}

function clampNumber(value, min, max) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return min;
    return Math.max(min, Math.min(max, parsed));
}

function getOverlayConfig(overlayKey) {
    return HEAD_OVERLAY_FIELDS.find((entry) => entry.key === overlayKey);
}

function resolvePaletteEntryBackground(entry) {
    if (!entry) {
        return 'linear-gradient(135deg, #4b4b4b 0%, #1f1f1f 100%)';
    }

    if (typeof entry === 'string') {
        return entry;
    }

    if (Array.isArray(entry)) {
        const [r = 0, g = 0, b = 0] = entry;
        return `rgb(${r}, ${g}, ${b})`;
    }

    if (typeof entry === 'object') {
        if (typeof entry.value === 'string') {
            return entry.value;
        }

        const r = Number(entry.r ?? entry[0] ?? 0);
        const g = Number(entry.g ?? entry[1] ?? 0);
        const b = Number(entry.b ?? entry[2] ?? 0);
        return `rgb(${r}, ${g}, ${b})`;
    }

    return 'linear-gradient(135deg, #4b4b4b 0%, #1f1f1f 100%)';
}

function getAppearanceColorPalette(section, key) {
    if (section === 'hair' && (key === 'color' || key === 'highlight')) {
        return clothingData?.colorPalettes?.hair || [];
    }

    if (section === 'eyeColor') {
        return EYE_COLOR_SWATCHES;
    }

    return [];
}

function getOverlayColorPalette(overlayKey) {
    const overlayConfig = getOverlayConfig(overlayKey);
    if (!overlayConfig?.palette) {
        return [];
    }

    return clothingData?.colorPalettes?.[overlayConfig.palette] || [];
}

function buildColorPreviewInner(palette, selectedIndex) {
    if (!Array.isArray(palette) || palette.length === 0) {
        return '';
    }

    const lastIndex = palette.length - 1;
    const safeIndex = clampNumber(selectedIndex, 0, lastIndex);
    const windowSize = Math.min(7, palette.length);
    let start = Math.max(0, safeIndex - Math.floor(windowSize / 2));
    let end = Math.min(lastIndex, start + windowSize - 1);

    if ((end - start + 1) < windowSize) {
        start = Math.max(0, end - windowSize + 1);
    }

    const swatches = [];
    for (let index = start; index <= end; index += 1) {
        const isActive = index === safeIndex ? ' active' : '';
        swatches.push(`
            <span class="color-preview-swatch${isActive}" style="background: ${resolvePaletteEntryBackground(palette[index])}" title="${index}"></span>
        `);
    }

    return `
        <span class="color-preview-current" style="background: ${resolvePaletteEntryBackground(palette[safeIndex])}"></span>
        <div class="color-preview-strip">${swatches.join('')}</div>
    `;
}

function createColorPreviewMarkup({ previewId, palette, value, section = '', key = '', overlay = '', field = '' }) {
    if (!Array.isArray(palette) || palette.length === 0) {
        return '';
    }

    return `
        <div class="color-preview-row"
             id="${previewId}"
             data-section="${section}"
             data-key="${key}"
             data-overlay="${overlay}"
             data-field="${field}"
             data-value="${value}">
            ${buildColorPreviewInner(palette, value)}
        </div>
    `;
}

function getPaletteForPreviewElement(previewElement) {
    if (previewElement.dataset.overlay) {
        return getOverlayColorPalette(previewElement.dataset.overlay);
    }

    return getAppearanceColorPalette(previewElement.dataset.section, previewElement.dataset.key);
}

function updateColorPreviewFromSlider(slider, value) {
    const previewId = slider.dataset.previewId;
    if (!previewId) return;

    const previewElement = document.getElementById(previewId);
    if (!previewElement) return;

    previewElement.dataset.value = value;
    previewElement.innerHTML = buildColorPreviewInner(getPaletteForPreviewElement(previewElement), Number(value));
}

function getControlData(type, id) {
    const source = type === 'component'
        ? (clothingData?.components?.[id] || {})
        : (clothingData?.props?.[id] || {});
    const current = type === 'component'
        ? (currentSkin.components?.[id] || {})
        : (currentSkin.props?.[id] || {});

    const minDrawable = type === 'prop' ? -1 : 0;
    const maxDrawable = Number(source.maxDrawable ?? current.maxDrawable ?? 0);
    const maxTexture = Number(current.maxTexture ?? source.maxTexture ?? 0);
    const drawable = clampNumber(current.drawable ?? source.drawable ?? minDrawable, minDrawable, maxDrawable);
    const texture = clampNumber(current.texture ?? source.texture ?? 0, 0, maxTexture);

    return {
        drawable,
        texture,
        maxDrawable,
        maxTexture
    };
}

function getAppearanceEntry(section, key) {
    if (section === 'eyeColor') {
        return currentSkin.eyeColor || clothingData?.eyeColor || {};
    }

    return currentSkin?.[section]?.[key] || clothingData?.[section]?.[key] || {};
}

function setCurrentSkinValue(type, id, drawable, texture, maxTexture) {
    const target = type === 'component' ? currentSkin.components : currentSkin.props;
    const existing = target[id] || {};
    target[id] = {
        ...existing,
        drawable,
        texture,
        maxTexture: maxTexture !== undefined ? maxTexture : existing.maxTexture
    };
}

function setCurrentAppearanceValue(section, key, value, extra = {}) {
    if (section === 'eyeColor') {
        currentSkin.eyeColor = {
            ...(currentSkin.eyeColor || {}),
            ...extra,
            value
        };
        return;
    }

    currentSkin[section] = currentSkin[section] || {};
    currentSkin[section][key] = {
        ...(currentSkin[section][key] || {}),
        ...extra,
        value
    };
}

function setCurrentOverlayValue(overlayKey, field, value) {
    currentSkin.headOverlays = currentSkin.headOverlays || {};
    currentSkin.headOverlays[overlayKey] = {
        ...(currentSkin.headOverlays[overlayKey] || {}),
        [field]: value
    };
}

function formatDrawableValue(drawable, maxDrawable) {
    const safeDrawable = Number(drawable);
    const safeMax = Number(maxDrawable);

    if (safeDrawable === -1) {
        return Number.isFinite(safeMax) && safeMax >= 0 ? `-1/${safeMax}` : '-1';
    }

    if (!Number.isFinite(safeDrawable) || !Number.isFinite(safeMax) || safeMax < 0) {
        return String(safeDrawable || 0);
    }

    return `${safeDrawable}/${safeMax}`;
}

function formatTextureValue(drawable, texture, maxTexture) {
    const safeDrawable = Number(drawable);
    const safeTexture = Number(texture);
    const safeMax = Number(maxTexture);

    if (safeDrawable === -1 || !Number.isFinite(safeMax) || safeMax <= 0) {
        return '0/0';
    }

    return `${Number.isFinite(safeTexture) ? safeTexture : 0}/${safeMax}`;
}

function formatRangeValue(value, min, max, step) {
    const safeValue = Number(value);
    const safeMin = Number(min);
    const safeMax = Number(max);
    const safeStep = Number(step);

    if (!Number.isFinite(safeValue)) {
        return '0';
    }

    if (Number.isFinite(safeStep) && safeStep < 1) {
        return safeValue.toFixed(1);
    }

    if (Number.isFinite(safeMin) && safeMin < 0) {
        return `${safeValue}`;
    }

    if (Number.isFinite(safeMax)) {
        return `${safeValue}/${safeMax}`;
    }

    return `${safeValue}`;
}

function createSectionTitle(title) {
    return `<div class="appearance-section-title">${title}</div>`;
}

function createControlGroup(label, id, type, drawable, maxDrawable, texture, maxTexture) {
    const displayValue = formatDrawableValue(drawable, maxDrawable);
    const textureValue = formatTextureValue(drawable, texture, maxTexture);

    return `
        <div class="control-group" data-id="${id}" data-type="${type}">
            <div class="group-header">
                <span class="group-label">${label}</span>
                <span class="group-value" id="${type}-${id}-value">${displayValue}</span>
            </div>
            <input type="range"
                   min="${type === 'prop' ? -1 : 0}"
                   max="${maxDrawable}"
                   value="${drawable}"
                   class="cyber-slider drawable-slider"
                   data-id="${id}"
                   data-type="${type}">

            <div class="group-header" style="margin-top: 10px;">
                <span class="group-label">TEXTURE</span>
                <span class="group-value" id="${type}-${id}-texture-value">${textureValue}</span>
            </div>
            <input type="range"
                   min="0"
                   max="${maxTexture}"
                   value="${texture}"
                   class="cyber-slider texture-slider"
                   data-id="${id}"
                   data-type="${type}">
        </div>
    `;
}

function createRangeControlGroup(label, section, key, data) {
    const value = clampNumber(data.value ?? 0, data.min ?? 0, data.max ?? 0);
    const min = Number(data.min ?? 0);
    const max = Number(data.max ?? 0);
    const step = Number(data.step ?? 1);
    const valueId = `${section}-${key}-value`;
    const previewId = `${section}-${key}-preview`;
    const palette = getAppearanceColorPalette(section, key);
    const previewMarkup = createColorPreviewMarkup({ previewId, palette, value, section, key });

    return `
        <div class="control-group">
            <div class="group-header">
                <span class="group-label">${label}</span>
                <span class="group-value" id="${valueId}">${formatRangeValue(value, min, max, step)}</span>
            </div>
            <input type="range"
                   min="${min}"
                   max="${max}"
                   step="${step}"
                   value="${value}"
                   class="cyber-slider appearance-slider"
                   data-section="${section}"
                   data-key="${key}"
                   data-preview-id="${previewMarkup ? previewId : ''}"
                   data-value-id="${valueId}"
                   data-min="${min}"
                   data-max="${max}"
                   data-step="${step}">
            ${previewMarkup}
        </div>
    `;
}

function createOverlayControlGroup(overlayConfig, overlayData) {
    const overlayKey = overlayConfig.key;
    const styleId = `overlay-${overlayKey}-style-value`;
    const opacityId = `overlay-${overlayKey}-opacity-value`;
    const colorId = `overlay-${overlayKey}-color-value`;
    const secondColorId = `overlay-${overlayKey}-second-color-value`;
    const colorPreviewId = `overlay-${overlayKey}-color-preview`;
    const secondColorPreviewId = `overlay-${overlayKey}-second-color-preview`;
    const colorPalette = getOverlayColorPalette(overlayKey);

    const style = clampNumber(overlayData.style ?? 0, 0, overlayData.maxStyle ?? 0);
    const opacity = clampNumber(overlayData.opacity ?? 0, 0, 1);
    const color = clampNumber(overlayData.color ?? 0, 0, overlayData.maxColor ?? 0);
    const secondColor = clampNumber(overlayData.secondColor ?? 0, 0, overlayData.maxColor ?? 0);

    let html = `
        <div class="control-group">
            <div class="group-header">
                <span class="group-label">${overlayConfig.label}</span>
                <span class="group-value" id="${styleId}">${formatRangeValue(style, 0, overlayData.maxStyle ?? 0, 1)}</span>
            </div>
            <input type="range"
                   min="0"
                   max="${overlayData.maxStyle ?? 0}"
                   step="1"
                   value="${style}"
                   class="cyber-slider overlay-slider"
                   data-overlay="${overlayKey}"
                   data-field="style"
                   data-value-id="${styleId}"
                   data-min="0"
                   data-max="${overlayData.maxStyle ?? 0}"
                   data-step="1">

            <div class="group-header" style="margin-top: 10px;">
                <span class="group-label">OPACITY</span>
                <span class="group-value" id="${opacityId}">${formatRangeValue(opacity, 0, 1, 0.1)}</span>
            </div>
            <input type="range"
                   min="0"
                   max="1"
                   step="0.1"
                   value="${opacity}"
                   class="cyber-slider overlay-slider"
                   data-overlay="${overlayKey}"
                   data-field="opacity"
                   data-value-id="${opacityId}"
                   data-min="0"
                   data-max="1"
                   data-step="0.1">`;

    if (overlayConfig.hasColor && Number(overlayData.maxColor) >= 0) {
        html += `
            <div class="group-header" style="margin-top: 10px;">
                <span class="group-label">PRIMARY COLOR</span>
                <span class="group-value" id="${colorId}">${formatRangeValue(color, 0, overlayData.maxColor ?? 0, 1)}</span>
            </div>
            <input type="range"
                   min="0"
                   max="${overlayData.maxColor ?? 0}"
                   step="1"
                    value="${color}"
                    class="cyber-slider overlay-slider"
                    data-overlay="${overlayKey}"
                    data-field="color"
                    data-preview-id="${colorPalette.length ? colorPreviewId : ''}"
                    data-value-id="${colorId}"
                    data-min="0"
                    data-max="${overlayData.maxColor ?? 0}"
                    data-step="1">
            ${createColorPreviewMarkup({ previewId: colorPreviewId, palette: colorPalette, value: color, overlay: overlayKey, field: 'color' })}

            <div class="group-header" style="margin-top: 10px;">
                <span class="group-label">SECOND COLOR</span>
                <span class="group-value" id="${secondColorId}">${formatRangeValue(secondColor, 0, overlayData.maxColor ?? 0, 1)}</span>
            </div>
            <input type="range"
                   min="0"
                   max="${overlayData.maxColor ?? 0}"
                   step="1"
                    value="${secondColor}"
                    class="cyber-slider overlay-slider"
                    data-overlay="${overlayKey}"
                    data-field="secondColor"
                    data-preview-id="${colorPalette.length ? secondColorPreviewId : ''}"
                    data-value-id="${secondColorId}"
                    data-min="0"
                    data-max="${overlayData.maxColor ?? 0}"
                    data-step="1">
            ${createColorPreviewMarkup({ previewId: secondColorPreviewId, palette: colorPalette, value: secondColor, overlay: overlayKey, field: 'secondColor' })}`;
    }

    html += '</div>';
    return html;
}

function renderDefaultCategory(category) {
    let totalItems = 0;
    let html = '';

    if (category.components) {
        category.components.forEach(comp => {
            const compData = getControlData('component', comp.id);
            totalItems += Math.max(0, Number(compData.maxDrawable) || 0);

            html += createControlGroup(
                comp.label,
                comp.id,
                'component',
                compData.drawable,
                compData.maxDrawable,
                compData.texture,
                compData.maxTexture
            );
        });
    }

    if (category.props) {
        if (category.components && category.components.length > 0) {
            html += '<div class="divider"></div>';
        }

        category.props.forEach(prop => {
            const propData = getControlData('prop', prop.id);
            totalItems += Math.max(0, Number(propData.maxDrawable) || 0);

            html += createControlGroup(
                prop.label,
                prop.id,
                'prop',
                propData.drawable,
                propData.maxDrawable,
                propData.texture,
                propData.maxTexture
            );
        });
    }

    itemCount.textContent = `${totalItems} ITEMS`;
    controlsContainer.innerHTML = html;
}

function renderFaceCategory() {
    let featureCount = 0;
    let html = '';

    html += createSectionTitle('HERITAGE');
    HEAD_BLEND_FIELDS.forEach(field => {
        const data = getAppearanceEntry('headBlend', field.key);
        featureCount += 1;
        html += createRangeControlGroup(field.label, 'headBlend', field.key, {
            value: data.value ?? 0,
            min: field.min,
            max: field.max,
            step: field.step
        });
    });

    html += createSectionTitle('FACIAL STRUCTURE');
    FACE_FEATURE_FIELDS.forEach(field => {
        const data = getAppearanceEntry('faceFeatures', field.key);
        featureCount += 1;
        html += createRangeControlGroup(field.label, 'faceFeatures', field.key, {
            value: data.value ?? 0,
            min: -1,
            max: 1,
            step: 0.1
        });
    });

    html += createSectionTitle('HEAD OVERLAYS');
    HEAD_OVERLAY_FIELDS.forEach(field => {
        const data = getAppearanceEntry('headOverlays', field.key);
        featureCount += 1;
        html += createOverlayControlGroup(field, data);
    });

    itemCount.textContent = `${featureCount} FEATURES`;
    controlsContainer.innerHTML = html;
}

function renderHairCategory(category) {
    let featureCount = 0;
    let html = '';

    if (category.components) {
        category.components.forEach(comp => {
            const compData = getControlData('component', comp.id);
            featureCount += 1;
            html += createControlGroup(
                comp.label,
                comp.id,
                'component',
                compData.drawable,
                compData.maxDrawable,
                compData.texture,
                compData.maxTexture
            );
        });
    }

    html += createSectionTitle('HAIR COLORS');
    ['color', 'highlight'].forEach(key => {
        const label = key === 'color' ? 'HAIR COLOR' : 'HAIR HIGHLIGHT';
        const data = getAppearanceEntry('hair', key);
        featureCount += 1;
        html += createRangeControlGroup(label, 'hair', key, {
            value: data.value ?? 0,
            min: 0,
            max: data.max ?? 0,
            step: 1
        });
    });

    html += createSectionTitle('EYES');
    featureCount += 1;
    html += createRangeControlGroup('EYE COLOR', 'eyeColor', 'value', {
        value: currentSkin.eyeColor?.value ?? clothingData?.eyeColor?.value ?? 0,
        min: clothingData?.eyeColor?.min ?? 0,
        max: currentSkin.eyeColor?.max ?? clothingData?.eyeColor?.max ?? 31,
        step: clothingData?.eyeColor?.step ?? 1
    });

    itemCount.textContent = `${featureCount} FEATURES`;
    controlsContainer.innerHTML = html;
}

// Render controls for current category
function renderControls() {
    const category = categories[currentCategory];
    if (!category) return;

    categoryTitle.textContent = category.title;

    if (currentCategory === 'face') {
        renderFaceCategory();
    } else if (currentCategory === 'hair') {
        renderHairCategory(category);
    } else {
        renderDefaultCategory(category);
    }

    attachSliderEvents();
}

function readSliderValue(slider) {
    const step = Number(slider.dataset.step ?? slider.step ?? 1);
    return step < 1 ? Number.parseFloat(slider.value) : Number.parseInt(slider.value, 10);
}

function updateSliderLabel(slider, value) {
    const valueId = slider.dataset.valueId;
    if (!valueId) return;

    const min = Number(slider.dataset.min ?? slider.min ?? 0);
    const max = Number(slider.dataset.max ?? slider.max ?? 0);
    const step = Number(slider.dataset.step ?? slider.step ?? 1);
    const label = document.getElementById(valueId);
    if (label) {
        label.textContent = formatRangeValue(value, min, max, step);
    }

    updateColorPreviewFromSlider(slider, value);
}

// Attach events to sliders
function attachSliderEvents() {
    document.querySelectorAll('.drawable-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const id = parseInt(e.target.dataset.id, 10);
            const type = e.target.dataset.type;
            const value = parseInt(e.target.value, 10);
            const maxDrawable = parseInt(e.target.max, 10) || 0;

            document.getElementById(`${type}-${id}-value`).textContent = formatDrawableValue(value, maxDrawable);

            const textureSlider = e.target.parentElement.querySelector('.texture-slider');
            const texture = parseInt(textureSlider.value, 10) || 0;
            const maxTexture = parseInt(textureSlider.max, 10) || 0;
            document.getElementById(`${type}-${id}-texture-value`).textContent = formatTextureValue(value, texture, maxTexture);
            setCurrentSkinValue(type, id, value, texture);
            updateClothing(type, id, value, texture);
        });
    });

    document.querySelectorAll('.texture-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const id = parseInt(e.target.dataset.id, 10);
            const type = e.target.dataset.type;
            const value = parseInt(e.target.value, 10);

            const drawableSlider = e.target.parentElement.querySelector('.drawable-slider');
            const drawable = parseInt(drawableSlider.value, 10);
            const maxTexture = parseInt(e.target.max, 10) || 0;
            document.getElementById(`${type}-${id}-texture-value`).textContent = formatTextureValue(drawable, value, maxTexture);
            setCurrentSkinValue(type, id, drawable, value);
            updateClothing(type, id, drawable, value);
        });
    });

    document.querySelectorAll('.appearance-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const section = e.target.dataset.section;
            const key = e.target.dataset.key;
            const value = readSliderValue(e.target);
            updateSliderLabel(e.target, value);
            setCurrentAppearanceValue(section, key, value, {
                min: Number(e.target.dataset.min ?? 0),
                max: Number(e.target.dataset.max ?? 0),
                step: Number(e.target.dataset.step ?? 1)
            });
            updateAppearanceControl(section, key, value);
        });
    });

    document.querySelectorAll('.overlay-slider').forEach(slider => {
        slider.addEventListener('input', (e) => {
            const overlayKey = e.target.dataset.overlay;
            const field = e.target.dataset.field;
            const value = readSliderValue(e.target);
            updateSliderLabel(e.target, value);
            setCurrentOverlayValue(overlayKey, field, value);
            updateHeadOverlay(overlayKey);
        });
    });
}

// Update clothing on character
function updateClothing(type, id, drawable, texture) {
    const endpoint = type === 'component' ? 'updateComponent' : 'updateProp';
    const payload = type === 'component'
        ? { component: id, drawable: drawable, texture: texture }
        : { prop: id, drawable: drawable, texture: texture };

    setCurrentSkinValue(type, id, drawable, texture);

    fetch(`https://${RESOURCE_NAME}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success) {
                const maxDrawable = Number(data.maxDrawable);
                const maxTexture = Number(data.maxTexture);
                const nextDrawable = Number.isFinite(Number(data.drawable)) ? Number(data.drawable) : drawable;
                const nextTexture = Number.isFinite(Number(data.texture)) ? Number(data.texture) : texture;

                const drawableSlider = document.querySelector(`.drawable-slider[data-id="${id}"][data-type="${type}"]`);
                const textureSlider = document.querySelector(`.texture-slider[data-id="${id}"][data-type="${type}"]`);

                if (drawableSlider && Number.isFinite(maxDrawable)) {
                    drawableSlider.max = maxDrawable;
                    drawableSlider.value = nextDrawable;
                    document.getElementById(`${type}-${id}-value`).textContent = formatDrawableValue(nextDrawable, maxDrawable);
                }

                if (textureSlider && Number.isFinite(maxTexture)) {
                    textureSlider.max = maxTexture;
                    textureSlider.value = nextTexture;
                    document.getElementById(`${type}-${id}-texture-value`).textContent = formatTextureValue(nextDrawable, nextTexture, maxTexture);
                }

                setCurrentSkinValue(type, id, nextDrawable, nextTexture, Number.isFinite(maxTexture) ? maxTexture : undefined);
            }
        });
}

function updateAppearanceControl(section, key, value) {
    let endpoint = '';
    let payload = {};

    if (section === 'headBlend') {
        endpoint = 'updateHeadBlend';
        payload = { field: key, value };
    } else if (section === 'faceFeatures') {
        endpoint = 'updateFaceFeature';
        payload = { feature: key, value };
    } else if (section === 'hair') {
        endpoint = 'updateHairSetting';
        payload = { field: key, value };
    } else if (section === 'eyeColor') {
        endpoint = 'updateEyeColor';
        payload = { value };
    }

    if (!endpoint) return;

    fetch(`https://${RESOURCE_NAME}/${endpoint}`, {
        method: 'POST',
        body: JSON.stringify(payload)
    }).then(resp => resp.json()).then((data) => {
        if (!data || data.success !== true) {
            return;
        }

        if (section === 'headBlend' && data.headBlend) {
            currentSkin.headBlend = data.headBlend;
        }

        if (section === 'hair') {
            if (data.hair) {
                currentSkin.hair = data.hair;
            }

            if (data.component) {
                currentSkin.components[2] = {
                    ...(currentSkin.components[2] || {}),
                    drawable: Number.isFinite(Number(data.component.drawable)) ? Number(data.component.drawable) : currentSkin.components[2]?.drawable ?? 0,
                    texture: Number.isFinite(Number(data.component.texture)) ? Number(data.component.texture) : currentSkin.components[2]?.texture ?? 0,
                    maxDrawable: Number.isFinite(Number(data.component.maxDrawable)) ? Number(data.component.maxDrawable) : currentSkin.components[2]?.maxDrawable ?? 0,
                    maxTexture: Number.isFinite(Number(data.component.maxTexture)) ? Number(data.component.maxTexture) : currentSkin.components[2]?.maxTexture ?? 0
                };
            }
        }

        if (section === 'eyeColor' && data.eyeColor) {
            currentSkin.eyeColor = data.eyeColor;
        }
    });
}

function updateHeadOverlay(overlayKey) {
    const data = currentSkin.headOverlays?.[overlayKey];
    if (!data) return;

    fetch(`https://${RESOURCE_NAME}/updateHeadOverlay`, {
        method: 'POST',
        body: JSON.stringify({ overlay: overlayKey, ...data })
    }).then(resp => resp.json()).then((response) => {
        if (!response || response.success !== true || !response.overlay) {
            return;
        }

        currentSkin.headOverlays[overlayKey] = {
            ...currentSkin.headOverlays[overlayKey],
            ...response.overlay
        };
    });
}

// Change gender
function changeGender(gender) {
    fetch(`https://${RESOURCE_NAME}/changeGender`, {
        method: 'POST',
        body: JSON.stringify({ gender: gender })
    })
        .then(resp => resp.json())
        .then(data => {
            if (data.success && data.clothing) {
                clothingData = data.clothing;
                initializeSkinData();
                syncGenderButtons();
                renderControls();
            }
        });
}

// Close UI
function closeUI() {
    fetch(`https://${RESOURCE_NAME}/close`, {
        method: 'POST',
        body: JSON.stringify({})
    });
}

// Confirm selection
function confirmSelection() {
    fetch(`https://${RESOURCE_NAME}/confirm`, {
        method: 'POST',
        body: JSON.stringify({ skin: currentSkin })
    });
}
