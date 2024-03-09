// criar o contexto

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react';

interface ProductContextData {
    products: number;
    increment(): void;
}

const ProductContext = createContext<ProductContextData>(
    {} as ProductContextData
);

// definir o provider
export default function ProductProvider({
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
            products: count,
            increment
        }),
        [count, increment]
    );

    return (
        <ProductContext.Provider value={providerData}>
            {children}
        </ProductContext.Provider>
    );
}

// criar o nosso hook
export function useProducts(): ProductContextData {
    const context = useContext(ProductContext);

    if (!context)
        throw new Error('useProducts must be used within an ProductProvider');

    return context;
}
