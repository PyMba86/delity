import React from "react";

export type ComponentPassThrough<T extends React.ElementType,
    Props> = Omit<React.ComponentPropsWithoutRef<T>, keyof Props> & {
    /** Element or component that will be used as root element */
    component?: T;
} & Props;

export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
};

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
    ? R : _TupleOf<T, N, [T, ...R]>;

export type Tuple<T, N extends number> = N extends N ?
    number extends N
        ? T[]
        : _TupleOf<T, N, []>
    : never;

/**
 * Returns member keys in U not present in T set to never
 * T = { 'one', 'two', 'three' }
 * U = { 'three', 'four', 'five' }
 * returns { 'four': never, 'five': never }
 */
export type DisambiguateSet<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};

/**
 * Allow either T or U, preventing any additional keys of the other type from being present
 */
export type ExclusiveUnion<T, U> = T | U extends object // if there are any shared keys between T and U
    ? (DisambiguateSet<T, U> & U) | (DisambiguateSet<U, T> & T) // otherwise the TS union is already unique
    : T | U;