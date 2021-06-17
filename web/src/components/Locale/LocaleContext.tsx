import {RenderableMapping} from "./types";
import React, {createContext} from "react";

export interface LocaleContextProps {
    mapping?: RenderableMapping;
    mappingFunc?: (value: string) => string;
    formatNumber?: (x: number) => string;
    formatDateTime?: (x: Date) => string;
    locale?: string;
}

const LocaleContext
    = createContext<LocaleContextProps>({});

const {Provider: LocaleProvider, Consumer: LocaleConsumer} = LocaleContext;

export {LocaleProvider, LocaleConsumer, LocaleContext};