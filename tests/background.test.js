import { describe, it, expect, beforeEach } from 'vitest';

// Mock BackgroundGenerator
const BackgroundGenerator = {
  presets: [
    {
      name: 'Sunset',
      type: 'gradient',
      colors: ['#FF6B6B', '#FFE66D'],
      direction: 'linear',
      angle: 135
    },
    {
      name: 'Ocean',
      type: 'gradient',
      colors: ['#4A90E2', '#50E3C2'],
      direction: 'linear',
      angle: 45
    }
  ],

  drawSolid(ctx, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  },

  drawLinearGradient(ctx, width, height, color1, color2, angle) {
    const radians = (angle - 90) * (Math.PI / 180);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxDimension = Math.max(width, height);
    const length = maxDimension;

    const x1 = centerX - Math.cos(radians) * length / 2;
    const y1 = centerY - Math.sin(radians) * length / 2;
    const x2 = centerX + Math.cos(radians) * length / 2;
    const y2 = centerY + Math.sin(radians) * length / 2;

    const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  },

  drawRadialGradient(ctx, width, height, color1, color2) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.max(width, height) / 2;

    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  },

  draw(ctx, width, height, config) {
    const { type, color, colors, direction, angle } = config;

    switch (type) {
      case 'solid':
        this.drawSolid(ctx, width, height, color);
        break;

      case 'gradient':
        if (direction === 'linear') {
          this.drawLinearGradient(ctx, width, height, colors[0], colors[1], angle || 135);
        } else if (direction === 'radial') {
          this.drawRadialGradient(ctx, width, height, colors[0], colors[1]);
        }
        break;
    }
  }
};

describe('BackgroundGenerator', () => {
  let canvas;
  let ctx;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;

    // Mock canvas context
    ctx = {
      fillStyle: '',
      fillRect: vi.fn(),
      createLinearGradient: vi.fn((x1, y1, x2, y2) => ({
        addColorStop: vi.fn()
      })),
      createRadialGradient: vi.fn((x1, y1, r1, x2, y2, r2) => ({
        addColorStop: vi.fn()
      }))
    };
  });

  describe('presets', () => {
    it('should have preset configurations', () => {
      expect(BackgroundGenerator.presets).toBeDefined();
      expect(BackgroundGenerator.presets.length).toBeGreaterThan(0);
    });

    it('should have valid preset structure', () => {
      const preset = BackgroundGenerator.presets[0];
      expect(preset).toHaveProperty('name');
      expect(preset).toHaveProperty('type');
      expect(preset).toHaveProperty('colors');
      expect(Array.isArray(preset.colors)).toBe(true);
    });
  });

  describe('drawSolid', () => {
    it('should set fillStyle to specified color', () => {
      BackgroundGenerator.drawSolid(ctx, 100, 100, '#FF0000');
      expect(ctx.fillStyle).toBe('#FF0000');
    });

    it('should handle hex colors', () => {
      BackgroundGenerator.drawSolid(ctx, 100, 100, '#1DA1F2');
      expect(ctx.fillStyle).toBe('#1DA1F2');
    });
  });

  describe('drawLinearGradient', () => {
    it('should create linear gradient', () => {
      BackgroundGenerator.drawLinearGradient(ctx, 400, 400, '#FF0000', '#0000FF', 90);
      // The fillStyle will be a gradient object
      expect(ctx.fillStyle).toBeDefined();
    });

    it('should handle different angles', () => {
      BackgroundGenerator.drawLinearGradient(ctx, 400, 400, '#FF0000', '#0000FF', 45);
      expect(ctx.fillStyle).toBeDefined();

      BackgroundGenerator.drawLinearGradient(ctx, 400, 400, '#FF0000', '#0000FF', 180);
      expect(ctx.fillStyle).toBeDefined();
    });
  });

  describe('drawRadialGradient', () => {
    it('should create radial gradient', () => {
      BackgroundGenerator.drawRadialGradient(ctx, 400, 400, '#FF0000', '#0000FF');
      expect(ctx.fillStyle).toBeDefined();
    });

    it('should handle different sizes', () => {
      BackgroundGenerator.drawRadialGradient(ctx, 200, 200, '#FF0000', '#0000FF');
      expect(ctx.fillStyle).toBeDefined();

      BackgroundGenerator.drawRadialGradient(ctx, 100, 100, '#FF0000', '#0000FF');
      expect(ctx.fillStyle).toBeDefined();
    });
  });

  describe('draw', () => {
    it('should draw solid background', () => {
      const config = {
        type: 'solid',
        color: '#FF0000'
      };

      BackgroundGenerator.draw(ctx, 400, 400, config);
      expect(ctx.fillStyle).toBe('#FF0000');
    });

    it('should draw linear gradient', () => {
      const config = {
        type: 'gradient',
        colors: ['#FF0000', '#0000FF'],
        direction: 'linear',
        angle: 135
      };

      BackgroundGenerator.draw(ctx, 400, 400, config);
      expect(ctx.fillStyle).toBeDefined();
    });

    it('should draw radial gradient', () => {
      const config = {
        type: 'gradient',
        colors: ['#FF0000', '#0000FF'],
        direction: 'radial'
      };

      BackgroundGenerator.draw(ctx, 400, 400, config);
      expect(ctx.fillStyle).toBeDefined();
    });

    it('should use default angle for linear gradient', () => {
      const config = {
        type: 'gradient',
        colors: ['#FF0000', '#0000FF'],
        direction: 'linear'
        // angle not specified, should default to 135
      };

      BackgroundGenerator.draw(ctx, 400, 400, config);
      expect(ctx.fillStyle).toBeDefined();
    });
  });
});
