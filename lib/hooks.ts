import { useState } from "react";
import type { ActionError, ActionFunction } from './actions';

export interface SubmissionState {
    loading: boolean;
    error: ActionError | null;
}

export type UseFormStateResult = [
    SubmissionState,
    (
        event: React.SyntheticEvent<HTMLFormElement>
    ) => Promise<void>
];

export function useFormHandler(action: ActionFunction): UseFormStateResult {
    const [state, setState] = useState<SubmissionState>({ loading: false, error: null });

    const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        setState({ loading: true, error: null });

        const form = event.currentTarget;
        const formData = new FormData(form);
        const result = await action(formData);

        if (result?.isError) {
            setState({ loading: false, error: result });
        } else {
            form.reset();
            setState({ loading: false, error: null });
        }
    };

    return [state, handleSubmit];
}