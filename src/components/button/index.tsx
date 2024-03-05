import { ButtonHTMLAttributes } from 'react';

import './styles.css';

export enum ButtonVariant {
    'submit',
    'cancel'
}

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    variant: ButtonVariant;
    text: string;
    onClick: () => void;
}

const buttonVariantClassMap = {
    [ButtonVariant.cancel]: 'btn-default',
    [ButtonVariant.submit]: 'btn-submit'
};

export default function Button({ variant, text, ...rest }: ButtonProps) {
    return (
        <button className={`btn ${buttonVariantClassMap[variant]}`} {...rest}>
            {text}
        </button>
    );
}
