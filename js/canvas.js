/**
 * Canvas Manager for X Icon Generator
 */

class CanvasManager {
    constructor() {
        this.mainCanvas = document.getElementById('mainCanvas');
        this.mainCtx = this.mainCanvas.getContext('2d');

        this.previewLarge = document.getElementById('previewLarge');
        this.previewMedium = document.getElementById('previewMedium');
        this.previewSmall = document.getElementById('previewSmall');

        // X-style preview canvases
        this.xAvatarCanvas = document.getElementById('xAvatarCanvas');
        this.xBackgroundCanvas = document.getElementById('xBackgroundCanvas');

        // Image properties
        this.image = null;
        this.imageX = 0;
        this.imageY = 0;
        this.imageScale = 1.0;

        // Background image properties
        this.backgroundImage = null;
        this.bgImageX = 0;
        this.bgImageY = 0;
        this.bgImageScale = 1.0;

        // Canvas properties
        this.canvasSize = 400;

        // Background configuration
        this.backgroundConfig = {
            type: 'solid',
            color: '#1DA1F2',
            opacity: 1.0
        };

        // Grid display
        this.showGrid = false;

        // Interaction state
        this.isDragging = false;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.lastImageX = 0;
        this.lastImageY = 0;

        // Background image interaction state
        this.isBgDragging = false;
        this.bgDragStartX = 0;
        this.bgDragStartY = 0;
        this.lastBgImageX = 0;
        this.lastBgImageY = 0;

        // Touch interaction state
        this.initialDistance = 0;
        this.initialScale = 1.0;

        this.initCanvas();
    }

    /**
     * Initialize canvas dimensions
     */
    initCanvas() {
        this.setCanvasSize(this.mainCanvas, this.canvasSize);
        this.setCanvasSize(this.previewLarge, 200);
        this.setCanvasSize(this.previewMedium, 48);
        this.setCanvasSize(this.previewSmall, 24);
    }

