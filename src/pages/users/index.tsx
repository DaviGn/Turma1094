import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

import Menu from '../../components/layout/menu';
import Button from '../../components/button';
import TextInput from '../../components/form/TextInput';
import { FormikProvider, useFormik } from 'formik';
import { User } from '../../interfaces/user';

import axios from 'axios';

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
    const [users, setUsers] = useState<User[]>([]);

    const [counter, setCounter] = useState(0);

    async function loadUsers() {
        const { data } = await axios.get<User[]>('http://localhost:3000/users');
        setUsers(data);
    }

    const form = useFormik<CreateUserEntry>({
        initialValues: {
            name: '',
            email: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const newUser = castToUser(values);
            setUsers((prev) => [...prev, newUser]);

            resetForm();
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

            <div>
                <h2>{counter}</h2>
                <Button
                    type="button"
                    text="Incrementar"
                    onClick={() => {
                        setCounter((prev) => prev + 1);
                    }}
                />
            </div>

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
                            text="Cancelar"
                            onClick={form.resetForm}
                        />
                        <Button
                            type="button"
                            text="Salvar"
                            onClick={form.submitForm}
                        />
                    </div>
                </FormikProvider>
            </div>
            <div>
                <ul>
                    {users.map((usr) => (
                        <li key={usr.id}>
                            Id: {usr.id} - Nome: {usr.name} - E-mail:{' '}
                            {usr.email}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
