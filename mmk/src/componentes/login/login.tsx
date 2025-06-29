import './login.css'
import { Link } from 'react-router-dom'
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"

export function Login() {
    return (
        <div className="container">
            <div className="secao-formulario">
                <img className="logo" src={Logo} alt="Logo" />
                <h1 className="titulo">Bem-vindo de volta</h1>

                <form>
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

                    <button className="botao" type="submit">Entrar</button>
                </form>

                <div className="texto-rodape">
                    Não tem uma conta?<Link to="/cadastro">Cadastre-se</Link>
                </div>
            </div>

            <div className="secao-imagem" />
        </div>
    )
}
