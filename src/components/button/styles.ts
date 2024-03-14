import styled, { css } from 'styled-components';
import { ButtonVariant } from '.';

interface ButtonProps {
    variant?: ButtonVariant;
}

export const Button = styled.button<ButtonProps>`
    padding: 9px 13px;
    background-color: #ccc;
    border: none;
    border-radius: 9px;

    ${(props) =>
        props.variant === ButtonVariant.submit &&
        css`
            background-color: #32cd32;
        `}

    &:hover {
        background-color: ${(props) =>
            props.variant !== ButtonVariant.submit ? '#333' : '#228B22'};
    }
`;
