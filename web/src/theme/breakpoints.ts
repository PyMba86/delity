export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BreakpointValues = { [key in Breakpoint]: number };

export type BreakpointsOptions = {
    unit: string;
    step: number;
    values: BreakpointValues;
};

export interface Breakpoints {
    up: (key: Breakpoint | number) => string;
    down: (key: Breakpoint | number) => string;
    between: (start: Breakpoint | number, end: Breakpoint | number) => string;
    only: (key: Breakpoint) => string;
}

export function createBreakpoints({unit, step, values}: BreakpointsOptions): Breakpoints {

    const keys = Object.keys(values) as Array<Breakpoint>;

    function up(key: Breakpoint | number) {
        const value = typeof key === 'number' ? key : values[key];
        return `@media (min-width:${value}${unit})`;
    }

    function down(key: Breakpoint | number) {
        const value = typeof key === 'number' ? key : values[key];
        return `@media (max-width:${value - step / 100}${unit})`;
    }

    function between(start: Breakpoint | number, end: Breakpoint | number) {
        return (
            `@media (min-width:${
                typeof start === 'number' ? start : values[start]
            }${unit}) and ` +
            `(max-width:${
                (typeof end === 'number' ? end : values[end]) - step / 100
            }${unit})`
        );
    }

    function only(key: Breakpoint) {
        if (keys.indexOf(key) + 1 < keys.length) {
            return between(key, keys[keys.indexOf(key) + 1]);
        }

        return up(key);
    }

    return {
        up,
        down,
        between,
        only
    };
}

export const breakpoints: Breakpoints = createBreakpoints({
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
    unit: 'px',
    step: 5,
});