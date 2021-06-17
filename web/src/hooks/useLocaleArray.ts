import {ReactElement, useContext} from "react";
import {LocaleContext, lookupToken} from "../components/Locale";

// An array with multiple defaults can only be an array of strings or elements
type DefaultsRenderType<K extends Array<string | ReactElement>> = K extends Array<infer Item> ? Item : never;

export function useLocaleArray<D extends Array<string | ReactElement>>(
    tokens: string[],
    defaultValues: D,
    primitiveValues?: boolean,
): Array<DefaultsRenderType<D>> {

    const {mapping, mappingFunc} = useContext(LocaleContext);

    return tokens.map((token, idx) =>
        lookupToken(token, defaultValues[idx], mapping, mappingFunc, primitiveValues))
}