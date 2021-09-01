export interface GetSet<Type, This> {
    (): Type;
    (v: Type): This;
}

export interface Vector2d {
    x: number;
    y: number;
}

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IFrame {
    time: number;
    timeDiff: number;
    lastTime: number;
    frameRate: number;
}

export type AnimationFn = (frame?: IFrame) => boolean | void;

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface RGBA extends RGB {
    a: number;
}