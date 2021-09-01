import { SceneCanvas } from "./Canvas";
import { Container, ContainerConfig } from "./Container";
import { Group } from "./Group";
import { Shape } from "./Shape";
import { Util } from "./Util";

export interface LayerConfig extends ContainerConfig {

}

export class Layer extends Container<Group | Shape> {
    canvas = new SceneCanvas();

    _waitingForDraw = false;

    constructor(config?: LayerConfig) {
        super(config);
    }

    getCanvas() {
        return this.canvas;
    }

    getNativeCanvasElement() {
        return this.canvas._canvas;
    }

    getContext() {
        return this.getCanvas().getContext();
    }

    batchDraw() {
        if (!this._waitingForDraw) {
            this._waitingForDraw = true;
            Util.requestAnimFrame(() => {
                this.draw();
                this._waitingForDraw = false;
            })
        }
        return this;
    }
}