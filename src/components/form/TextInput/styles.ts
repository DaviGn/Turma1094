import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 11px 0px;

    > div {
        margin-bottom: 9px;
    }

    label {
        margin-right: 13px;
    }

    input {
        padding: 6px 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
`;

export const ErrorMessage = styled.span`
    color: #f45;
`;
