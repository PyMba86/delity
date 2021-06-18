import React from "react";
import {AppLocaleContext} from "../containers/AppLocale";

export function useAppLocale() {
    return React.useContext(AppLocaleContext);
}