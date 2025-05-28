import "../../pages/home/home.css"
import { Link } from "react-router-dom";
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"



export function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img className='logo-mmk' src={Logo} alt="logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Modelos</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to={"sobre"}>sobre</Link></li>
                </ul>
            </nav>
        </header>
    )
}