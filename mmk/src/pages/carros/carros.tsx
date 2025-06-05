import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./carros.css"
import { Header } from "../../componentes/header/header";
import { Footer } from "../../componentes/footer/footer";

interface CarroAdmin {
    id: string;
    nome: string;
    preco: string;
    ano: string;
    km: string;
    imagem: string;
    descricao: string;
}

interface CarroLegado {
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

type Carro = CarroAdmin | CarroLegado;

interface AluguelConfig {
    meses: number;
    kmPorMes: number;
    precoMensal: number;
    kmExtra: number;
}

export function Carros() {
    const [modalAberto, setModalAberto] = useState(false);
    const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);
    const [carros, setCarros] = useState<Carro[]>([]);
    const [etapaAluguel, setEtapaAluguel] = useState(1);
    const [configAluguel, setConfigAluguel] = useState<AluguelConfig>({
        meses: 1,
        kmPorMes: 2000,
        precoMensal: 0,
        kmExtra: 1.50 // Preço por km extra
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar autenticação
        const userToken = localStorage.getItem('user_token');
        setIsAuthenticated(!!userToken);

        // Carregar carros do localStorage
        const carrosAdmin = JSON.parse(localStorage.getItem('cars') || '[]');

        // Carros legados (existentes)
        const carrosLegados: CarroLegado[] = [
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
        ];

        // Combinar carros do localStorage com os carros legados
        setCarros([...carrosAdmin, ...carrosLegados]);
    }, []);

    const abrirModal = (carro: Carro) => {
        setCarroSelecionado(carro);
        setModalAberto(true);
        setEtapaAluguel(1);
        // Definir preço mensal baseado no tipo do carro
        setConfigAluguel(prev => ({
            ...prev,
            precoMensal: isCarroAdmin(carro)
                ? parseFloat(carro.preco)
                : carro.precoTotal
        }));
    };

    const fecharModal = () => {
        setModalAberto(false);
        setCarroSelecionado(null);
        setEtapaAluguel(1);
    };

    const isCarroAdmin = (carro: Carro): carro is CarroAdmin => {
        return typeof (carro as CarroAdmin).preco !== 'undefined';
    };

    const handleMesesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const meses = parseInt(e.target.value);
        setConfigAluguel(prev => ({
            ...prev,
            meses
        }));
    };

    const handleKmPorMesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const kmPorMes = parseInt(e.target.value);
        setConfigAluguel(prev => ({
            ...prev,
            kmPorMes
        }));
    };

    const calcularTotal = () => {
        const { meses, kmPorMes, precoMensal } = configAluguel;
        return precoMensal * meses;
    };

    const calcularKmTotal = () => {
        return configAluguel.kmPorMes * configAluguel.meses;
    };

    const prosseguirParaLogin = () => {
        // Salvar dados do aluguel no localStorage
        localStorage.setItem('aluguel_pendente', JSON.stringify({
            carro: carroSelecionado,
            config: configAluguel,
            total: calcularTotal(),
            kmTotal: calcularKmTotal()
        }));

        // Verificar se usuário está logado
        const userToken = localStorage.getItem('user_token');
        if (userToken) {
            navigate('/checkout');
        } else {
            navigate('/login?redirect=checkout');
        }
    };

    return (
        <div className="pagina-modelos">
            <Header />

            <div className="container-principal">
                <div className="container-modelos">
                    <h1 className="titulo">Selecione um Veículo</h1>

                    <div className="lista-carros">
                        {carros.map((carro) => (
                            <div key={isCarroAdmin(carro) ? carro.id : `legacy-${carro.id}`} className="cartao-carro">
                                <div className="carro-flex">
                                    <img src={carro.imagem} alt={carro.nome} className="imagem-carro" />
                                    <div className="info-carro">
                                        <div className="info-principal">
                                            <h2 className="nome-carro">{carro.nome}</h2>
                                            <p className="tipo-carro">
                                                {isCarroAdmin(carro) ? `${carro.ano} - ${carro.km} km` : carro.tipo}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="preco-selecionar">
                                        <div className="precos">
                                            <div className="preco-total">
                                                <span>
                                                    {isCarroAdmin(carro)
                                                        ? `R$ ${carro.preco}/mês`
                                                        : `R$ ${carro.precoTotal}/mês`}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className="botao-selecionar"
                                            onClick={() => abrirModal(carro)}
                                        >
                                            Alugar
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
                                {etapaAluguel === 1 ? (
                                    <>
                                        <h3>Especificações</h3>
                                        {isCarroAdmin(carroSelecionado) ? (
                                            <div className="especificacoes-admin">
                                                <p><strong>Ano:</strong> {carroSelecionado.ano}</p>
                                                <p><strong>Quilometragem:</strong> {carroSelecionado.km} km</p>
                                                <p><strong>Descrição:</strong> {carroSelecionado.descricao}</p>
                                            </div>
                                        ) : (
                                            <ul className="lista-especificacoes">
                                                <li>Câmbio: {carroSelecionado.especificacoes.cambio}</li>
                                                <li>Capacidade: {carroSelecionado.especificacoes.lugares}</li>
                                                <li>Motor: {carroSelecionado.especificacoes.motor}</li>
                                            </ul>
                                        )}
                                        <button
                                            className="botao-continuar"
                                            onClick={() => setEtapaAluguel(2)}
                                        >
                                            Continuar
                                        </button>
                                    </>
                                ) : (
                                    <div className="configuracao-aluguel">
                                        <h3>Configure seu Aluguel</h3>

                                        <div className="form-aluguel">
                                            <div className="form-group">
                                                <label>Período de Aluguel:</label>
                                                <select
                                                    value={configAluguel.meses}
                                                    onChange={handleMesesChange}
                                                >
                                                    <option value="1">1 mês</option>
                                                    <option value="3">3 meses</option>
                                                    <option value="6">6 meses</option>
                                                    <option value="12">12 meses</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Quilometragem Mensal:</label>
                                                <select
                                                    value={configAluguel.kmPorMes}
                                                    onChange={handleKmPorMesChange}
                                                >
                                                    <option value="1000">1.000 km/mês</option>
                                                    <option value="2000">2.000 km/mês</option>
                                                    <option value="3000">3.000 km/mês</option>
                                                    <option value="5000">5.000 km/mês</option>
                                                </select>
                                            </div>

                                            <div className="resumo-aluguel">
                                                <h4>Resumo do Aluguel</h4>
                                                <p>Período: {configAluguel.meses} {configAluguel.meses === 1 ? 'mês' : 'meses'}</p>
                                                <p>Quilometragem Total: {calcularKmTotal().toLocaleString()} km</p>
                                                <p>Valor Mensal: R$ {configAluguel.precoMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                <p>Valor Total: R$ {calcularTotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                                <p className="aviso-km">
                                                    * Quilômetros excedentes serão cobrados a R$ {configAluguel.kmExtra.toFixed(2)}/km
                                                </p>
                                            </div>

                                            <button onClick={prosseguirParaLogin} className="botao-alugar">
                                                {isAuthenticated ? 'Prosseguir para Checkout' : 'Prosseguir para Login'}
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}