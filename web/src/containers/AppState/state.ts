export interface AppError {
    type: string | undefined;
    id: string | number | undefined;
}

interface AppState {
    error: AppError | null;
    loading: boolean;
}

export const initialAppState: AppState = {
    error: null,
    loading: false
}

export default AppState;