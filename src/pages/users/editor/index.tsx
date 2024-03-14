import { FormikProvider, useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import TextInput from '../../../components/form/TextInput';
import Button, { ButtonVariant } from '../../../components/button';
import { create, findById, update } from '../../../network/api/users';
import Layout from '../../../components/layout';
import { Header, Title } from '../../../components/layout/commons';
import { ActionButtonsContainer } from './styles';
import { CreateUserEntry, castToUser, validationSchema } from './helpers';

const createUserId = 'new';

export default function UsersForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const isEditing = id !== createUserId;

    const { data: userData } = useQuery({
        queryKey: ['users', 'item', id],
        queryFn: () => findById(id!),
        enabled: id !== createUserId
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (user: CreateUserEntry) => {
            const userDto = castToUser(user);

            if (!isEditing) {
                await create(userDto);
            } else {
                await update(id!, userDto);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            navigate('/users');
        },
        onError: () => {
            alert('Ocorreu um erro');
        }
    });

    const form = useFormik<CreateUserEntry>({
        initialValues: userData ?? {
            name: '',
            email: '',
            password: ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            mutateAsync(values);
        }
    });

    return (
        <Layout>
            <Header>
                <Title>Novo usuário</Title>
            </Header>
            <div>
                <FormikProvider value={form}>
                    <TextInput
                        name="name"
                        label="Nome"
                        placeholder="Digite o nome"
                    />
                    <TextInput
                        name="email"
                        label="E-mail"
                        placeholder="exemplo@exemplo.com"
                    />
                    <TextInput
                        type="password"
                        name="password"
                        label="Senha"
                        placeholder="Digite uma senha"
                    />
                    <ActionButtonsContainer>
                        <Button
                            type="button"
                            onClick={() => {
                                navigate('/users');
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            variant={ButtonVariant.submit}
                            onClick={form.submitForm}
                        >
                            Salvar
                        </Button>
                    </ActionButtonsContainer>
                </FormikProvider>
            </div>
        </Layout>
    );
}
