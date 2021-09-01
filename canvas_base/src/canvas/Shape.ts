import { SceneCanvas } from "./Canvas";
import { Node, NodeConfig } from "./Node";

export interface ShapeConfig extends NodeConfig {
    fill?: string;
    stroke?: string | CanvasGradient;
}

export class Shape<
    Config extends ShapeConfig = ShapeConfig
> extends Node<Config> {
    canvas = new SceneCanvas();

    constructor(config?: Config) {
        super(config);
    }

    getCanvas() {
        return this.canvas;
    }

    getContext() {
        return this.getLayer().getContext();
    }

    drawScene(can?: SceneCanvas, top?: Node) {
        
    }
} 