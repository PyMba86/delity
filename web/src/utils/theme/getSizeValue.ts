export function getSizeValue(
    {
        size,
        sizes,
        defaultSize
    }: {
        size: string | number;
        sizes: Record<string, string | number>;
        defaultSize?: string
    }) {
    if (typeof size === 'number') {
        return size;
    }

    return sizes[size] || size || (defaultSize && sizes[defaultSize]);
}