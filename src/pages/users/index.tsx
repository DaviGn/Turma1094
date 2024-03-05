import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import Menu from '../../components/layout/menu';
import Button, { ButtonVariant } from '../../components/button';
import TextInput from '../../components/form/TextInput';
import { FormikProvider, useFormik } from 'formik';
import { User } from '../../interfaces/user';
import { client } from '../../network/api';

interface CreateUserEntry {
    name: string;
    email: string;
}

const requiredField = 'Campo obrigatório';

const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredField),
    email: Yup.string().required(requiredField).email('E-mail inválido')
});

function castToUser({ name, email }: CreateUserEntry): User {
    return {
        id: uuid(),
        name,
        email
    };
}

// componentDidMount - disparado quando o componente é exibido
// componentWillMount - quando ia ser exibido em tela
// componentDidUpdate - renderizado novamente (componentShouldUpdate)
// componentWillUnmount - o componete vai ser destruído

export default function Users() {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);

    async function loadUsers() {
        setIsLoading(true);
        await new Promise((res) => setTimeout(res, 3000));
        const { data } = await client.get<User[]>('users');
        setUsers(data);
        setIsLoading(false);
    }

    const form = useFormik<CreateUserEntry>({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            const newUser = castToUser(values);

            await client.post('users', newUser);
            resetForm();

            loadUsers();
        }
    });

    useEffect(() => {
        loadUsers();
    }, []);

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
            <h1>Users</h1>
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
            <div>
                {isLoading ? (
                    <h3>Carregando...</h3>
                ) : (
                    <ul>
                        {users.map((usr) => (
                            <li key={usr.id}>
                                Id: {usr.id} - Nome: {usr.name} - E-mail:{' '}
                                {usr.email}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}
