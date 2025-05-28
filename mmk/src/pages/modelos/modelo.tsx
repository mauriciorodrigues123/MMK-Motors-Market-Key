
import { useState } from "react"
import "./modelo.css"

interface Carro {
    id: number;
    nome: string;
    tipo: string;
    precoTotal: number;
    imagem: string;
    especificacoes: {
        cambio: string;
        lugares: string;
        motor: string;
    };
}

export function Modelo() {
    const [modalAberto, setModalAberto] = useState(false);
    const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);

    const carros: Carro[] = [
        {
            id: 1,
            nome: "MMK 208 1.6 AT (2025) ",
            tipo: "SUV Compacto",
            precoTotal: 1100.00,
            imagem: "src/imagem/Imagem do WhatsApp de 2025-05-28 à(s) 10.18.38_9f471d80.jpg",
            especificacoes: {
                cambio: "Automático",
                lugares: "5 pessoas",
                motor: "Motor: 1.6L 16V Flex"
            },
        },
        {
            id: 2,
            nome: "MMK Ferrari 360",
            tipo: "moderno",
            precoTotal: 1500.00,
            imagem: "src/imagem/imagens-carros/Imagem do WhatsApp de 2025-05-28 à(s) 10.18.39_f8485ae8.jpg",
            especificacoes: {
                cambio: "Manual",
                lugares: "5 pessoas",
                motor: "Motor: 2.0L 16V Flex"
            },
        },
        // Adicione os outros 8 carros aqui com a mesma estrutura
    ];

    const abrirModal = (carro: Carro) => {
        setCarroSelecionado(carro);
        setModalAberto(true);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setCarroSelecionado(null);
    };

    return (
        <div>

            <div className="pagina-modelos">


                <div className="container-modelos">
                    <h1 className="titulo">Selecione um Veículo</h1>

                    <div className="lista-carros">
                        {carros.map((carro) => (
                            <div key={carro.id} className="cartao-carro">
                                <div className="carro-flex">
                                    <img src={carro.imagem} alt={carro.nome} className="imagem-carro" />
                                    <div className="info-carro">
                                        <div className="info-principal">
                                            <h2 className="nome-carro">{carro.nome}</h2>
                                            <p className="tipo-carro">{carro.tipo}</p>
                                        </div>
                                    </div>

                                    <div className="preco-selecionar">
                                        <div className="precos">
                                            <div className="preco-total">
                                                <span>R$ {carro.precoTotal}</span>
                                                <span className="texto-total">Total</span>
                                            </div>
                                        </div>
                                        <button
                                            className="botao-selecionar"
                                            onClick={() => abrirModal(carro)}
                                        >
                                            Selecionar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {modalAberto && carroSelecionado && (
                    <div className="modal-overlay">
                        <div className="modal-conteudo">
                            <button className="botao-fechar" onClick={fecharModal}>×</button>

                            <div className="modal-header">
                                <img src={carroSelecionado.imagem} alt={carroSelecionado.nome} />
                                <h2>{carroSelecionado.nome}</h2>
                            </div>

                            <div className="modal-body">
                                <h3>Especificações</h3>
                                <ul className="lista-especificacoes">
                                    <li>Câmbio: {carroSelecionado.especificacoes.cambio}</li>
                                    <li>Capacidade: {carroSelecionado.especificacoes.lugares}</li>
                                    <li>Motor: {carroSelecionado.especificacoes.motor}</li>
                                </ul>

                                <div className="preco-modal">
                                    <p>Preço total: R$ {carroSelecionado.precoTotal}</p>
                                </div>

                                <button className="botao-comprar">
                                    Comprar Agora
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}