import AuthProvider from './auth';
// import ProductProvider from './products';
// import UsersProvider from './users';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        // <ProductProvider>
        //     <UsersProvider>
        <AuthProvider>{children}</AuthProvider>
        //     </UsersProvider>
        // </ProductProvider>
    );
}
