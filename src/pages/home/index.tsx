import Layout from '../../components/layout';
import { Title } from '../../components/layout/commons';
import { useAuth } from '../../hooks/auth';
import ProductsWidget from './products';
import UsersWidget from './users';

export default function Home() {
    const { user } = useAuth();

    return (
        <Layout>
            <Title>Olá, {user!.name}</Title>

            <ProductsWidget />
            <UsersWidget />
        </Layout>
    );
}
