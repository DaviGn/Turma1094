import Menu from '../../components/layout/menu';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { list as listUsers } from '../../network/api/users';
import { useState } from 'react';
import { PaginationData } from '../../interfaces/pagination';

// componentDidMount - disparado quando o componente é exibido
// componentWillMount - quando ia ser exibido em tela
// componentDidUpdate - renderizado novamente (componentShouldUpdate)
// componentWillUnmount - o componete vai ser destruído

export default function Users() {
    const [paginationData, setPaginationData] = useState<PaginationData>({
        page: 1,
        perPage: 5
    });

    const { data: users, isLoading } = useQuery({
        queryKey: ['users', paginationData],
        queryFn: () => listUsers(paginationData)
    });

    // useEffect(() => {
    //     console.log('componentDidMount');
    // }, []);

    // useEffect(() => {
    //     console.log('componentDidUpdate');

    //     // componentWillUnmount
    //     return () => {};
    // }, [counter]);

    // useEffect(() => {
    //     console.log('Sempre sou executado!');
    // });

    return (
        <>
            <Menu />
            <h1>Usuários</h1>
            <Link to="/users/editor">Novo usuário</Link>
            <div>
                {isLoading ? (
                    <h3>Carregando...</h3>
                ) : (
                    <>
                        <ul>
                            {users?.data?.map((usr) => (
                                <li key={usr.id}>
                                    Id: {usr.id} - Nome: {usr.name} - E-mail:{' '}
                                    {usr.email}
                                </li>
                            ))}
                        </ul>
                        <div>
                            {[...Array(users?.last).keys()].map((x) => {
                                const page = x + (users?.first ?? 1);

                                return (
                                    <button
                                        key={page}
                                        onClick={() => {
                                            setPaginationData((prev) => ({
                                                ...prev,
                                                page
                                            }));
                                        }}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
