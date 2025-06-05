import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function AdminLogin() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Em um ambiente real, essas credenciais deveriam estar em um backend seguro
    const ADMIN_CREDENTIALS = {
        username: 'admin',
        password: 'admin123'
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (
            credentials.username === ADMIN_CREDENTIALS.username &&
            credentials.password === ADMIN_CREDENTIALS.password
        ) {
            // Em um ambiente real, isso seria um token JWT ou similar vindo do backend
            localStorage.setItem('admin_token', 'admin_authenticated');
            navigate('/admin');
        } else {
            setError('Usuário ou senha incorretos');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="admin-login-container">
            <div className="login-box">
                <h1>Login Administrativo</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuário:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
} 