import AppState, {AppError} from "./state";

export interface DisplayErrorAction {
    type: 'displayError';
    payload: {
        error: AppError["type"];
        errorId: AppError['id'];
    }
}

export interface DisplayLoaderAction {
    type: 'displayLoader';
    payload: {
        value: boolean;
    }
}

export type AppStateActionTypes = DisplayErrorAction | DisplayLoaderAction;

function displayError(
    prevState: AppState,
    errorType: AppError['type'],
    errorId?: AppError['id']
): AppState {

    return {
        ...prevState,
        error: {
            id: errorId,
            type: errorType
        },
        loading: false
    }
}

function displayLoader(prevState: AppState, value: boolean): AppState {
    return {
        ...prevState,
        loading: value
    }
}

function reduceAppState(
    prevState: AppState,
    action: AppStateActionTypes
): AppState {
    switch (action.type) {
        case "displayError":
            return displayError(
                prevState,
                action.payload.error,
                action.payload.errorId
            );
        case "displayLoader":
            return displayLoader(
                prevState,
                action.payload.value
            );
        default:
            return prevState;
    }
}

export default reduceAppState;