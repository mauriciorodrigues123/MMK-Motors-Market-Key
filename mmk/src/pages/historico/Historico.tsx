import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../componentes/header/header';
import { Footer } from '../../componentes/footer/footer';
import './historico.css';

const API_URL = 'http://localhost:3001';

interface Aluguel {
    id: number;
    idUsuario: number;
    idCarro: number;
    dataInicio: string;
    meses: number;
    quilometrosPorMes: number;
    precoMensal: number;
    precoQuilometroExtra: number;
    total: number;
    quilometragemTotal: number;
    status: string;
    carro?: any;
}

export function Historico() {
    const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        carregarHistorico();
    }, []);

    const carregarHistorico = async () => {
        try {
            // Verificar se usuário está logado
            const userData = localStorage.getItem('user_data');
            if (!userData) {
                navigate('/login');
                return;
            }

            const user = JSON.parse(userData);

            // Buscar aluguéis do usuário
            const response = await fetch(`${API_URL}/alugueis?idUsuario=${user.id}`);
            if (!response.ok) {
                throw new Error('Erro ao carregar histórico');
            }

            const alugueisData = await response.json();

            // Para cada aluguel, buscar informações do carro
            const alugueisComCarros = await Promise.all(
                alugueisData.map(async (aluguel: Aluguel) => {
                    const carroResponse = await fetch(`${API_URL}/carros/${aluguel.idCarro}`);
                    const carro = await carroResponse.json();
                    return { ...aluguel, carro };
                })
            );

            setAlugueis(alugueisComCarros);
        } catch (err) {
            console.error('Erro:', err);
            setError('Erro ao carregar histórico de aluguéis');
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    return (
        <div className="historico-page">
            <Header />
            <div className="historico-container">
                <h1>Meus Aluguéis</h1>
                <div className="alugueis-lista">
                    {/* Exemplo de card de aluguel */}
                    <div className="aluguel-card">
                        <div className="aluguel-header">
                            <h2>BMW M3 Competition</h2>
                            <span className="status ativo">Ativo</span>
                        </div>
                        <div className="aluguel-info">
                            <div className="info-grupo">
                                <span className="info-label">Data de Retirada:</span>
                                <span className="info-valor">15/05/2024</span>
                            </div>
                            <div className="info-grupo">
                                <span className="info-label">Data de Devolução:</span>
                                <span className="info-valor">20/05/2024</span>
                            </div>
                            <div className="info-grupo">
                                <span className="info-label">Valor Total:</span>
                                <span className="info-valor">R$ 5.000,00</span>
                            </div>
                        </div>
                        <div className="aluguel-acoes">
                            <button className="btn-detalhes">Ver Detalhes</button>
                            <button className="btn-cancelar">Cancelar Reserva</button>
                        </div>
                    </div>

                    {/* Exemplo de aluguel concluído */}
                    <div className="aluguel-card">
                        <div className="aluguel-header">
                            <h2>Mercedes-AMG GT</h2>
                            <span className="status concluido">Concluído</span>
                        </div>
                        <div className="aluguel-info">
                            <div className="info-grupo">
                                <span className="info-label">Data de Retirada:</span>
                                <span className="info-valor">01/05/2024</span>
                            </div>
                            <div className="info-grupo">
                                <span className="info-label">Data de Devolução:</span>
                                <span className="info-valor">05/05/2024</span>
                            </div>
                            <div className="info-grupo">
                                <span className="info-label">Valor Total:</span>
                                <span className="info-valor">R$ 4.500,00</span>
                            </div>
                        </div>
                        <div className="aluguel-acoes">
                            <button className="btn-detalhes">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
} 