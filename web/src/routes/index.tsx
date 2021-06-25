import {AppLayout} from "../components/AppLayout";
import React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {useAppState} from "../hooks/useAppState";
import {useAppLocale} from "../hooks/useAppLocale";
import {LoginLoading} from "../auth/components/LoginLoading";
import {Switch} from "react-router-dom";
import {AuthRouter} from "../auth";

export function Routes() {

    const [appState, dispatchAppState] = useAppState();

    const {loading: localeLoading} = useAppLocale();

    const appPageLoaded = !localeLoading;

    const appPageLoading = localeLoading;

    return (
        <>
            {appPageLoaded ? (
                <AppLayout>
                    <ErrorBoundary
                        fallback={<div>Oh no</div>}
                        onError={e => {
                            dispatchAppState({
                                type: "displayError",
                                payload: {
                                    error: "unhandled",
                                    errorId: 0
                                }
                            })
                        }
                        }>
                        <Switch>

                        </Switch>
                    </ErrorBoundary>
                </AppLayout>
            ) : appPageLoading ? (
                <LoginLoading/>
            ) : (
                <AuthRouter/>
            )}
        </>
    )
}