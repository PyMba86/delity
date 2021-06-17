import {Renderable, RenderableMapping, RenderableValues, ResolvedType} from "./types";
import {processStringToChildren} from "./processor";
import React, {Fragment, FunctionComponent, ReactChild} from "react";
import {ExclusiveUnion} from "../../types";

function errorOnMissingValues(token: string): never {
    throw new Error(
        `Locale mapping for token "${token}" is a formatting function but no values were provided`
    )
}

function lookupToken<T extends RenderableValues,
    D extends Renderable<T>,
    R extends ResolvedType<D>>(
    token: string,
    mapping: RenderableMapping,
    valueDefault: D,
    mappingFunc?: (token: string) => string,
    values?: T,
    primitiveValues?: boolean
): R {

    let renderable = (mapping && mapping[token]) || valueDefault;

    if (typeof renderable === 'function') {
        if (values === undefined) {
            return errorOnMissingValues(token);
        }

        // @ts-ignore TypeScript complains that `DEFAULT` doesn't have a call signature
        //but we verified `renderable` is a function
        return renderable(values);

    } else if (values === undefined || typeof renderable !== 'string') {
        if (mappingFunc && typeof valueDefault === 'string') {
            renderable = mappingFunc(valueDefault);
        }

        return renderable as R;
    }

    const children = processStringToChildren(
        renderable, values, mappingFunc, primitiveValues);

    if (typeof children === 'string') {
        return children as R;
    }

    const Component: FunctionComponent = () => {
        return <Fragment>{children}</Fragment>
    };

    return React.createElement(Component, values) as R;
}

interface LocaleTokenShape<T, D extends Renderable<T>> {
    token: string;
    defaultValue: D;
    children?: (x: ResolvedType<D>) => ReactChild;
    values?: T;
}

interface LocaleTokensShape<T extends any[]> {
    tokens: string[];
    defaults: T;
    children: (x: Array<T[number]>) => ReactChild;
}

export type LocaleProps<T,
    D extends Renderable<T>,
    A extends any[]> = ExclusiveUnion<LocaleTokenShape<T, D>, LocaleTokensShape<A>;


const Locale = <T extends {},
    D extends Renderable<T>,
    A extends any[]>(
    {
        children,
        values,
        defaultValue,
        token,
        defaults,
        tokens
    }: LocaleProps<T, D, A>) => (

)