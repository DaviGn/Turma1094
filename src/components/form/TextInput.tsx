import { useField } from 'formik';
import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
}

export default function TextInput({ label, ...props }: TextInputProps) {
    const { name } = props;
    const [field, meta] = useField({ name });

    const error = meta.touched && meta.error;

    return (
        <div
            style={{
                padding: '13px 0px'
            }}
        >
            <label
                style={{
                    marginRight: '13px'
                }}
            >
                {label}
            </label>
            <input type="text" {...field} {...props} />
            <span
                style={{
                    color: '#f45'
                }}
            >
                {error}
            </span>
        </div>
    );
}
