import { FormikProvider, useFormik } from 'formik';
import Menu from '../../components/layout/menu';
import TextInput from '../../components/form/TextInput';
import Button, { ButtonVariant } from '../../components/button';
import { client } from '../../network/api';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import { User } from '../../interfaces/user';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export default function UsersForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (user: CreateUserEntry) => {
            const newUser = castToUser(user);
            await client.post('users', newUser);
        },
        onMutate: () => {
            queryClient.invalidateQueries({
                queryKey: ['users']
            });
            navigate('/users');
        }
    });

    const form = useFormik<CreateUserEntry>({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            mutation.mutate(values);
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
                            onClick={form.resetForm}
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
