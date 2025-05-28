import Logo from "../../imagem/Captura de Tela (259).png"
import { Link } from "react-router-dom";
import "./header2.css"

export function Header2() {
    return (
        <div>
            <header className="header">
            <div className="logo">
                <img className='logo-mmk' src={Logo} alt="logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to="/">home</Link></li>
                    <li><Link to="modelo">modelo</Link></li>
                    <li><Link to="login">Login</Link></li>
                    <li><Link to={"sobre"}>sobre</Link></li>
                </ul>
            </nav>
        </header>
        </div>
    );
}