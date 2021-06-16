import React from 'react';
import {Transition as RTGTransition} from 'react-transition-group';
import {TransitionName} from "./transitions";
import {useReducedMotion} from "../../hooks/useReducedMotion";
import {getTransitionStyles} from "./Transition.styles";
import {CommonProps, useTheme} from "../../theme";

export interface TransitionProps extends Omit<CommonProps, 'className'> {
    /** Predefined transition name or transition styles */
    transition: TransitionName;

    /** Transition duration in ms */
    duration?: number;

    /** Transition timing function, defaults to theme.transitionTimingFunction */
    timingFunction?: string;

    /** When true, component will be mounted */
    mounted: boolean;

    /** Render function with transition styles argument */
    children(styles: React.CSSProperties): React.ReactNode;

    /** Calls when exit transition ends */
    onExited?: () => void;

    /** Calls when exit transition starts */
    onExit?: () => void;

    /** Calls when enter transition starts */
    onEnter?: () => void;

    /** Calls when enter transition ends */
    onEntered?: () => void;
}

export function Transition(
    {
        transition,
        duration = 250,
        mounted,
        children,
        timingFunction,
        onExit,
        onEnter,
        onEntered,
        onExited,
        colorScheme
    }: TransitionProps) {

    const theme = useTheme(colorScheme);

    const reduceMotion = useReducedMotion();

    return (
        <RTGTransition in={mounted}
                       timeout={duration}
                       unmountOnExit={true}
                       mountOnEnter={true}
                       onEnter={(node: HTMLElement) => {
                           node.offsetHeight;
                           if (onEnter) {
                               onEnter();
                           }
                       }}
                       onExited={onExited}
                       onEntered={onEntered}
                       onExit={onExit}>
            {(transitionState) => children(
                getTransitionStyles({
                    transition,
                    duration: reduceMotion ? 0 : duration,
                    state: transitionState,
                    timingFunction: timingFunction || theme.transitionTimingFunction
                })
            )}
        </RTGTransition>
    )

}