import './login.css'

import CarroAnimado from "../../imagem/supawork-ae84be9c4e3c42e6a71d2ae7a00bb588.gif"
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"

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