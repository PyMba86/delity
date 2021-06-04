import AppState, {initialAppState} from "./state";
import React from "react";
import appStateReducer, {AppStateActionTypes} from "./reducer";

export type AppStateContextType = [
    AppState,
    React.Dispatch<AppStateActionTypes>
];

export const AppStateContext = React.createContext<AppStateContextType>([
    initialAppState,
    () => undefined
]);

const AppStateProvider: React.FC = (
    {
        children
    }
) => {

    const stateAndDispatch = React.useReducer(appStateReducer, initialAppState);

    const [state, dispatch] = stateAndDispatch;

    React.useEffect(() => {
        if (!state.error) {
            dispatch({
                type: "displayError",
                payload: {
                    error: undefined,
                    errorId: undefined
                }
            })
        }
    }, []);

    return (
        <AppStateContext.Provider value={stateAndDispatch}>
            {children}
        </AppStateContext.Provider>
    )
}

export const {Consumer} = AppStateContext;

export default AppStateProvider;