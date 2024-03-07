import AuthProvider from './auth';

export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}
