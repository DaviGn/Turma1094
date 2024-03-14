import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Title = styled.h1`
    font-weight: 500;
    font-size: 1.5rem;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0px 29px;
`;

export const ButtonLink = styled(Link)`
    padding: 9px 11px;
    background-color: #ccc;
    text-decoration: none;
    border-radius: 9px;

    &:hover {
        background-color: #333;
        color: #fff;
    }
`;
