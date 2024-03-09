// criar o contexto

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

interface UsersContextData {
    users: number;
    increment(): void;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

// definir o provider
export default function UsersProvider({
    children
}: {
    children: React.ReactNode;
}) {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    // memoize
    const providerData = useMemo(
        () => ({
            users: count,
            increment
        }),
        [count, increment]
    );

    return (
        <UsersContext.Provider value={providerData}>
            {children}
        </UsersContext.Provider>
    );
}

// criar o nosso hook
export function useUsers(): UsersContextData {
    const context = useContext(UsersContext);

    if (!context)
        throw new Error('useUsers must be used within an UsersProvider');

    return context;
}
