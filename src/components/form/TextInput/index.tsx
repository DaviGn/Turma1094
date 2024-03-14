import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';
import { Container, ErrorMessage } from './styles';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
    const { name } = props;
    const [field, meta] = useField({ name });

    const error = meta.touched && meta.error;

    return (
        <Container>
            <div>
                <label>{label}</label>
                <input type="text" {...field} {...props} />
            </div>
            <ErrorMessage>{error}</ErrorMessage>
        </Container>
    );
}
