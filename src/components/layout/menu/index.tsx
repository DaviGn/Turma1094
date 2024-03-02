import { Link, useLocation } from 'react-router-dom';

import './styles.css';

export default function Menu() {
    const { pathname } = useLocation();

    return (
        <div>
            <Link to="/" className={pathname === '/' ? 'active' : ''}>
                Home
            </Link>
            <Link to="/users" className={pathname === '/users' ? 'active' : ''}>
                Usuários
            </Link>
        </div>
    );
}
