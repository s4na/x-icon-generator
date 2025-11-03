/**
 * Utility Functions for X Icon Generator
 */

const Utils = {
    /**
     * Show toast message
     * @param {string} message - Message to display
     * @param {string} type - Type of toast ('success', 'error', '')
     * @param {number} duration - Duration in milliseconds
     */
    showToast(message, type = '', duration = 3000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    /**
     * Show loading overlay
     */
    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = 'flex';
    },

    /**
     * Hide loading overlay
     */
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = 'none';
    },

    /**
     * Validate image file
     * @param {File} file - File to validate
     * @returns {Object} - {valid: boolean, error: string}
     */
    validateImageFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

        if (!validTypes.includes(file.type)) {
            return {
                valid: false,
                error: '対応フォーマット: JPG, PNG, GIF'
            };
        }

        if (file.size > maxSize) {
            return {
                valid: false,
                error: 'ファイルサイズは10MB以下にしてください'
            };
        }

        return { valid: true, error: null };
    },

    /**
     * Load image from file
     * @param {File} file - Image file
     * @returns {Promise<HTMLImageElement>}
     */
    loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
                img.src = e.target.result;
            };

            reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました'));
            reader.readAsDataURL(file);
        });
    },

    /**
     * Get event coordinates (works for both mouse and touch events)
     * @param {Event} e - Mouse or touch event
     * @param {HTMLElement} element - Target element
     * @returns {Object} - {x, y} coordinates
     */
    getEventPoint(e, element) {
        const rect = element.getBoundingClientRect();

        if (e.touches && e.touches.length > 0) {
            // Touch event
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top
            };
        } else {
            // Mouse event
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        }
    },

    /**
     * Get distance between two touch points
     * @param {Touch} touch1 - First touch point
     * @param {Touch} touch2 - Second touch point
     * @returns {number} - Distance
     */
    getTouchDistance(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    },

    /**
     * Clamp a value between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} - Clamped value
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Download canvas as image
     * @param {HTMLCanvasElement} canvas - Canvas to download
     * @param {string} filename - Filename
     * @param {string} mimeType - MIME type ('image/png' or 'image/jpeg')
     * @param {number} quality - JPEG quality (0-1)
     */
    downloadCanvas(canvas, filename, mimeType = 'image/png', quality = 0.95) {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        }, mimeType, quality);
    },

    /**
     * Generate timestamp-based filename
     * @param {string} extension - File extension
     * @returns {string} - Filename
     */
    generateFilename(extension) {
        const timestamp = Date.now();
        return `x-icon-${timestamp}.${extension}`;
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} - Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Convert hex color to RGB
     * @param {string} hex - Hex color (#RRGGBB)
     * @returns {Object} - {r, g, b}
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },

    /**
     * Create RGBA color string with opacity
     * @param {string} hex - Hex color
     * @param {number} opacity - Opacity (0-1)
     * @returns {string} - RGBA color string
     */
    hexToRgba(hex, opacity) {
        const rgb = this.hexToRgb(hex);
        return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : hex;
    }
};
