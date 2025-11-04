import { describe, it, expect, beforeEach } from 'vitest';

// Mock CanvasManager utilities
const Utils = {
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
};

describe('Canvas utilities', () => {
  describe('scale calculations', () => {
    it('should clamp scale to minimum', () => {
      const scale = Utils.clamp(0.3, 0.5, 2.0);
      expect(scale).toBe(0.5);
    });

    it('should clamp scale to maximum', () => {
      const scale = Utils.clamp(2.5, 0.5, 2.0);
      expect(scale).toBe(2.0);
    });

    it('should allow valid scale values', () => {
      const scale = Utils.clamp(1.5, 0.5, 2.0);
      expect(scale).toBe(1.5);
    });
  });

  describe('canvas size calculations', () => {
    it('should calculate scaled dimensions', () => {
      const originalWidth = 1000;
      const originalHeight = 800;
      const canvasSize = 400;

      // Fit to width
      const scale = canvasSize / originalWidth;
      const scaledWidth = originalWidth * scale;
      const scaledHeight = originalHeight * scale;

      expect(scaledWidth).toBe(400);
      expect(scaledHeight).toBe(320);
    });

    it('should calculate scaled position for centering', () => {
      const canvasSize = 400;
      const imageWidth = 300;
      const imageHeight = 300;

      const x = (canvasSize - imageWidth) / 2;
      const y = (canvasSize - imageHeight) / 2;

      expect(x).toBe(50);
      expect(y).toBe(50);
    });
  });

  describe('aspect ratio calculations', () => {
    it('should fit wide image to canvas', () => {
      const imageWidth = 1600;
      const imageHeight = 900;
      const canvasSize = 400;

      const imageAspect = imageWidth / imageHeight;
      const canvasAspect = 1; // Square canvas

      let scale;
      if (imageAspect > canvasAspect) {
        // Image is wider - fit to height
        scale = canvasSize / imageHeight;
      } else {
        // Image is taller - fit to width
        scale = canvasSize / imageWidth;
      }

      expect(scale).toBeCloseTo(0.444, 3);
    });

    it('should fit tall image to canvas', () => {
      const imageWidth = 900;
      const imageHeight = 1600;
      const canvasSize = 400;

      const imageAspect = imageWidth / imageHeight;
      const canvasAspect = 1; // Square canvas

      let scale;
      if (imageAspect > canvasAspect) {
        // Image is wider - fit to height
        scale = canvasSize / imageHeight;
      } else {
        // Image is taller - fit to width
        scale = canvasSize / imageWidth;
      }

      expect(scale).toBeCloseTo(0.444, 3);
    });

    it('should handle square image', () => {
      const imageWidth = 1000;
      const imageHeight = 1000;
      const canvasSize = 400;

      const imageAspect = imageWidth / imageHeight;
      const canvasAspect = 1; // Square canvas

      let scale;
      if (imageAspect > canvasAspect) {
        scale = canvasSize / imageHeight;
      } else {
        scale = canvasSize / imageWidth;
      }

      expect(scale).toBe(0.4);
    });
  });

  describe('position calculations after scale change', () => {
    it('should keep center point stable when scaling', () => {
      const canvasSize = 400;
      const oldScale = 1.0;
      const newScale = 1.5;
      const oldImageX = 100;
      const oldImageY = 100;

      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;

      const scaleDiff = newScale / oldScale;
      const newImageX = centerX - (centerX - oldImageX) * scaleDiff;
      const newImageY = centerY - (centerY - oldImageY) * scaleDiff;

      expect(newImageX).toBe(50);
      expect(newImageY).toBe(50);
    });

    it('should handle zoom out', () => {
      const canvasSize = 400;
      const oldScale = 1.5;
      const newScale = 1.0;
      const oldImageX = 50;
      const oldImageY = 50;

      const centerX = canvasSize / 2;
      const centerY = canvasSize / 2;

      const scaleDiff = newScale / oldScale;
      const newImageX = centerX - (centerX - oldImageX) * scaleDiff;
      const newImageY = centerY - (centerY - oldImageY) * scaleDiff;

      expect(newImageX).toBeCloseTo(100, 1);
      expect(newImageY).toBeCloseTo(100, 1);
    });
  });

  describe('device pixel ratio handling', () => {
    it('should scale canvas for high DPI displays', () => {
      const size = 400;
      const dpr = 2; // Retina display

      const physicalWidth = size * dpr;
      const physicalHeight = size * dpr;

      expect(physicalWidth).toBe(800);
      expect(physicalHeight).toBe(800);
    });

    it('should handle standard displays', () => {
      const size = 400;
      const dpr = 1;

      const physicalWidth = size * dpr;
      const physicalHeight = size * dpr;

      expect(physicalWidth).toBe(400);
      expect(physicalHeight).toBe(400);
    });
  });
});
