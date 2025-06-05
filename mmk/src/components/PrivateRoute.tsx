import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    // Verificar se o usuário está autenticado
    const isAuthenticated = localStorage.getItem('admin_token') !== null;

    // Se não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    // Se estiver autenticado, renderiza o componente filho
    return <>{children}</>;
} 