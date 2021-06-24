import {useLayoutEffect} from "react";

export function useDocumentTitle(title: string) {
    useLayoutEffect(() => {
        if (title.trim().length > 0) {
            document.title = title.trim();
        }
    }, [title])
}