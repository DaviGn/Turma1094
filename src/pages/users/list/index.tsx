import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { list as listUsers, remove } from '../../../network/api/users';
import { PaginationData } from '../../../interfaces/pagination';
import Layout from '../../../components/layout';
import { ButtonLink, Header, Title } from '../../../components/layout/commons';
import {
    ActionsButtonsContainer,
    Container,
    DeleteButton,
    InfoContainer,
    ListContainer,
    PaginationContainer,
    UserContainer
} from './styles';
import Button from '../../../components/button';

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
            <Container>
                {isLoading ? (
                    <h3>Carregando...</h3>
                ) : (
                    <>
                        <ListContainer>
                            {users?.data?.map((usr) => (
                                <UserContainer key={usr.id}>
                                    <InfoContainer>
                                        <label>Id:</label>
                                        <p>{usr.id}</p>
                                    </InfoContainer>
                                    <InfoContainer>
                                        <label>Nome:</label>
                                        <p>{usr.name}</p>
                                    </InfoContainer>
                                    <InfoContainer>
                                        <label>E-mail:</label>
                                        <p>{usr.email}</p>
                                    </InfoContainer>
                                    <ActionsButtonsContainer>
                                        <ButtonLink
                                            to={`/users/editor/${usr.id}`}
                                        >
                                            Editar
                                        </ButtonLink>
                                        <DeleteButton
                                            onClick={() => {
                                                mutateAsync(usr.id);
                                            }}
                                        >
                                            Apagar
                                        </DeleteButton>
                                    </ActionsButtonsContainer>
                                </UserContainer>
                            ))}
                        </ListContainer>
                        <PaginationContainer>
                            {[...Array(users?.last).keys()].map((x) => {
                                const page = x + (users?.first ?? 1);

                                return (
                                    <Button
                                        key={page}
                                        onClick={() => {
                                            setPaginationData((prev) => ({
                                                ...prev,
                                                page
                                            }));
                                        }}
                                    >
                                        {page}
                                    </Button>
                                );
                            })}
                        </PaginationContainer>
                    </>
                )}
            </Container>
        </Layout>
    );
}
