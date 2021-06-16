import {createMemoStyles, Theme, ThemeNumberSize, ThemeSize} from "../../theme";
import {getSizeValue} from "../../utils/theme/getSizeValue";


interface PopoverStylesProps {
    theme: Theme;
    gutter: number;
    arrowSize: number;
    shadow: ThemeSize;
    radius: ThemeNumberSize;
    spacing: ThemeNumberSize;
}

const horizontalPlacement = (arrowSize: number) => ({
    '&$center': {
        top: '50%',
        transform: 'translateY(-50%)',

        '& $arrow': {
            top: `calc(50% - ${arrowSize}px)`,
        },
    },

    '&$end': {
        bottom: 0,
        '& $arrow': {
            bottom: arrowSize * 2,
        },
    },

    '&$start': {
        top: 0,

        '& $arrow': {
            top: arrowSize * 2,
        },
    },
});

const verticalPlacement = (arrowSize: number) => ({
    '&$center': {
        left: '50%',
        transform: 'translateX(-50%)',

        '& $arrow': {
            left: `calc(50% - ${arrowSize}px)`,
        },
    },

    '&$end': {
        right: 0,
        '& $arrow': {
            right: arrowSize * 2,
        },
    },

    '&$start': {
        left: 0,

        '& $arrow': {
            left: arrowSize * 2,
        },
    },
});

export default createMemoStyles({
    center: {},
    start: {},
    end: {},

    wrapper: {
        position: 'relative',
        display: 'inline-flex'
    },

    popoverWrapper: {
        background: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },

    popover: ({theme, radius}: PopoverStylesProps) => ({
        position: 'absolute',
        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        pointerEvents: 'all',
        borderRadius: getSizeValue({size: radius, sizes: theme.radius})
    }),

    arrow: ({theme, arrowSize}: PopoverStylesProps) => ({
        width: arrowSize * 2,
        height: arrowSize * 2,
        position: 'absolute',
        transform: 'rotate(45deg)',
        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
        background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        zIndex: 1
    }),

    body: ({theme, radius, shadow}: PopoverStylesProps) => ({
        border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
        }`,
        boxShadow: theme.shadows[shadow],
        borderRadius: getSizeValue({size: radius, sizes: theme.radius})
    }),

    inner: ({theme, spacing}: PopoverStylesProps) => ({
        padding: getSizeValue({size: spacing, sizes: theme.spacing})
    }),

    header: ({theme, spacing}: PopoverStylesProps) => ({
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
        }`,
        padding: [theme.spacing.xs / 1.5,
            getSizeValue({size: spacing, sizes: theme.spacing})],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),

    target: {
        zIndex: 1,
    },

    closeButton: {
        position: 'absolute',
        top: 7,
        zIndex: 2,
        right: 10,
    },

    left: ({gutter, arrowSize}: PopoverStylesProps) => ({
        ...horizontalPlacement(arrowSize),
        right: `calc(100% + ${gutter}px)`,

        '& $arrow': {
            right: -arrowSize,
            borderLeft: 0,
            borderBottom: 0,
        },
    }),

    right: ({gutter, arrowSize}: PopoverStylesProps) => ({
        ...horizontalPlacement(arrowSize),
        left: `calc(100% + ${gutter}px)`,

        '& $arrow': {
            left: -arrowSize,
            borderRight: 0,
            borderTop: 0,
        },
    }),

    top: ({gutter, arrowSize}: PopoverStylesProps) => ({
        ...verticalPlacement(arrowSize),
        bottom: `calc(100% + ${gutter}px)`,

        '& $arrow': {
            bottom: -arrowSize,
            borderLeft: 0,
            borderTop: 0,
        },
    }),

    bottom: ({gutter, arrowSize}: PopoverStylesProps) => ({
        ...verticalPlacement(arrowSize),
        top: `calc(100% + ${gutter}px)`,

        '& $arrow': {
            top: -arrowSize,
            borderRight: 0,
            borderBottom: 0,
        },
    }),
})