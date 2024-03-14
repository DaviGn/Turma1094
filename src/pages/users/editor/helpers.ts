import { User } from '../../../interfaces/user';
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

export interface CreateUserEntry {
    name: string;
    email: string;
    password: string;
}

export const requiredField = 'Campo obrigatório';

export const validationSchema = Yup.object().shape({
    name: Yup.string().required(requiredField),
    email: Yup.string().required(requiredField).email('E-mail inválido')
});

export function castToUser({ name, email, password }: CreateUserEntry): User {
    return {
        id: uuid(),
        name,
        email,
        password
    };
}
