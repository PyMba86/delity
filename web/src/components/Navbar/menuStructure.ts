export interface MenuItem {
    label: string;
}

export function createMenuStructure(): MenuItem[] {
    return [
        {
            label: 'Dashboard'
        },
        {
            label: 'Apps'
        }
    ]
}