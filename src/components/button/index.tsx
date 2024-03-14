import { ButtonHTMLAttributes } from 'react';
import { Button } from './styles';

export enum ButtonVariant {
    'default',
    'submit'
}

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    text: string;
    onClick: () => void;
}

export default function ButtonComponent({ text, ...rest }: ButtonProps) {
    return <Button {...rest}>{text}</Button>;
}
