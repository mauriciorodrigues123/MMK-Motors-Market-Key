import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './UserAuth.css';

interface UserData {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    senha: string;
}

const API_URL = 'http://localhost:3001';

const ADMIN_CREDENTIALS = {
    email: 'admin@mmk.com',
    senha: 'admin123'
};

export function UserAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState<UserData>({
        nome: '',
        email: '',
        cpf: '',
        telefone: '',
        senha: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [usingLocalStorage, setUsingLocalStorage] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get('redirect') || '/';

    // Verificar se a API está disponível
    useEffect(() => {
        checkApiAvailability();
    }, []);

    const checkApiAvailability = async () => {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            if (!response.ok) {
                setUsingLocalStorage(true);
            }
        } catch (error) {
            console.log('API não disponível, usando localStorage');
            setUsingLocalStorage(true);
        }
    };

    // Funções auxiliares para localStorage
    const getLocalUsers = () => {
        return JSON.parse(localStorage.getItem('users') || '[]');
    };

    const saveLocalUser = (user: UserData) => {
        const users = getLocalUsers();
        const newUser = { ...user, id: Date.now() };
        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        return newUser;
    };

    // Verificar se tem aluguel pendente ao montar o componente
    useEffect(() => {
        const aluguelPendente = localStorage.getItem('aluguel_pendente');
        if (!aluguelPendente) {
            // Se não tem aluguel pendente e está tentando acessar checkout, redireciona para carros
            if (redirectTo === 'checkout') {
                navigate('/carros');
            }
        }
    }, [redirectTo, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Verificar se é login de admin
            if (userData.email === ADMIN_CREDENTIALS.email && userData.senha === ADMIN_CREDENTIALS.senha) {
                console.log('Admin login successful');
                localStorage.setItem('admin_token', 'true');
                navigate('/admin');
                return;
            }

            // Processo de login normal para usuários
            if (isLogin) {
                // Processo de login
                if (usingLocalStorage) {
                    // Usando localStorage
                    const users = getLocalUsers();
                    const user = users.find((u: UserData) =>
                        u.email === userData.email && u.senha === userData.senha
                    );

                    if (user) {
                        localStorage.setItem('user_token', JSON.stringify({ email: user.email }));
                        localStorage.setItem('user_data', JSON.stringify(user));
                        handleSuccessfulAuth();
                    } else {
                        setError('Email ou senha incorretos');
                    }
                } else {
                    // Usando API
                    const response = await fetch(`${API_URL}/usuarios?email=${userData.email}`);
                    if (!response.ok) {
                        throw new Error('Erro ao buscar usuário');
                    }
                    const users = await response.json();
                    const user = users.find((u: UserData) => u.senha === userData.senha);

                    if (user) {
                        localStorage.setItem('user_token', JSON.stringify({ email: user.email }));
                        localStorage.setItem('user_data', JSON.stringify(user));
                        handleSuccessfulAuth();
                    } else {
                        setError('Email ou senha incorretos');
                    }
                }
            } else {
                // Processo de cadastro
                if (usingLocalStorage) {
                    // Usando localStorage
                    const users = getLocalUsers();
                    if (users.some((u: UserData) => u.email === userData.email)) {
                        setError('Este email já está cadastrado');
                        return;
                    }

                    const newUser = saveLocalUser(userData);
                    localStorage.setItem('user_token', JSON.stringify({ email: newUser.email }));
                    localStorage.setItem('user_data', JSON.stringify(newUser));
                    handleSuccessfulAuth();
                } else {
                    // Usando API
                    try {
                        // Verificar se email já existe
                        const emailCheck = await fetch(`${API_URL}/usuarios?email=${userData.email}`);
                        if (!emailCheck.ok) {
                            throw new Error('Erro ao verificar email');
                        }
                        const existingUsers = await emailCheck.json();

                        if (existingUsers.length > 0) {
                            setError('Este email já está cadastrado');
                            return;
                        }

                        // Validações
                        if (!/^\d{11}$/.test(userData.cpf.replace(/\D/g, ''))) {
                            setError('CPF inválido');
                            return;
                        }

                        if (!/^\d{10,11}$/.test(userData.telefone.replace(/\D/g, ''))) {
                            setError('Telefone inválido');
                            return;
                        }

                        // Cadastrar novo usuário
                        console.log('Enviando dados para API:', userData);
                        const response = await fetch(`${API_URL}/usuarios`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nome: userData.nome,
                                email: userData.email,
                                cpf: userData.cpf,
                                telefone: userData.telefone,
                                senha: userData.senha
                            })
                        });

                        if (!response.ok) {
                            throw new Error('Erro ao cadastrar usuário');
                        }

                        const newUser = await response.json();
                        console.log('Usuário cadastrado:', newUser);

                        localStorage.setItem('user_token', JSON.stringify({ email: newUser.email }));
                        localStorage.setItem('user_data', JSON.stringify(newUser));
                        handleSuccessfulAuth();
                    } catch (error) {
                        console.error('Erro na API:', error);
                        setError('Erro ao cadastrar usuário. Tente novamente.');
                        setUsingLocalStorage(true);
                    }
                }
            }
        } catch (err) {
            console.error('Erro:', err);
            setError('Ocorreu um erro ao processar sua solicitação');
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessfulAuth = () => {
        const aluguelPendente = localStorage.getItem('aluguel_pendente');
        if (aluguelPendente && redirectTo === 'checkout') {
            navigate('/checkout');
        } else {
            navigate('/');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const formatCPF = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
    };

    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/g, '($1) $2-$3');
    };

    return (
        <div className="user-auth-container">
            <div className="auth-box">
                <h1>{isLogin ? 'Login' : 'Cadastro'}</h1>

                {error && <div className="error-message">{error}</div>}

                {usingLocalStorage && (
                    <div className="warning-message">
                        Servidor não disponível. Usando armazenamento local.
                    </div>
                )}

                {redirectTo === 'checkout' && (
                    <div className="info-message">
                        {isLogin
                            ? 'Faça login para continuar com o aluguel do veículo'
                            : 'Cadastre-se para continuar com o aluguel do veículo'}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="nome">Nome Completo:</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={userData.nome}
                                onChange={handleChange}
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {!isLogin && (
                        <>
                            <div className="form-group">
                                <label htmlFor="cpf">CPF:</label>
                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    value={formatCPF(userData.cpf)}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    maxLength={14}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefone">Telefone:</label>
                                <input
                                    type="text"
                                    id="telefone"
                                    name="telefone"
                                    value={formatPhone(userData.telefone)}
                                    onChange={handleChange}
                                    required={!isLogin}
                                    maxLength={15}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={userData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? 'Processando...'
                            : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </button>
                </form>

                <button
                    className="toggle-auth-mode"
                    onClick={() => setIsLogin(!isLogin)}
                    disabled={loading}
                >
                    {isLogin
                        ? 'Não tem uma conta? Cadastre-se'
                        : 'Já tem uma conta? Faça login'}
                </button>
            </div>
        </div>
    );
} 