import {CommonProps, ThemeNumberSize, ThemeSize, useTheme} from "../../theme";
import React from "react";
import {TransitionName} from "../Transition/transitions";
import useStyles from './Popover.styles';
import {useClickOutside} from "../../hooks/useClickOutside";
import {useReducedMotion} from "../../hooks/useReducedMotion";
import {useId} from "../../hooks/useId";
import cx from "clsx";
import {Transition} from "../Transition";
import {Text} from "../Text";

export interface PopoverProps extends CommonProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {

    /** Disable closing by click outside */
    noClickOutside?: boolean;

    /** Disable focus trap */
    noFocusTrap?: boolean;

    /** Disable close on escape */
    noEscape?: boolean;

    /** Adds close button */
    withCloseButton?: boolean;

    /** True to disable popover */
    disabled?: boolean;

    /** Popover placement relative to target */
    placement?: 'center' | 'end' | 'start';

    /** Popover position relative to target */
    position?: 'left' | 'right' | 'top' | 'bottom';

    /** Space between popover and target in px */
    gutter?: number;

    /** Customize mount/unmount transition */
    transition?: TransitionName;

    /** Mount/unmount transition duration in ms */
    transitionDuration?: number;

    /**  Mount/unmount transition timing function */
    transitionTimingFunction?: string;

    /** Adds arrow, arrow position depends on position */
    withArrow?: boolean;

    /** Arrow size in px */
    arrowSize?: number;

    /** Popover z-index */
    zIndex?: number;

    /** True to display popover */
    opened: boolean;

    /** Called when popover close */
    onClose?: () => void;

    /** Element which is used to position popover */
    target: React.ReactNode;

    /** Content inside popover */
    children: React.ReactNode;

    /** Optional popover title */
    title?: React.ReactNode;

    /** Popover body padding */
    spacing?: ThemeNumberSize;

    /** Popover body radius */
    radius?: ThemeNumberSize;

    /** Popover shadow */
    shadow?: ThemeSize;

    /** Popover body styles */
    bodyStyle?: React.CSSProperties;

    bodyClassName?: string;

    /** aria-label for close */
    closeButtonLabel?: string;
}

export function Popover(
    {
        className,
        colorScheme,
        children,
        target,
        title,
        onClose,
        opened,
        zIndex = 1000,
        arrowSize = 4,
        withArrow = false,
        transition = 'fade',
        transitionDuration = 200,
        transitionTimingFunction,
        gutter = 10,
        position = 'left',
        placement = 'center',
        disabled = false,
        noClickOutside = false,
        noFocusTrap = false,
        noEscape = false,
        withCloseButton = false,
        radius = 'sm',
        spacing = 'md',
        shadow = 'sm',
        bodyStyle,
        bodyClassName,
        closeButtonLabel,
        id,
        ...props
    }: PopoverProps) {

    const theme = useTheme(colorScheme);

    const classes = useStyles(colorScheme, {
        theme,
        gutter,
        arrowSize,
        radius,
        spacing,
        shadow
    });

    const handleClose = () => typeof onClose === 'function' && onClose();

    const useClickOutsideRef = useClickOutside(() => !noClickOutside && handleClose());

    const reduceMotion = useReducedMotion();

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!noEscape && event.nativeEvent.code === 'Escape') {
            handleClose();
        }
    }

    const uuid = useId(id);

    const titleId = `${uuid}-title`;

    const bodyId = `${uuid}-body`;

    return (
        <div className={cx(classes.wrapper, className)} ref={useClickOutsideRef} id={id} {...props}>
            <Transition transition={transition}
                        mounted={opened && !disabled}
                        duration={reduceMotion ? 0 : transitionDuration}
                        timingFunction={transitionTimingFunction || theme.transitionTimingFunction}
            >
                {(transitionStyles) => (
                    <div
                        style={transitionStyles}
                        role="dialog"
                        tabIndex={-1}
                        aria-labelledby={titleId}
                        aria-describedby={bodyId}
                        className={classes.popoverWrapper}
                        onKeyDownCapture={handleKeydown}
                    >
                        <div
                            className={cx(classes.popover, classes[position], classes[placement], bodyClassName)}
                            style={{ zIndex, ...bodyStyle }}
                        >
                            {withArrow && <div className={classes.arrow} />}

                            <div className={classes.body}>
                                {!!title && (
                                    <div className={classes.header} >
                                        <Text size="sm" id={titleId} >
                                            {title}
                                        </Text>
                                    </div>
                                )}

                                <div className={classes.inner} id={bodyId}>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Transition>

            <div  className={classes.target}>
                {target}
            </div>
        </div>
    )

}