/**
 * Background Generator for X Icon Generator
 */

const BackgroundGenerator = {
    /**
     * Preset backgrounds configuration
     */
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
        },
        {
            name: 'Purple',
            type: 'gradient',
            colors: ['#A855F7', '#EC4899'],
            direction: 'radial'
        },
        {
            name: 'Forest',
            type: 'gradient',
            colors: ['#10B981', '#34D399'],
            direction: 'linear',
            angle: 90
        },
        {
            name: 'Warm',
            type: 'gradient',
            colors: ['#F59E0B', '#EF4444'],
            direction: 'linear',
            angle: 180
        },
        {
            name: 'Mint',
            type: 'gradient',
            colors: ['#06B6D4', '#8B5CF6'],
            direction: 'linear',
            angle: 45
        },
        {
            name: 'Peach',
            type: 'gradient',
            colors: ['#FBBF24', '#F472B6'],
            direction: 'radial'
        },
        {
            name: 'Deep Ocean',
            type: 'gradient',
            colors: ['#1E3A8A', '#3B82F6'],
            direction: 'linear',
            angle: 135
        },
        {
            name: 'Lavender',
            type: 'gradient',
            colors: ['#E0E7FF', '#C7D2FE'],
            direction: 'linear',
            angle: 90
        },
        {
            name: 'Night',
            type: 'gradient',
            colors: ['#1F2937', '#374151'],
            direction: 'linear',
            angle: 180
        }
    ],

    /**
     * Draw solid color background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color - Background color
     */
    drawSolid(ctx, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);
    },

    /**
     * Draw linear gradient background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - First color
     * @param {string} color2 - Second color
     * @param {number} angle - Gradient angle in degrees
     */
    drawLinearGradient(ctx, width, height, color1, color2, angle) {
        // Convert angle to radians
        const radians = (angle - 90) * (Math.PI / 180);

        // Calculate gradient start and end points
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

    /**
     * Draw radial gradient background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - First color (center)
     * @param {string} color2 - Second color (edge)
     */
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

    /**
     * Draw stripe pattern background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - First color
     * @param {string} color2 - Second color
     * @param {string} direction - 'vertical', 'horizontal', or 'diagonal'
     */
    drawStripePattern(ctx, width, height, color1, color2, direction) {
        const patternCanvas = document.createElement('canvas');
        const size = 20;

        if (direction === 'vertical') {
            patternCanvas.width = size;
            patternCanvas.height = size;
        } else if (direction === 'horizontal') {
            patternCanvas.width = size;
            patternCanvas.height = size;
        } else if (direction === 'diagonal') {
            patternCanvas.width = size * 2;
            patternCanvas.height = size * 2;
        }

        const pCtx = patternCanvas.getContext('2d');

        if (direction === 'vertical') {
            pCtx.fillStyle = color1;
            pCtx.fillRect(0, 0, size / 2, size);
            pCtx.fillStyle = color2;
            pCtx.fillRect(size / 2, 0, size / 2, size);
        } else if (direction === 'horizontal') {
            pCtx.fillStyle = color1;
            pCtx.fillRect(0, 0, size, size / 2);
            pCtx.fillStyle = color2;
            pCtx.fillRect(0, size / 2, size, size / 2);
        } else if (direction === 'diagonal') {
            pCtx.fillStyle = color1;
            pCtx.fillRect(0, 0, size * 2, size * 2);
            pCtx.fillStyle = color2;
            pCtx.beginPath();
            pCtx.moveTo(0, 0);
            pCtx.lineTo(size, 0);
            pCtx.lineTo(0, size);
            pCtx.closePath();
            pCtx.fill();
            pCtx.beginPath();
            pCtx.moveTo(size * 2, size * 2);
            pCtx.lineTo(size, size * 2);
            pCtx.lineTo(size * 2, size);
            pCtx.closePath();
            pCtx.fill();
        }

        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    },

    /**
     * Draw dots pattern background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - Background color
     * @param {string} color2 - Dot color
     */
    drawDotsPattern(ctx, width, height, color1, color2) {
        const patternCanvas = document.createElement('canvas');
        const size = 20;
        patternCanvas.width = size;
        patternCanvas.height = size;

        const pCtx = patternCanvas.getContext('2d');
        pCtx.fillStyle = color1;
        pCtx.fillRect(0, 0, size, size);

        pCtx.fillStyle = color2;
        pCtx.beginPath();
        pCtx.arc(size / 2, size / 2, 4, 0, Math.PI * 2);
        pCtx.fill();

        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    },

    /**
     * Draw check (checkerboard) pattern background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - First color
     * @param {string} color2 - Second color
     */
    drawCheckPattern(ctx, width, height, color1, color2) {
        const patternCanvas = document.createElement('canvas');
        const size = 20;
        patternCanvas.width = size * 2;
        patternCanvas.height = size * 2;

        const pCtx = patternCanvas.getContext('2d');
        pCtx.fillStyle = color1;
        pCtx.fillRect(0, 0, size * 2, size * 2);

        pCtx.fillStyle = color2;
        pCtx.fillRect(0, 0, size, size);
        pCtx.fillRect(size, size, size, size);

        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    },

    /**
     * Draw wave pattern background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} color1 - Background color
     * @param {string} color2 - Wave color
     */
    drawWavePattern(ctx, width, height, color1, color2) {
        const patternCanvas = document.createElement('canvas');
        const size = 40;
        patternCanvas.width = size;
        patternCanvas.height = size;

        const pCtx = patternCanvas.getContext('2d');
        pCtx.fillStyle = color1;
        pCtx.fillRect(0, 0, size, size);

        pCtx.strokeStyle = color2;
        pCtx.lineWidth = 3;
        pCtx.beginPath();
        for (let i = 0; i <= size; i += 5) {
            const x = i;
            const y = size / 2 + Math.sin(i / 5) * 5;
            if (i === 0) {
                pCtx.moveTo(x, y);
            } else {
                pCtx.lineTo(x, y);
            }
        }
        pCtx.stroke();

        const pattern = ctx.createPattern(patternCanvas, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, width, height);
    },

    /**
     * Draw background based on configuration
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {Object} config - Background configuration
     */
    draw(ctx, width, height, config) {
        const { type, color, colors, direction, angle, pattern } = config;

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

            case 'pattern':
                const [patternColor1, patternColor2] = colors;
                switch (pattern) {
                    case 'stripe-vertical':
                        this.drawStripePattern(ctx, width, height, patternColor1, patternColor2, 'vertical');
                        break;
                    case 'stripe-horizontal':
                        this.drawStripePattern(ctx, width, height, patternColor1, patternColor2, 'horizontal');
                        break;
                    case 'stripe-diagonal':
                        this.drawStripePattern(ctx, width, height, patternColor1, patternColor2, 'diagonal');
                        break;
                    case 'dots':
                        this.drawDotsPattern(ctx, width, height, patternColor1, patternColor2);
                        break;
                    case 'check':
                        this.drawCheckPattern(ctx, width, height, patternColor1, patternColor2);
                        break;
                    case 'wave':
                        this.drawWavePattern(ctx, width, height, patternColor1, patternColor2);
                        break;
                }
                break;
        }
    }
};
