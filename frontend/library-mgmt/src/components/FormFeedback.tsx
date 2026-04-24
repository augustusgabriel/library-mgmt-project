export type FeedbackMessage = {
    text: string;
    type: 'success' | 'error';
    details?: Record<string, string[] | string>;
}

type FeedbackProps = {
    message: FeedbackMessage | null;
};

export function FormFeedback({ message }: FeedbackProps){
    if (!message) return null;

    const isError = message.type === 'error';

    return (
        <div>
            <strong>{message.text}</strong>

            {isError && message.details && (
                <ul>
                    {Object.entries(message.details).map(([field, errors]) => (
                        <li key={field}>
                            <span>{field}</span>: {
                                Array.isArray(errors) ? errors.join(", ") : errors
                            }
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}