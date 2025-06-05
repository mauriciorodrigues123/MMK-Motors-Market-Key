import './cadastro.css'
import { Link } from 'react-router-dom'
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"

export function Cadastro() {
    return (
        <div className="container">
            <div className="secao-formulario">
                <img className="logo" src={Logo} alt="Logo" />
                <h1 className="titulo">Criar Conta</h1>

                <form>
                    <div className="grupo-input">
                        <label className="rotulo" htmlFor="nome">Nome Completo</label>
                        <input
                            className="campo"
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome completo"
                            required
                        />
                    </div>

                    <div className="grupo-input">
                        <label className="rotulo" htmlFor="email">Email</label>
                        <input
                            className="campo"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email"
                            required
                        />
                    </div>

                    <div className="grupo-input">
                        <label className="rotulo" htmlFor="telefone">Telefone</label>
                        <input
                            className="campo"
                            type="tel"
                            id="telefone"
                            name="telefone"
                            placeholder="(00) 00000-0000"
                            required
                        />
                    </div>

                    <div className="grupo-input">
                        <label className="rotulo" htmlFor="senha">Senha</label>
                        <input
                            className="campo"
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button className="botao" type="submit">Criar Conta</button>
                </form>

                <div className="texto-rodape">
                    Já tem uma conta?<Link to="">Fazer login</Link>
                </div>
            </div>

            <div className="secao-imagem" />
        </div>
    )
}
