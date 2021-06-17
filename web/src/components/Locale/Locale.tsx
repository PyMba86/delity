import {Renderable, RenderableMapping, RenderableValues, ResolvedType} from "./types";
import {processStringToChildren} from "./processor";
import {LocaleConsumer} from "./LocaleContext";
import React, {Fragment, FunctionComponent, ReactChild} from "react";
import {ExclusiveUnion} from "../../types";

export function lookupToken<T extends RenderableValues,
    D extends Renderable<T>,
    R extends ResolvedType<D>>(
    token: string,
    valueDefault: D,
    mapping?: RenderableMapping,
    mappingFunc?: (token: string) => string,
    primitiveValues?: boolean,
    values?: T
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

function errorOnMissingValues(token: string): never {
    throw new Error(
        `Locale mapping for token "${token}" is a formatting function but no values were provided`
    )
}

interface LocaleTokenShape<T, D extends Renderable<T>> {
    token: string;
    default: D;
    children?: (x: ResolvedType<D>) => ReactChild;
    primitiveValues?: boolean;
    values?: T;
}

interface LocaleTokensShape<T extends any[]> {
    tokens: string[];
    defaults: T;
    children: (x: Array<T[number]>) => ReactChild;
}

export type LocaleProps<T,
    D extends Renderable<T>,
    A extends any[]> = ExclusiveUnion<LocaleTokenShape<T, D>, LocaleTokensShape<A>>;

function isLocaleTokensShape<T extends any[]>(
    x: LocaleProps<any, any, T>
): x is LocaleTokensShape<T> {
    return x.tokens != null;
}

const Locale = <T extends {},
    D extends Renderable<T>,
    A extends any[]>(props: LocaleProps<T, D, A>) => (
    <LocaleConsumer>
        {(config) => {

            const {mapping, mappingFunc} = config;

            if (isLocaleTokensShape(props)) {
                return props.children(
                    props.tokens.map((token, idx) =>
                        lookupToken(token, props.defaults[idx],
                            mapping, mappingFunc, props.primitiveValues))
                )
            }

            const tokenValue = lookupToken(
                props.token,
                props.default,
                mapping,
                mappingFunc,
                props.primitiveValues,
                props.values
            );

            if (props.children) {
                return props.children(tokenValue);
            } else {
                return tokenValue;
            }
        }}
    </LocaleConsumer>
);

export {Locale};