import { Canvas } from './Canvas';
import { Container } from './Container';
import { Layer } from './Layer';
import { Stage } from './Stage';
import { Vector2d } from './types';

export interface NodeConfig {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    visible?: boolean;
    id?: string;
    name?: string;
    opacity?: Number;
    scale?: Vector2d;
    scaleX?: number;
    scaleY?: number;
    rotation?: number;
    rotationDeg?: number;
    offset?: Vector2d;
    offsetX?: number;
    offsetY?: number;
    preventDefault?: boolean;
}

let idCounter = 1;

export abstract class Node<Config extends NodeConfig = NodeConfig> {
    _id = idCounter++;
    eventListeners: {
        [index: string]: Array<{ name: string; handler: Function }>;
    } = {};
    index: number = 0;
    parent: Container<Node> | null = null;

    nodeType!: string;
    className!: string;

	constructor(config?: Config) {
		this.setAttrs(config);
	}

    setAttrs(config) {
		Object.keys(config).forEach(key => {
			this[key] = config[key];
		});
	}

    _requestDraw() {
        const drawNode = this.getLayer() || this.getStage();
        drawNode?.batchDraw();
    }

    hasChildren() {
        return false;
    }	

    getParent() {
        return this.parent;
    }

    getLayer(): Layer | null {
        const parent = this.getParent();
        return parent ? parent.getLayer() : null;
    }

    getStage(): Stage | null {
        const parent = this.getParent();
        return parent ? parent.getStage() : undefined;
    }

    abstract drawScene(canvas?: Canvas, top?: Node): void;

    draw() {
        this.drawScene();
        return this;
    }

    moveTo(newContainer: any) {
        if (this.getParent() !== newContainer) {
            this._remove();
            newContainer.add(this);
        }
        return this;
    }

    _remove() {
        const parent = this.getParent();

        if (parent && parent.children) {
            parent.children.splice(this.index, 1);
            parent._setChildrenIndices();
            this.parent = null;
        }
    }
}
