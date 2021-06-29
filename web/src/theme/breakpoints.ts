export type ThemeBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BreakpointValues = { [key in ThemeBreakpoint]: number };

export type BreakpointsOptions = {
    unit: string;
    step: number;
    values: BreakpointValues;
};

export interface Breakpoints {
    up: (key: ThemeBreakpoint | number) => string;
    down: (key: ThemeBreakpoint | number) => string;
    between: (start: ThemeBreakpoint | number, end: ThemeBreakpoint | number) => string;
    only: (key: ThemeBreakpoint) => string;
    width: (key: ThemeBreakpoint) => number;
}

export function createBreakpoints({unit, step, values}: BreakpointsOptions): Breakpoints {

    const keys = Object.keys(values) as Array<ThemeBreakpoint>;

    function up(key: ThemeBreakpoint | number) {
        const value = typeof key === 'number' ? key : values[key];
        return `@media (min-width:${value}${unit})`;
    }

    function down(key: ThemeBreakpoint | number) {
        const value = typeof key === 'number' ? key : values[key];
        return `@media (max-width:${value - step / 100}${unit})`;
    }

    function between(start: ThemeBreakpoint | number, end: ThemeBreakpoint | number) {
        return (
            `@media (min-width:${
                typeof start === 'number' ? start : values[start]
            }${unit}) and ` +
            `(max-width:${
                (typeof end === 'number' ? end : values[end]) - step / 100
            }${unit})`
        );
    }

    function only(key: ThemeBreakpoint) {
        if (keys.indexOf(key) + 1 < keys.length) {
            return between(key, keys[keys.indexOf(key) + 1]);
        }

        return up(key);
    }

    function width(key: ThemeBreakpoint) {
        return values[key];
    }

    return {
        up,
        down,
        between,
        only,
        width
    };
}

export const breakpoints: Breakpoints = createBreakpoints({
    values: {
        xs: 570,
        sm: 770,
        md: 970,
        lg: 1170,
        xl: 1370,
    },
    unit: 'px',
    step: 5,
});