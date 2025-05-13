import './login.css'

import CarroAnimado from "../../imagem/655d2da400a648abca600766a89deead.gif"
import Logo from "../../imagem/Captura de Tela (259).png"

export function Login() {
    return (
        <div>
            <div className="container">
                <div className="form-section">
                    <img className='logo' src={Logo} alt="logo" />
                    <h1>Bem vindo</h1>
                    
                    <form>
                        <label htmlFor="email">Email </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email"
                            required
                        />

                        <label htmlFor="password">Senha </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            required
                        />

                        <button type="submit">Log In</button>
                    </form>

                    <div className="bottom-text">
                        Não tem uma conta? <a href="#">Conecte-se</a>
                    </div>
                </div>

                <div className="image-section">
                    <img src={CarroAnimado} alt="" />
                </div>
            </div>
        </div>
    )
}