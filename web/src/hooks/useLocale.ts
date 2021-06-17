import {Renderable} from "../components/Locale/types";
import {useContext} from "react";
import {LocaleContext, lookupToken} from "../components/Locale";

// A single default could be a string, react child, or render function
type DefaultRenderType<T, K extends Renderable<T>> = K;

export function useLocale<T extends {}, D extends Renderable<T>>(
    token: string,
    defaultValue: D,
    primitiveValues?: boolean,
    values?: T
): DefaultRenderType<T, D> {
    const {mapping, mappingFunc} = useContext(LocaleContext);

    return lookupToken(
        token, defaultValue, mapping, mappingFunc, primitiveValues, values)
}
