import React from "react";
import {useLocalStorageValue} from "../../hooks/useLocalStorageValue";
import {LocaleProvider} from "../../components/Locale";
import {RenderableMapping} from "../../components/Locale/types";

export enum AppLocale {
    EN = "en",
    RU = 'ru'
}

export const appLocaleNames: Record<AppLocale, string> = {
    [AppLocale.EN]: "English",
    [AppLocale.RU]: "Русский",
}

export function getMatchingLocale(languages: readonly string[]): AppLocale | undefined {
    const localeEntries = Object.entries(AppLocale);

    for (const language of languages) {
        for (const [name, locale] of localeEntries) {
            if (name.toLowerCase() === language.toLowerCase()) {
                return locale
            }
        }
    }
    return undefined;
}

const defaultAppLocale = AppLocale.EN;

export interface AppLocaleContextProps {
    locale: AppLocale;
    loading: boolean;
    setLocale: (locale: AppLocale) => void;
}

const LOCALE_KEY = 'AppLocale.Locale';

const AppLocaleContext = React.createContext<AppLocaleContextProps>({
    locale: defaultAppLocale,
    loading: false,
    setLocale: () => undefined
})

const {Consumer: AppLocaleConsumer} = AppLocaleContext;

const AppLocaleProvider: React.FC = (
    {
        children
    }) => {

    const [locale, setLocale] = useLocalStorageValue(
        LOCALE_KEY,
        getMatchingLocale(navigator.languages) || defaultAppLocale
    );

    const [loading, setLoading] = React.useState(false);

    const [mapping, setMapping] = React.useState<RenderableMapping>({});

    React.useEffect(() => {
        async function changeLocale() {

            setLoading(true);

            if (locale !== defaultAppLocale) {
                // It seems like Webpack is unable to use aliases for lazy imports
                const mod = await import(`../../locale/${locale}.json`);

                setMapping(mod.default);
            } else {
                setMapping({});
            }
        }

        changeLocale()
            .then(() => setLoading(false));

    }, [locale]);

    return (
        <LocaleProvider
            value={{
                locale,
                mapping
            }}>
            <AppLocaleContext.Provider
                value={{
                    locale,
                    setLocale,
                    loading
                }}>
                {children}
            </AppLocaleContext.Provider>
        </LocaleProvider>
    )
}

export {AppLocaleContext, AppLocaleProvider, AppLocaleConsumer}