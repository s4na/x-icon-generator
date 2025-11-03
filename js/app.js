/**
 * Main Application Logic for X Icon Generator
 */

class XIconGenerator {
    constructor() {
        this.canvasManager = new CanvasManager();
        this.currentPattern = null;

        this.initElements();
        this.initEventListeners();
        this.initBackgroundPresets();
    }

    /**
     * Initialize DOM elements
     */
    initElements() {
        // Upload elements
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');

        // Editor elements
        this.editorContainer = document.getElementById('editorContainer');
        this.scaleSlider = document.getElementById('scaleSlider');
        this.scaleValue = document.getElementById('scaleValue');
        this.resetBtn = document.getElementById('resetBtn');
        this.gridToggleBtn = document.getElementById('gridToggleBtn');

        // Preview elements
        this.previewSection = document.getElementById('previewSection');

        // Background elements
        this.backgroundSection = document.getElementById('backgroundSection');
        this.bgTabs = document.querySelectorAll('.bg-tab');
        this.bgPanels = document.querySelectorAll('.bg-panel');

        // Solid background
        this.solidColor = document.getElementById('solidColor');

        // Gradient background
        this.gradientColor1 = document.getElementById('gradientColor1');
        this.gradientColor2 = document.getElementById('gradientColor2');
        this.gradientTypeRadios = document.querySelectorAll('input[name="gradientType"]');
        this.gradientAngle = document.getElementById('gradientAngle');
        this.angleValue = document.getElementById('angleValue');
        this.gradientAngleGroup = document.getElementById('gradientAngleGroup');

        // Pattern background
        this.patternBtns = document.querySelectorAll('.pattern-btn');
        this.patternColor1 = document.getElementById('patternColor1');
        this.patternColor2 = document.getElementById('patternColor2');

        // Preset background
        this.presetGrid = document.getElementById('presetGrid');

        // Opacity control
        this.bgOpacity = document.getElementById('bgOpacity');
        this.opacityValue = document.getElementById('opacityValue');

        // Download elements
        this.downloadSection = document.getElementById('downloadSection');
        this.downloadPNG = document.getElementById('downloadPNG');
        this.downloadJPG = document.getElementById('downloadJPG');
    }

