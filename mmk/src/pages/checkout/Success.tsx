import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Success.css';

export function CheckoutSuccess() {
    const navigate = useNavigate();

    return (
        <div className="success-container">
            <div className="success-content">
                <div className="success-icon">✓</div>
                <h1>Aluguel Confirmado!</h1>
                <p>Seu aluguel foi realizado com sucesso.</p>
                <p>Em breve você receberá um email com mais informações.</p>

                <div className="success-actions">
                    <button
                        className="btn-home"
                        onClick={() => navigate('/')}
                    >
                        Voltar para Home
                    </button>
                </div>
            </div>
        </div>
    );
} 