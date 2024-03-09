import Menu from '../../components/layout/menu';
import { useAuth } from '../../hooks/auth';
import ProductsWidget from './products';
import UsersWidget from './users';

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Menu />
            <h1>Olá, {user!.name}</h1>

            <ProductsWidget />
            <UsersWidget />
        </>
    );
}
