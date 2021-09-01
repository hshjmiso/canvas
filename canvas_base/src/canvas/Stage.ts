import { Container, ContainerConfig } from "./Container";
import { Layer } from "./Layer";
import { GetSet, Vector2d } from "./types";

export interface StageConfig extends ContainerConfig {
    container: HTMLDivElement | string;
}

export const stages: Stage[] = [];

export class Stage extends Container<Layer> {
    content: HTMLDivElement;
    pointerPos: Vector2d | null;

    constructor(config: StageConfig) {
        super(config);
        this._buildDOM();
    }

    _buildDOM() {
        const container = this.container();
        // clear content inside container
        container.innerHTML = '';

        // content
        this.content = document.createElement('div');
        this.content.style.position = 'relative';
        this.content.style.userSelect = 'none';
        this.content.className = 'canvas';

        this.content.setAttribute('role', 'presetation');

        container.appendChild(this.content);
    }

    batchDraw() {
        this.getChildren().forEach(layer => {
            layer.batchDraw();
        });
        return this;
    }

    container: GetSet<HTMLDivElement, this>;
}