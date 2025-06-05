import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const API_URL = 'http://localhost:3001';

interface AluguelPendente {
    carro: any;
    config: {
        meses: number;
        kmPorMes: number;
        precoMensal: number;
        kmExtra: number;
    };
    total: number;
    kmTotal: number;
}

interface UserData {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
}

export function Checkout() {
    const [aluguel, setAluguel] = useState<AluguelPendente | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar se usuário está logado
        const userToken = localStorage.getItem('user_token');
        if (!userToken) {
            navigate('/login?redirect=checkout');
            return;
        }

        // Carregar dados do usuário
        const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
        setUserData(userData);

        // Carregar dados do aluguel
        const aluguelData = localStorage.getItem('aluguel_pendente');
        if (!aluguelData) {
            navigate('/carros');
            return;
        }

        setAluguel(JSON.parse(aluguelData));
    }, [navigate]);

    const handleConfirmar = async () => {
        if (!aluguel || !userData) return;

        setLoading(true);
        setError('');

        try {
            // Criar registro do aluguel na API
            const novoAluguel = {
                idUsuario: userData.id,
                idCarro: aluguel.carro.id,
                dataInicio: new Date().toISOString(),
                meses: aluguel.config.meses,
                quilometrosPorMes: aluguel.config.kmPorMes,
                precoMensal: aluguel.config.precoMensal,
                precoQuilometroExtra: aluguel.config.kmExtra,
                total: aluguel.total,
                quilometragemTotal: aluguel.kmTotal,
                status: 'ativo'
            };

            console.log('Salvando aluguel:', novoAluguel);

            const response = await fetch(`${API_URL}/alugueis`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoAluguel)
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar aluguel');
            }

            // Limpar aluguel pendente
            localStorage.removeItem('aluguel_pendente');

            // Redirecionar para página de sucesso
            navigate('/checkout/sucesso');
        } catch (err) {
            console.error('Erro ao confirmar aluguel:', err);
            setError('Erro ao confirmar o aluguel. Tente novamente.');

            // Fallback para localStorage se a API falhar
            const alugueis = JSON.parse(localStorage.getItem('alugueis') || '[]');
            const novoAluguel = {
                id: Date.now(),
                usuario: userData,
                carro: aluguel.carro,
                config: aluguel.config,
                total: aluguel.total,
                kmTotal: aluguel.kmTotal,
                dataInicio: new Date().toISOString(),
                status: 'ativo'
            };
            localStorage.setItem('alugueis', JSON.stringify([...alugueis, novoAluguel]));
            navigate('/checkout/sucesso');
        } finally {
            setLoading(false);
        }
    };

    if (!aluguel || !userData) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div className="checkout-container">
            <div className="checkout-content">
                <h1>Confirmação do Aluguel</h1>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                <div className="checkout-section">
                    <h2>Dados do Cliente</h2>
                    <div className="info-group">
                        <p><strong>Nome:</strong> {userData.nome}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>CPF:</strong> {userData.cpf}</p>
                        <p><strong>Telefone:</strong> {userData.telefone}</p>
                    </div>
                </div>

                <div className="checkout-section">
                    <h2>Dados do Veículo</h2>
                    <div className="info-group">
                        <p><strong>Modelo:</strong> {aluguel.carro.nome}</p>
                        <p><strong>Período:</strong> {aluguel.config.meses} {aluguel.config.meses === 1 ? 'mês' : 'meses'}</p>
                        <p><strong>Quilometragem Mensal:</strong> {aluguel.config.kmPorMes.toLocaleString()} km/mês</p>
                        <p><strong>Quilometragem Total:</strong> {aluguel.kmTotal.toLocaleString()} km</p>
                    </div>
                </div>

                <div className="checkout-section">
                    <h2>Resumo do Pagamento</h2>
                    <div className="info-group payment-summary">
                        <p><strong>Valor Mensal:</strong> R$ {aluguel.config.precoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p><strong>Valor Total:</strong> R$ {aluguel.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        <p className="km-extra-info">
                            * Quilômetros excedentes serão cobrados a R$ {aluguel.config.kmExtra.toFixed(2)}/km
                        </p>
                    </div>
                </div>

                <div className="checkout-actions">
                    <button
                        className="btn-voltar"
                        onClick={() => navigate('/carros')}
                        disabled={loading}
                    >
                        Voltar
                    </button>
                    <button
                        className="btn-confirmar"
                        onClick={handleConfirmar}
                        disabled={loading}
                    >
                        {loading ? 'Processando...' : 'Confirmar Aluguel'}
                    </button>
                </div>
            </div>
        </div>
    );
} 