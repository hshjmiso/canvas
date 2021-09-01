import { SceneContext, Context } from './Context';
import { Util } from './Util';

interface ICanvasConfig {
    width?: number;
    height?: number;
    pixelRatio?: number;
}

export class Canvas {
	pixelRatio = 1;
	_canvas: HTMLCanvasElement;
	context: Context;
	width = 0;
	height = 0;
	constructor(config: ICanvasConfig) {
		this.pixelRatio = config.pixelRatio || 1;

		this._canvas = Util.createCanvasElement();
        // set inline styles
        this._canvas.style.padding = '0';
        this._canvas.style.margin = '0';
        this._canvas.style.border = '0';
        this._canvas.style.background = 'transparent';
        this._canvas.style.position = 'absolute';
        this._canvas.style.top = '0';
        this._canvas.style.left = '0';
	}

    getContext() {
        return this.context;
    }
    getPixelRatio() {
        return this.pixelRatio;
    }
    setPixelRatio(pixelRatio) {
        const prevRatio = this.pixelRatio;
        this.pixelRatio = pixelRatio;
        this.setSize(
            this.getWidth() / prevRatio,
            this.getHeight() / prevRatio
        );
    }

    setWidth(width) {
        const pixelRatio = this.pixelRatio;

        this.width = this._canvas.width = width * pixelRatio;
        this._canvas.style.width = width + 'px';

        const _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);
    }
    setHeight(height) {
        const pixelRatio = this.pixelRatio;

        this.height = this._canvas.height = height * pixelRatio;
        this._canvas.style.height = height + 'px';

        const _context = this.getContext()._context;
        _context.scale(pixelRatio, pixelRatio);

    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }

	setSize(width, height) {
		this.setWidth(width || 0);
		this.setHeight(height || 0);
	}
}

export class SceneCanvas extends Canvas {
	constructor(config = { width: 0, height: 0 }) {
		super(config);
		this.context = new SceneContext(this);
		this.setSize(config.width, config.height);
	}
}