    /**
     * Initialize event listeners
     */
    initEventListeners() {
        // File upload
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));

        // Drag and drop
        this.uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadArea.classList.add('dragover');
        });

        this.uploadArea.addEventListener('dragleave', () => {
            this.uploadArea.classList.remove('dragover');
        });

        this.uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadArea.classList.remove('dragover');
            this.handleFileDrop(e);
        });

        // Image controls
        this.scaleSlider.addEventListener('input', (e) => {
            const scale = parseFloat(e.target.value) / 100;
            this.canvasManager.setScale(scale);
            this.scaleValue.textContent = e.target.value + '%';
        });

        this.resetBtn.addEventListener('click', () => {
            this.canvasManager.resetImageTransform();
            this.scaleSlider.value = 100;
            this.scaleValue.textContent = '100%';
        });

        this.gridToggleBtn.addEventListener('click', () => {
            const isOn = this.canvasManager.toggleGrid();
            this.gridToggleBtn.textContent = `グリッド: ${isOn ? 'ON' : 'OFF'}`;
        });

        // Canvas interactions
        const canvas = this.canvasManager.mainCanvas;

        // Mouse events
        canvas.addEventListener('mousedown', (e) => this.canvasManager.startDrag(e));
        canvas.addEventListener('mousemove', (e) => this.canvasManager.drag(e));
        canvas.addEventListener('mouseup', () => this.canvasManager.endDrag());
        canvas.addEventListener('mouseleave', () => this.canvasManager.endDrag());
        canvas.addEventListener('wheel', (e) => this.canvasManager.handleWheel(e));

        // Touch events
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                this.canvasManager.startDrag(e);
            } else if (e.touches.length === 2) {
                this.canvasManager.startPinch(e);
            }
        });

        canvas.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) {
                this.canvasManager.drag(e);
            } else if (e.touches.length === 2) {
                this.canvasManager.handlePinch(e);
            }
        });

        canvas.addEventListener('touchend', () => this.canvasManager.endDrag());

        // Background tabs
        this.bgTabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchBackgroundTab(tab.dataset.tab));
        });

        // Solid background
        this.solidColor.addEventListener('input', () => this.updateSolidBackground());

        // Gradient background
        this.gradientColor1.addEventListener('input', () => this.updateGradientBackground());
        this.gradientColor2.addEventListener('input', () => this.updateGradientBackground());
        this.gradientTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => this.updateGradientBackground());
        });
        this.gradientAngle.addEventListener('input', (e) => {
            this.angleValue.textContent = e.target.value + '°';
            this.updateGradientBackground();
        });

        // Pattern background
        this.patternBtns.forEach(btn => {
            btn.addEventListener('click', () => this.selectPattern(btn));
        });
        this.patternColor1.addEventListener('input', () => this.updatePatternBackground());
        this.patternColor2.addEventListener('input', () => this.updatePatternBackground());

        // Opacity control
        this.bgOpacity.addEventListener('input', (e) => {
            const opacity = parseFloat(e.target.value) / 100;
            this.opacityValue.textContent = e.target.value + '%';
            this.canvasManager.setBackground({ opacity });
        });

        // Download buttons
        this.downloadPNG.addEventListener('click', () => this.downloadImage('png'));
        this.downloadJPG.addEventListener('click', () => this.downloadImage('jpg'));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    /**
     * Initialize background presets
     */
    initBackgroundPresets() {
        BackgroundGenerator.presets.forEach((preset, index) => {
            const presetItem = document.createElement('div');
            presetItem.className = 'preset-item';

            // Create mini canvas for preview
            const previewCanvas = document.createElement('canvas');
            previewCanvas.width = 100;
            previewCanvas.height = 80;
            const ctx = previewCanvas.getContext('2d');

            const config = {
                type: preset.type,
                colors: preset.colors,
                direction: preset.direction,
                angle: preset.angle
            };

            BackgroundGenerator.draw(ctx, 100, 80, config);

            presetItem.appendChild(previewCanvas);

            const label = document.createElement('div');
            label.className = 'preset-label';
            label.textContent = preset.name;
            presetItem.appendChild(label);

            presetItem.addEventListener('click', () => this.selectPreset(presetItem, preset));

            this.presetGrid.appendChild(presetItem);
        });
    }

    /**
     * Switch background tab
     * @param {string} tabName - Tab name
     */
    switchBackgroundTab(tabName) {
        // Update tabs
        this.bgTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update panels
        this.bgPanels.forEach(panel => {
            if (panel.id === `${tabName}Panel`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Update background based on active tab
        switch (tabName) {
            case 'solid':
                this.updateSolidBackground();
                break;
            case 'gradient':
                this.updateGradientBackground();
                break;
            case 'pattern':
                if (this.currentPattern) {
                    this.updatePatternBackground();
                }
                break;
            case 'preset':
                // Preset is handled by clicking on preset items
                break;
        }
    }

    /**
     * Update solid background
     */
    updateSolidBackground() {
        this.canvasManager.setBackground({
            type: 'solid',
            color: this.solidColor.value
        });
    }

    /**
     * Update gradient background
     */
    updateGradientBackground() {
        const type = document.querySelector('input[name="gradientType"]:checked').value;

        // Show/hide angle control
        if (type === 'linear') {
            this.gradientAngleGroup.style.display = 'flex';
        } else {
            this.gradientAngleGroup.style.display = 'none';
        }

        this.canvasManager.setBackground({
            type: 'gradient',
            colors: [this.gradientColor1.value, this.gradientColor2.value],
            direction: type,
            angle: parseInt(this.gradientAngle.value)
        });
    }

    /**
     * Select pattern
     * @param {HTMLElement} btn - Pattern button
     */
    selectPattern(btn) {
        this.patternBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentPattern = btn.dataset.pattern;
        this.updatePatternBackground();
    }

    /**
     * Update pattern background
     */
    updatePatternBackground() {
        if (!this.currentPattern) return;

        this.canvasManager.setBackground({
            type: 'pattern',
            colors: [this.patternColor1.value, this.patternColor2.value],
            pattern: this.currentPattern
        });
    }

    /**
     * Select preset
     * @param {HTMLElement} item - Preset item
     * @param {Object} preset - Preset configuration
     */
    selectPreset(item, preset) {
        // Clear active state from all presets
        document.querySelectorAll('.preset-item').forEach(p => p.classList.remove('active'));
        item.classList.add('active');

        this.canvasManager.setBackground({
            type: preset.type,
            colors: preset.colors,
            direction: preset.direction,
            angle: preset.angle
        });
    }

    /**
     * Handle file select
     * @param {Event} e - Change event
     */
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.loadImageFile(file);
        }
    }

    /**
     * Handle file drop
     * @param {DragEvent} e - Drop event
     */
    handleFileDrop(e) {
        const file = e.dataTransfer.files[0];
        if (file) {
            this.loadImageFile(file);
        }
    }

    /**
     * Load image file
     * @param {File} file - Image file
     */
    async loadImageFile(file) {
        // Validate file
        const validation = Utils.validateImageFile(file);
        if (!validation.valid) {
            Utils.showToast(validation.error, 'error');
            return;
        }

        try {
            Utils.showLoading();

            // Load image
            const img = await Utils.loadImageFromFile(file);

            // Load into canvas manager
            this.canvasManager.loadImage(img);

            // Show editor and preview sections
            this.uploadArea.style.display = 'none';
            this.editorContainer.style.display = 'flex';
            this.previewSection.style.display = 'block';
            this.backgroundSection.style.display = 'block';
            this.downloadSection.style.display = 'block';

            Utils.hideLoading();
            Utils.showToast('画像を読み込みました', 'success');
        } catch (error) {
            Utils.hideLoading();
            Utils.showToast(error.message, 'error');
        }
    }

    /**
     * Download image
     * @param {string} format - Format ('png' or 'jpg')
     */
    downloadImage(format) {
        const canvas = this.canvasManager.generateDownloadCanvas();
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
        const filename = Utils.generateFilename(format);

        Utils.downloadCanvas(canvas, filename, mimeType);
        Utils.showToast('ダウンロードを開始しました', 'success');
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboard(e) {
        if (!this.canvasManager.image) return;

        const moveStep = e.shiftKey ? 10 : 1;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.canvasManager.setPosition(
                    this.canvasManager.imageX,
                    this.canvasManager.imageY - moveStep
                );
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.canvasManager.setPosition(
                    this.canvasManager.imageX,
                    this.canvasManager.imageY + moveStep
                );
                break;
            case 'ArrowLeft':
                e.preventDefault();
                this.canvasManager.setPosition(
                    this.canvasManager.imageX - moveStep,
                    this.canvasManager.imageY
                );
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.canvasManager.setPosition(
                    this.canvasManager.imageX + moveStep,
                    this.canvasManager.imageY
                );
                break;
            case '+':
            case '=':
                e.preventDefault();
                this.canvasManager.setScale(this.canvasManager.imageScale + 0.05);
                this.scaleSlider.value = Math.round(this.canvasManager.imageScale * 100);
                this.scaleValue.textContent = this.scaleSlider.value + '%';
                break;
            case '-':
            case '_':
                e.preventDefault();
                this.canvasManager.setScale(this.canvasManager.imageScale - 0.05);
                this.scaleSlider.value = Math.round(this.canvasManager.imageScale * 100);
                this.scaleValue.textContent = this.scaleSlider.value + '%';
                break;
            case 'r':
            case 'R':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    this.canvasManager.resetImageTransform();
                    this.scaleSlider.value = 100;
                    this.scaleValue.textContent = '100%';
                }
                break;
            case 'g':
            case 'G':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    const isOn = this.canvasManager.toggleGrid();
                    this.gridToggleBtn.textContent = `グリッド: ${isOn ? 'ON' : 'OFF'}`;
                }
                break;
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new XIconGenerator();
});
