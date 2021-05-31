import React from "react";

export type PropsOf<
    C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
    > = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>

type AsProp<C extends React.ElementType> = {
    /**
     * An override of the default HTML tag.
     * Can also be another React component.
     */
    component?: C
}

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
    ExtendedProps = {},
    OverrideProps = {}
    > = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
    C extends React.ElementType,
    Props = {}
    > = ExtendableProps<PropsOf<C>, Props>

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type ComponentPassThrough<
    C extends React.ElementType,
    Props = {}
    > = InheritableElementProps<C, Props & AsProp<C>>

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