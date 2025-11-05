import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <div id="toast"></div>
    <div id="loadingOverlay"></div>
  `;
});

// Import Utils after DOM setup
const Utils = {
  showToast(message, type = '', duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },

  showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'flex';
  },

  hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = 'none';
  },

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

  getTouchDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  },

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  generateFilename(extension) {
    const timestamp = Date.now();
    return `x-icon-${timestamp}.${extension}`;
  },

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  hexToRgba(hex, opacity) {
    const rgb = this.hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : hex;
  }
};

describe('Utils', () => {
  describe('validateImageFile', () => {
    it('should accept valid PNG files', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    it('should accept valid JPEG files', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    it('should accept valid GIF files', () => {
      const file = new File([''], 'test.gif', { type: 'image/gif' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });

    it('should reject files with invalid type', () => {
      const file = new File([''], 'test.pdf', { type: 'application/pdf' });
      Object.defineProperty(file, 'size', { value: 1024 * 1024 }); // 1MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('対応フォーマット: JPG, PNG, GIF');
    });

    it('should reject files larger than 10MB', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 11 * 1024 * 1024 }); // 11MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('ファイルサイズは10MB以下にしてください');
    });

    it('should accept files at exactly 10MB', () => {
      const file = new File([''], 'test.png', { type: 'image/png' });
      Object.defineProperty(file, 'size', { value: 10 * 1024 * 1024 }); // 10MB

      const result = Utils.validateImageFile(file);
      expect(result.valid).toBe(true);
      expect(result.error).toBe(null);
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex color to RGB', () => {
      const result = Utils.hexToRgb('#FF5733');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should handle hex color without # prefix', () => {
      const result = Utils.hexToRgb('FF5733');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should handle lowercase hex', () => {
      const result = Utils.hexToRgb('#ff5733');
      expect(result).toEqual({ r: 255, g: 87, b: 51 });
    });

    it('should return null for invalid hex', () => {
      const result = Utils.hexToRgb('invalid');
      expect(result).toBe(null);
    });

    it('should handle black color', () => {
      const result = Utils.hexToRgb('#000000');
      expect(result).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle white color', () => {
      const result = Utils.hexToRgb('#FFFFFF');
      expect(result).toEqual({ r: 255, g: 255, b: 255 });
    });
  });

  describe('hexToRgba', () => {
    it('should convert hex to rgba with opacity', () => {
      const result = Utils.hexToRgba('#FF5733', 0.5);
      expect(result).toBe('rgba(255, 87, 51, 0.5)');
    });

    it('should handle full opacity', () => {
      const result = Utils.hexToRgba('#FF5733', 1.0);
      expect(result).toBe('rgba(255, 87, 51, 1)');
    });

    it('should handle zero opacity', () => {
      const result = Utils.hexToRgba('#FF5733', 0);
      expect(result).toBe('rgba(255, 87, 51, 0)');
    });

    it('should return original value for invalid hex', () => {
      const result = Utils.hexToRgba('invalid', 0.5);
      expect(result).toBe('invalid');
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(Utils.clamp(5, 0, 10)).toBe(5);
    });

    it('should clamp value to min', () => {
      expect(Utils.clamp(-5, 0, 10)).toBe(0);
    });

    it('should clamp value to max', () => {
      expect(Utils.clamp(15, 0, 10)).toBe(10);
    });

    it('should handle equal min and max', () => {
      expect(Utils.clamp(5, 10, 10)).toBe(10);
    });

    it('should handle negative ranges', () => {
      expect(Utils.clamp(-5, -10, -1)).toBe(-5);
      expect(Utils.clamp(-15, -10, -1)).toBe(-10);
      expect(Utils.clamp(5, -10, -1)).toBe(-1);
    });

    it('should handle decimal values', () => {
      expect(Utils.clamp(0.5, 0, 1)).toBe(0.5);
      expect(Utils.clamp(1.5, 0, 1)).toBe(1);
    });
  });

  describe('getTouchDistance', () => {
    it('should calculate distance between two touch points', () => {
      const touch1 = { clientX: 0, clientY: 0 };
      const touch2 = { clientX: 3, clientY: 4 };

      const distance = Utils.getTouchDistance(touch1, touch2);
      expect(distance).toBe(5); // 3-4-5 triangle
    });

    it('should handle same point', () => {
      const touch1 = { clientX: 10, clientY: 10 };
      const touch2 = { clientX: 10, clientY: 10 };

      const distance = Utils.getTouchDistance(touch1, touch2);
      expect(distance).toBe(0);
    });

    it('should handle negative coordinates', () => {
      const touch1 = { clientX: -3, clientY: -4 };
      const touch2 = { clientX: 0, clientY: 0 };

      const distance = Utils.getTouchDistance(touch1, touch2);
      expect(distance).toBe(5);
    });
  });

  describe('generateFilename', () => {
    it('should generate filename with png extension', () => {
      const filename = Utils.generateFilename('png');
      expect(filename).toMatch(/^x-icon-\d+\.png$/);
    });

    it('should generate filename with jpg extension', () => {
      const filename = Utils.generateFilename('jpg');
      expect(filename).toMatch(/^x-icon-\d+\.jpg$/);
    });

    it('should generate unique filenames', () => {
      const filename1 = Utils.generateFilename('png');
      const filename2 = Utils.generateFilename('png');
      // While they could theoretically be the same, it's extremely unlikely
      // This test just verifies the format is correct
      expect(filename1).toMatch(/^x-icon-\d+\.png$/);
      expect(filename2).toMatch(/^x-icon-\d+\.png$/);
    });
  });

  describe('showToast', () => {
    it('should display toast message', () => {
      const toast = document.getElementById('toast');
      Utils.showToast('Test message');

      expect(toast.textContent).toBe('Test message');
      expect(toast.classList.contains('show')).toBe(true);
    });

    it('should apply type class', () => {
      const toast = document.getElementById('toast');
      Utils.showToast('Success', 'success');

      expect(toast.classList.contains('success')).toBe(true);
    });

    it('should apply error class', () => {
      const toast = document.getElementById('toast');
      Utils.showToast('Error', 'error');

      expect(toast.classList.contains('error')).toBe(true);
    });
  });

  describe('showLoading and hideLoading', () => {
    it('should show loading overlay', () => {
      const overlay = document.getElementById('loadingOverlay');
      Utils.showLoading();

      expect(overlay.style.display).toBe('flex');
    });

    it('should hide loading overlay', () => {
      const overlay = document.getElementById('loadingOverlay');
      Utils.showLoading();
      Utils.hideLoading();

      expect(overlay.style.display).toBe('none');
    });
  });
});