    /**
     * Set canvas size and handle high DPI displays
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {number} size - Desired size
     */
    setCanvasSize(canvas, size) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        canvas.style.width = size + 'px';
        canvas.style.height = size + 'px';
    }

    /**
     * Load image
     * @param {HTMLImageElement} img - Image to load
     */
    loadImage(img) {
        this.image = img;
        this.resetImageTransform();
    }

    /**
     * Load background image
     * @param {HTMLImageElement} img - Background image to load
     */
    loadBackgroundImage(img) {
        this.backgroundImage = img;
        this.resetBackgroundImageTransform();
        this.render();
    }

    /**
     * Reset background image transform to initial state
     */
    resetBackgroundImageTransform() {
        if (!this.backgroundImage) return;

        // Fit background image to cover the canvas area
        const bgContainer = document.getElementById('xPostBackground');
        const bgWidth = bgContainer.offsetWidth || 600;
        const bgHeight = 200;

        const imgAspect = this.backgroundImage.width / this.backgroundImage.height;
        const canvasAspect = bgWidth / bgHeight;

        if (imgAspect > canvasAspect) {
            // Image is wider - fit to height
            this.bgImageScale = bgHeight / this.backgroundImage.height;
        } else {
            // Image is taller - fit to width
            this.bgImageScale = bgWidth / this.backgroundImage.width;
        }

        const scaledWidth = this.backgroundImage.width * this.bgImageScale;
        const scaledHeight = this.backgroundImage.height * this.bgImageScale;

        this.bgImageX = (bgWidth - scaledWidth) / 2;
        this.bgImageY = (bgHeight - scaledHeight) / 2;
    }

    /**
     * Set background image scale
     * @param {number} scale - Scale value (0.5 - 3.0)
     */
    setBgImageScale(scale) {
        const bgContainer = document.getElementById('xPostBackground');
        const bgWidth = bgContainer.offsetWidth || 600;
        const bgHeight = 200;

        const oldScale = this.bgImageScale;
        this.bgImageScale = Utils.clamp(scale, 0.5, 3.0);

        // Adjust position to keep center point stable
        const centerX = bgWidth / 2;
        const centerY = bgHeight / 2;

        const scaleDiff = this.bgImageScale / oldScale;
        this.bgImageX = centerX - (centerX - this.bgImageX) * scaleDiff;
        this.bgImageY = centerY - (centerY - this.bgImageY) * scaleDiff;

        this.render();
    }

    /**
     * Set background image position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    setBgImagePosition(x, y) {
        this.bgImageX = x;
        this.bgImageY = y;
        this.render();
    }

    /**
     * Remove background image
     */
    removeBackgroundImage() {
        this.backgroundImage = null;
        this.render();
    }

    /**
     * Reset image transform to initial state
     */
    resetImageTransform() {
        if (!this.image) return;

        // Center image and fit to canvas
        const imageAspect = this.image.width / this.image.height;
        const canvasAspect = 1; // Square canvas

        if (imageAspect > canvasAspect) {
            // Image is wider - fit to height
            this.imageScale = this.canvasSize / this.image.height;
        } else {
            // Image is taller - fit to width
            this.imageScale = this.canvasSize / this.image.width;
        }

        const scaledWidth = this.image.width * this.imageScale;
        const scaledHeight = this.image.height * this.imageScale;

        this.imageX = (this.canvasSize - scaledWidth) / 2;
        this.imageY = (this.canvasSize - scaledHeight) / 2;

        this.render();
    }

    /**
     * Set image scale
     * @param {number} scale - Scale value (0.5 - 2.0)
     */
    setScale(scale) {
        const oldScale = this.imageScale;
        this.imageScale = Utils.clamp(scale, 0.5, 2.0);

        // Adjust position to keep center point stable
        const centerX = this.canvasSize / 2;
        const centerY = this.canvasSize / 2;

        const scaleDiff = this.imageScale / oldScale;
        this.imageX = centerX - (centerX - this.imageX) * scaleDiff;
        this.imageY = centerY - (centerY - this.imageY) * scaleDiff;

        this.render();
    }

    /**
     * Set image position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     */
    setPosition(x, y) {
        this.imageX = x;
        this.imageY = y;
        this.render();
    }

    /**
     * Set background configuration
     * @param {Object} config - Background configuration
     */
    setBackground(config) {
        this.backgroundConfig = { ...this.backgroundConfig, ...config };
        this.render();
    }

    /**
     * Toggle grid display
     */
    toggleGrid() {
        this.showGrid = !this.showGrid;
        this.render();
        return this.showGrid;
    }

    /**
     * Draw circular clipped image on canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} size - Canvas size
     */
    drawCircularImage(ctx, size) {
        if (!this.image) return;

        const centerX = size / 2;
        const centerY = size / 2;
        const radius = size / 2;

        // Calculate image dimensions and position scaled to canvas size
        const scale = size / this.canvasSize;
        const scaledImageWidth = this.image.width * this.imageScale * scale;
        const scaledImageHeight = this.image.height * this.imageScale * scale;
        const scaledImageX = this.imageX * scale;
        const scaledImageY = this.imageY * scale;

        // Draw background
        const bgOpacity = this.backgroundConfig.opacity || 1.0;
        ctx.globalAlpha = bgOpacity;
        BackgroundGenerator.draw(ctx, size, size, this.backgroundConfig);
        ctx.globalAlpha = 1.0;

        // Apply circular clipping mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();

        // Draw image
        ctx.drawImage(
            this.image,
            scaledImageX,
            scaledImageY,
            scaledImageWidth,
            scaledImageHeight
        );

        ctx.restore();

        // Draw circular border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 0.5, 0, Math.PI * 2);
        ctx.stroke();
    }

    /**
     * Draw grid overlay
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} size - Canvas size
     */
    drawGrid(ctx, size) {
        const gridSize = 20;
        const centerX = size / 2;
        const centerY = size / 2;

        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= size; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, size);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= size; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(size, y);
            ctx.stroke();
        }

        // Center lines (thicker)
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, size);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(size, centerY);
        ctx.stroke();

        // Center circle
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        ctx.stroke();
    }

    /**
     * Render main canvas
     */
    renderMain() {
        const ctx = this.mainCtx;
        const size = this.canvasSize;

        // Clear canvas
        ctx.clearRect(0, 0, size, size);

        if (!this.image) {
            // Draw placeholder
            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, size, size);
            return;
        }

        // Draw background
        const bgOpacity = this.backgroundConfig.opacity || 1.0;
        ctx.globalAlpha = bgOpacity;
        BackgroundGenerator.draw(ctx, size, size, this.backgroundConfig);
        ctx.globalAlpha = 1.0;

        // Draw image (not clipped on main canvas for editing)
        ctx.drawImage(
            this.image,
            this.imageX,
            this.imageY,
            this.image.width * this.imageScale,
            this.image.height * this.imageScale
        );

        // Draw circular mask overlay
        ctx.save();
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, size, size);

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw circular border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 1.5, 0, Math.PI * 2);
        ctx.stroke();

        // Draw grid if enabled
        if (this.showGrid) {
            this.drawGrid(ctx, size);
        }
    }

    /**
     * Render all preview canvases
     */
    renderPreviews() {
        if (!this.image) return;

        const previews = [
            { canvas: this.previewLarge, size: 200 },
            { canvas: this.previewMedium, size: 48 },
            { canvas: this.previewSmall, size: 24 }
        ];

        previews.forEach(({ canvas, size }) => {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, size, size);
            this.drawCircularImage(ctx, size);
        });
    }

    /**
     * Render X-style preview
     */
    renderXPreview() {
        if (!this.image) return;

        // Render avatar
        const avatarSize = 80;
        const dpr = window.devicePixelRatio || 1;
        this.xAvatarCanvas.width = avatarSize * dpr;
        this.xAvatarCanvas.height = avatarSize * dpr;
        const avatarCtx = this.xAvatarCanvas.getContext('2d');
        avatarCtx.scale(dpr, dpr);
        this.xAvatarCanvas.style.width = avatarSize + 'px';
        this.xAvatarCanvas.style.height = avatarSize + 'px';

        avatarCtx.clearRect(0, 0, avatarSize, avatarSize);
        this.drawCircularImage(avatarCtx, avatarSize);

        // Render background
        const bgCanvas = this.xBackgroundCanvas;
        const bgContainer = document.getElementById('xPostBackground');
        const bgWidth = bgContainer.offsetWidth || 600;
        const bgHeight = 200;

        bgCanvas.width = bgWidth * dpr;
        bgCanvas.height = bgHeight * dpr;
        const bgCtx = bgCanvas.getContext('2d');
        bgCtx.scale(dpr, dpr);
        bgCanvas.style.width = bgWidth + 'px';
        bgCanvas.style.height = bgHeight + 'px';

        bgCtx.clearRect(0, 0, bgWidth, bgHeight);

        if (this.backgroundImage) {
            // Draw background image with cropping support
            const scaledWidth = this.backgroundImage.width * this.bgImageScale;
            const scaledHeight = this.backgroundImage.height * this.bgImageScale;

            bgCtx.drawImage(
                this.backgroundImage,
                this.bgImageX,
                this.bgImageY,
                scaledWidth,
                scaledHeight
            );
        } else {
            // Draw default gradient background
            const gradient = bgCtx.createLinearGradient(0, 0, bgWidth, bgHeight);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            bgCtx.fillStyle = gradient;
            bgCtx.fillRect(0, 0, bgWidth, bgHeight);
        }
    }

    /**
     * Render all canvases
     */
    render() {
        this.renderMain();
        this.renderPreviews();
        this.renderXPreview();
    }

    /**
     * Generate download canvas (400x400px with background and circular image)
     * @returns {HTMLCanvasElement} - Download canvas
     */
    generateDownloadCanvas() {
        const downloadCanvas = document.createElement('canvas');
        const downloadSize = 400;
        this.setCanvasSize(downloadCanvas, downloadSize);

        const ctx = downloadCanvas.getContext('2d');
        this.drawCircularImage(ctx, downloadSize);

        return downloadCanvas;
    }

    /**
     * Start dragging
     * @param {Event} e - Mouse or touch event
     */
    startDrag(e) {
        e.preventDefault();
        this.isDragging = true;

        const point = Utils.getEventPoint(e, this.mainCanvas);
        this.dragStartX = point.x;
        this.dragStartY = point.y;
        this.lastImageX = this.imageX;
        this.lastImageY = this.imageY;
    }

    /**
     * Handle dragging
     * @param {Event} e - Mouse or touch event
     */
    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();

        const point = Utils.getEventPoint(e, this.mainCanvas);
        const dx = point.x - this.dragStartX;
        const dy = point.y - this.dragStartY;

        this.setPosition(this.lastImageX + dx, this.lastImageY + dy);
    }

    /**
     * End dragging
     */
    endDrag() {
        this.isDragging = false;
    }

    /**
     * Handle mouse wheel zoom
     * @param {WheelEvent} e - Wheel event
     */
    handleWheel(e) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        this.setScale(this.imageScale + delta);
    }

    /**
     * Handle pinch zoom start
     * @param {TouchEvent} e - Touch event
     */
    startPinch(e) {
        if (e.touches.length === 2) {
            this.initialDistance = Utils.getTouchDistance(e.touches[0], e.touches[1]);
            this.initialScale = this.imageScale;
        }
    }

    /**
     * Handle pinch zoom
     * @param {TouchEvent} e - Touch event
     */
    handlePinch(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = Utils.getTouchDistance(e.touches[0], e.touches[1]);
            const scale = (currentDistance / this.initialDistance) * this.initialScale;
            this.setScale(scale);
        }
    }

    /**
     * Start dragging background image
     * @param {Event} e - Mouse or touch event
     */
    startBgDrag(e) {
        e.preventDefault();
        this.isBgDragging = true;

        const canvas = this.xBackgroundCanvas;
        const point = Utils.getEventPoint(e, canvas);
        this.bgDragStartX = point.x;
        this.bgDragStartY = point.y;
        this.lastBgImageX = this.bgImageX;
        this.lastBgImageY = this.bgImageY;
    }

    /**
     * Handle dragging background image
     * @param {Event} e - Mouse or touch event
     */
    dragBg(e) {
        if (!this.isBgDragging) return;
        e.preventDefault();

        const canvas = this.xBackgroundCanvas;
        const point = Utils.getEventPoint(e, canvas);
        const dx = point.x - this.bgDragStartX;
        const dy = point.y - this.bgDragStartY;

        this.setBgImagePosition(this.lastBgImageX + dx, this.lastBgImageY + dy);
    }

    /**
     * End dragging background image
     */
    endBgDrag() {
        this.isBgDragging = false;
    }

    /**
     * Handle mouse wheel zoom for background image
     * @param {WheelEvent} e - Wheel event
     */
    handleBgWheel(e) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        this.setBgImageScale(this.bgImageScale + delta);
    }
}
