import { FormikProvider, useFormik } from 'formik';
import Menu from '../../../components/layout/menu';
import TextInput from '../../../components/form/TextInput';
import Button, { ButtonVariant } from '../../../components/button';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { User } from '../../../interfaces/user';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { create, findById, update } from '../../../network/api/users';

interface CreateUserEntry {
    name: string;
    email: string;
    password: string;
}

const requiredField = 'Campo obrigatório';

const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredField),
    email: Yup.string().required(requiredField).email('E-mail inválido')
});

function castToUser({ name, email, password }: CreateUserEntry): User {
    return {
        id: uuid(),
        name,
        email,
        password
    };
}

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
        <>
            <Menu />
            <h1>Novo usuário</h1>
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
                    <div>
                        <Button
                            type="button"
                            variant={ButtonVariant.cancel}
                            text="Cancelar"
                            onClick={() => {
                                navigate('/users');
                            }}
                        />
                        <Button
                            type="button"
                            variant={ButtonVariant.submit}
                            text="Salvar"
                            onClick={form.submitForm}
                        />
                    </div>
                </FormikProvider>
            </div>
        </>
    );
}
