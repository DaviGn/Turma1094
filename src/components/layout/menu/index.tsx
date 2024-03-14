import { useLocation } from 'react-router-dom';

import { useAuth } from '../../../hooks/auth';
import {
    Container,
    LogoutButton,
    MenuItem,
    MenuItemsContainer
} from './styles';

export default function Menu() {
    const { signOut } = useAuth();
    const { pathname } = useLocation();

    return (
        <Container>
            <MenuItemsContainer>
                <MenuItem to="/" active={pathname === '/'}>
                    Home
                </MenuItem>
                <MenuItem to="/users" active={pathname === '/users'}>
                    Usuários
                </MenuItem>
            </MenuItemsContainer>
            <LogoutButton text="Sair" onClick={signOut} />
        </Container>
    );
}
