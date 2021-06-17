import {ReactChild} from "react";

export interface RenderableValues {
    // undefined values are ignored, but including support here improves usability
    [key: string]: ReactChild | undefined;
}

export interface RenderableMapping {
    [key: string]: Renderable<object>;
}

export type Renderable<T>
    = ReactChild | ((values: T) => ReactChild);

export type ResolvedType<T>
    = T extends (...args: any[]) => any ? ReturnType<T> : T;

