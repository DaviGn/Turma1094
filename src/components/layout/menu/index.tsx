import { Link, useLocation } from 'react-router-dom';

import './styles.css';
import { useAuth } from '../../../hooks/auth';
import Button, { ButtonVariant } from '../../button';

export default function Menu() {
    const { signOut } = useAuth();
    const { pathname } = useLocation();

    return (
        <div>
            <Link to="/" className={pathname === '/' ? 'active' : ''}>
                Home
            </Link>
            <Link to="/users" className={pathname === '/users' ? 'active' : ''}>
                Usuários
            </Link>
            <Button
                text="Sair"
                variant={ButtonVariant.cancel}
                onClick={signOut}
            />
        </div>
    );
}
