import { ButtonHTMLAttributes } from 'react';
import { Button } from './styles';

export enum ButtonVariant {
    'default',
    'submit'
}

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant?: ButtonVariant;
    children: React.ReactNode;
    onClick: () => void;
}

export default function ButtonComponent({ children, ...rest }: ButtonProps) {
    return <Button {...rest}>{children}</Button>;
}
