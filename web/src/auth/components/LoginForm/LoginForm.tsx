import {useForm} from "../../../hooks/useForm";
import {LoginFormData} from "../types/form";
import {TextInput} from "../../../components/TextInput";
import {FormSpacer} from "../../../components/FormSpacer";

export function LoginForm() {

    const form = useForm<LoginFormData>({
        initialValues: {
            email: '',
            password: ''
        },
        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
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
            <TextInput
                value={form.values.password}
            />
        </form>
    )
}