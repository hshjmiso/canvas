import { Canvas } from "./Canvas";

export class Context {
	canvas: Canvas;
	_context: CanvasRenderingContext2D;

	constructor(canvas) {
		this.canvas = canvas;
		this._context = canvas._canvas.getContext('2d') as CanvasRenderingContext2D;
	}
}

export class SceneContext extends Context {}
