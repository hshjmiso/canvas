import { SceneCanvas } from "./Canvas";
import { NodeConfig, Node } from "./Node";

export interface ContainerConfig extends NodeConfig {
    clipX?: number;
    clipY?: number;
    clipWidth?: number;
    clipHeight?: number;
}

export abstract class Container<
    ChildType extends Node = Node
> extends Node<ContainerConfig> {
    children: Array<ChildType> | undefined = [];

    getChildren() {
        return this.children || [];
    }
    hasChildren() {
        return this.getChildren().length > 0;
    }
    add(...children: ChildType[]) {
        if (arguments.length > 1) {
            for (let i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }

        const child = children[0];
        if (child.getParent()) {
            child.moveTo(this);
            return this;
        }
    }
    _setChildrenIndices() {
        this.children?.forEach((child, n) => {
            child.index = n
        });
        this._requestDraw();
    }
    drawScene(can?: SceneCanvas, top?: Node) {
        
    }
}