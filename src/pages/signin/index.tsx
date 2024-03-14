import { FormikProvider, useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import Button, { ButtonVariant } from '../../components/button';
import TextInput from '../../components/form/TextInput';
import { useAuth } from '../../hooks/auth';

interface SignInFormEntry {
    email: string;
    password: string;
}

export default function SignIn() {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const form = useFormik<SignInFormEntry>({
        initialValues: {
            email: '',
            password: ''
        },
        // validationSchema,
        onSubmit: async (values, { setFieldError }) => {
            try {
                await signIn(values);
                navigate('/');
            } catch (ex) {
                alert(ex);
                setFieldError('password', 'Usuário inválido');
            }
        }
    });

    return (
        <>
            <h1>Faça login</h1>
            <div>
                <FormikProvider value={form}>
                    <TextInput
                        name="email"
                        label="E-mail"
                        placeholder="exemplo@exemplo.com"
                    />
                    <TextInput
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Digite a senha"
                    />
                    <div>
                        <Button
                            type="button"
                            variant={ButtonVariant.submit}
                            onClick={form.submitForm}
                        >
                            Entrar
                        </Button>
                    </div>
                </FormikProvider>
            </div>
        </>
    );
}
