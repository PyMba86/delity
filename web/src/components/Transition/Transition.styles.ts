import {TransitionName, transitions, TransitionStyleState} from "./transitions";
import {TransitionStatus} from "react-transition-group";
import React from "react";

const transitionStatuses: Record<TransitionStatus, TransitionStyleState> = {
    entering: 'in',
    entered: 'in',
    exiting: 'out',
    exited: 'out',
    unmounted: 'out'
};

export function getTransitionStyles(
    {
        transition,
        state,
        duration,
        timingFunction
    }: {
        transition: TransitionName,
        state: TransitionStatus,
        duration: number,
        timingFunction: React.CSSProperties['transitionTimingFunction']
    }): React.CSSProperties {

    const shared: React.CSSProperties = {
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: timingFunction
    };

    return {
        transitionProperty: transitions[transition].transitionProperty,
        ...shared,
        ...transitions[transition].common,
        ...transitions[transition][transitionStatuses[state]]
    }
}