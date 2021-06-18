import {RenderableMapping} from "./types";
import React, {createContext} from "react";

export interface LocaleContextProps {
    mapping?: RenderableMapping;
    mappingFunc?: (value: string) => string;
    locale?: string;
}

const LocaleContext
    = createContext<LocaleContextProps>({});

const {Provider: LocaleProvider, Consumer: LocaleConsumer} = LocaleContext;

export {LocaleProvider, LocaleConsumer, LocaleContext};