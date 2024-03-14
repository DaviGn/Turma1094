import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { list as listUsers, remove } from '../../../network/api/users';
import { useState } from 'react';
import { PaginationData } from '../../../interfaces/pagination';
import Layout from '../../../components/layout';
import { ButtonLink, Header, Title } from '../../../components/layout/commons';

// componentDidMount - disparado quando o componente é exibido
// componentWillMount - quando ia ser exibido em tela
// componentDidUpdate - renderizado novamente (componentShouldUpdate)
// componentWillUnmount - o componete vai ser destruído

export default function Users() {
    const queryClient = useQueryClient();

    const [paginationData, setPaginationData] = useState<PaginationData>({
        page: 1,
        perPage: 5
    });

    const { data: users, isLoading } = useQuery({
        queryKey: ['users', paginationData],
        queryFn: () => listUsers(paginationData)
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (id: string) => {
            remove(id);
        },
        onMutate: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
        }
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
        <Layout>
            <Header>
                <Title>Usuários</Title>
                <ButtonLink to="/users/editor/new">Novo usuário</ButtonLink>
            </Header>
            <div>
                {isLoading ? (
                    <h3>Carregando...</h3>
                ) : (
                    <>
                        <div>
                            {users?.data?.map((usr) => (
                                <div
                                    key={usr.id}
                                    style={{
                                        marginBottom: '23px'
                                    }}
                                >
                                    <div>Id: {usr.id}</div>
                                    <div>Nome: {usr.name}</div>
                                    <div>E-mail: {usr.email}</div>
                                    <div>
                                        <Link to={`/users/editor/${usr.id}`}>
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => {
                                                mutateAsync(usr.id);
                                            }}
                                        >
                                            Apagar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
        </Layout>
    );
}
