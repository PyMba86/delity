import React, {useState} from "react";

export type ValidationRule<T> = {
    readonly [P in keyof T]?: (value: T[P]) => boolean;
};

export interface UseForm<T> {
    validationRules?: ValidationRule<T>;
    initialValues: T;
}

export function useForm<T extends { [key: string]: any }>(
    {
        initialValues,
        validationRules = {}
    }: UseForm<T>) {

    type ValidationErrors = Record<keyof T, boolean>;

    const initialErrors = Object.keys(initialValues)
        .reduce((acc, field) => {
            acc[field as keyof T] = false;
            return acc;
        }, {} as ValidationErrors);

    const [errors, setErrors] = useState(initialErrors);

    const [values, setValues] = useState(initialValues);

    const resetErrors = () => setErrors(initialErrors);

    const reset = () => {
        setValues(initialValues);
        resetErrors();
    };

    const validate = () => {
        let isValid = true;

        const validationErrors = Object.keys(values)
            .reduce((acc, field) => {

                const validate = validateRule(field);

                if (validate) {
                    acc[field as keyof T] = false;
                } else {
                    acc[field as keyof T] = true;
                    isValid = false;
                }

                return acc;
            }, {} as ValidationErrors);

        setErrors(validationErrors);

        return isValid;
    };

    const validateRule = (field: keyof T): boolean => {

        if (validationRules && typeof validationRules[field] === 'function') {

            const rule = validationRules[field];

            if (rule) {
                return rule(values[field]);
            }
        }

        return false;
    }

    const validateField = (field: keyof T) =>
        setErrors((currentErrors) => ({
            ...currentErrors,
            [field]: validateRule(field),
        }));

    const setFieldError = (field: keyof T, error: boolean) =>
        setErrors((currentErrors) => ({...currentErrors, [field]: error}));

    const setFieldValue = <K extends keyof T, U extends T[K]>(field: K, value: U) => {
        setValues((currentValues) => ({...currentValues, [field]: value}));
        setFieldError(field, false);
    };

    const onSubmit = (handleSubmit: (values: T) => any) => (event?: React.FormEvent) => {
        event && event.preventDefault();
        validate() && handleSubmit(values);
    };

    return {
        values,
        errors,
        validate,
        reset,
        setErrors,
        setValues,
        setFieldValue,
        setFieldError,
        validateField,
        resetErrors,
        validateRule,
        onSubmit
    };
}

