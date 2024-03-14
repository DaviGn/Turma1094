import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../button';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 19px 0px;
`;

export const MenuItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

interface MenuItemProps {
    active: boolean;
}

export const MenuItem = styled(Link)<MenuItemProps>`
    padding: 0px 13px;
    text-decoration: none;
    color: ${(props) => (props.active ? '#32cd32' : 'blue')};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const LogoutButton = styled(Button)`
    background-color: #f45;
    margin-right: 13px;
`;
