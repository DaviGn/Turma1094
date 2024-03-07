// criar o contexto

import { createContext, useContext, useMemo, useState } from 'react';
import { User } from '../interfaces/user';
import { client } from '../network/api';

interface AuthCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User | null;
    signIn(credentials: AuthCredentials): void;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// definir o provider
export default function AuthProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            return null;
        }

        const userJSON = JSON.parse(user);
        return userJSON;
    });

    async function signIn({ email, password }: AuthCredentials) {
        // isto deveria ocorrer no backend
        // enviando um POST /signin
        // body: { email, password }
        const { data } = await client.get<User[]>(`users?email=${email}`);

        if (data.length == 0 || data[0].password !== password) {
            throw new Error('Invalid credentials!');
        }

        localStorage.setItem('user', JSON.stringify(data[0]));
        setUser(data[0]);
    }

    function signOut() {
        localStorage.removeItem('user');
        setUser(null);
    }

    // memoize
    const providerData = useMemo(
        () => ({
            user,
            signIn,
            signOut
        }),
        [user]
    );

    return (
        <AuthContext.Provider value={providerData}>
            {children}
        </AuthContext.Provider>
    );
}

// criar o nosso hook
export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error('useAuth must be used within an AuthProvider');

    return context;
}
