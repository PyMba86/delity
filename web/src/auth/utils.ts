export enum TOKEN_STORAGE_KEY {
    AUTH = "auth",
    CSRF = "csrf"
}

export const getAuthToken = () =>
    localStorage.getItem(TOKEN_STORAGE_KEY.AUTH);

export const setAuthToken = (auth: string) =>
    localStorage.setItem(TOKEN_STORAGE_KEY.AUTH, auth);

export const removeAuthToken = () =>
    localStorage.removeItem(TOKEN_STORAGE_KEY.AUTH);