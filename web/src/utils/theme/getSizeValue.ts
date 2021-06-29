export function getSizeValue(
    {
        size,
        sizes,
        defaultSize
    }: {
        size?: string | number;
        sizes: Record<string, number>;
        defaultSize?: string
    }): number {
    if (typeof size === 'number') {
        return size;
    }
    return size ? (sizes[size] || (defaultSize && sizes[defaultSize]) || 0) : 0;
}