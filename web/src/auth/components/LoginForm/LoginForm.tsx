import {useForm} from "../../../hooks/useForm";
import {LoginFormData} from "../types/form";
import {TextInput} from "../../../components/TextInput";
import {FormSpacer} from "../../../components/FormSpacer";
import {PasswordInput} from "../../../components/PasswordInput";

export function LoginForm() {

    const form = useForm<LoginFormData>({
        initialValues: {
            email: '',
            password: ''
        },
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value),
        },
    });

    return (
        <form onSubmit={form.onSubmit(
            (values) => console.log(values))}>
            <TextInput
                label={'Email'}
                error={form.errors.email && 'Please specify valid email'}
                value={form.values.email}
                onChange={event => form.setFieldValue('email', event.currentTarget.value)}
            />
            <FormSpacer/>
            <PasswordInput
                label={"Password"}
                showPasswordLabel={"Show password"}
                hidePasswordLabel={"Hide password"}
                value={form.values.password}
                onChange={event => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password &&
                    "Password should contain 1 number, 1 letter and at least 6 characters"}
            />
        </form>
    )
}