import {LoginForm} from "../components/LoginForm";
import {useUser} from "../../hooks/useUser";
import {useState} from "react";
import {LoginFormData} from "../components/types/form";

export function LoginView() {

    const {
        login,
        tokenAuthLoading
    } = useUser();

    const [isError, setIsError] = useState(false);

    const handleSubmit = async ({email, password}: LoginFormData) => {
        try {
            await login(email, password);
        } catch (e) {
            setIsError(true);
        }
    }

    return (
        <LoginForm error={isError}
                   onSubmit={handleSubmit}
                   disabled={tokenAuthLoading}/>
    )
}