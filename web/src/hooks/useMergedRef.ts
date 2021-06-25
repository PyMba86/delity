import React from "react";

export function useMergedRef<T = any>(...refs: React.ForwardedRef<T>[]) {
    return (node: T) => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref != null) {
                ref.current = node;
            }
        })
    }
}