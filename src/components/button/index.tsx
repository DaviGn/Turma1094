interface ButtonProps {
    type?: 'submit' | 'reset' | 'button' | undefined;
    className?: string;
    text: string;
    onClick: () => void;
}

export default function Button({ type, text, onClick, ...rest }: ButtonProps) {
    return (
        <button type={type} onClick={onClick} {...rest}>
            {text}
        </button>
    );
}
