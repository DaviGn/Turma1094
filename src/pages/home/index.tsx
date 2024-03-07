import Menu from '../../components/layout/menu';
import { useAuth } from '../../hooks/auth';

export default function Home() {
    const { user } = useAuth();

    return (
        <>
            <Menu />
            <h1>Olá, {user.name}</h1>
        </>
    );
}
