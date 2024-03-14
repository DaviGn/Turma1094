import styled from 'styled-components';
import Button from '../../../components/button';

export const Container = styled.div``;

export const ListContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;

    @media (max-width: 940px) {
        grid-template-columns: auto auto;
    }

    @media (max-width: 650px) {
        display: flex;
        flex-direction: column;
    }
`;

export const UserContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 33px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;

    > label {
        font-weight: 600;
        margin-right: 11px;
    }

    > p {
    }
`;

export const ActionsButtonsContainer = styled.div`
    display: flex;
    flex: 1;
    gap: 13px;
    flex-direction: row;
    margin-top: 13px;
`;

export const DeleteButton = styled(Button)`
    background-color: #f45;
    color: #fff;
`;

export const PaginationContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 9px;
`;
