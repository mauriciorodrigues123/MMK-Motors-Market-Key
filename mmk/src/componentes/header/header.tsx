import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./header.css"
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"

export function Header() {
    // Estados para controlar o menu e o scroll
    const [menuAberto, setMenuAberto] = useState(false);
    const [paginaRolada, setPaginaRolada] = useState(false);
    const location = useLocation();

    // Função para alternar o estado do menu mobile
    const alternarMenu = () => {
        setMenuAberto(!menuAberto);
    };

    // Efeito para detectar o scroll da página
    useEffect(() => {
        const manipularScroll = () => {
            const primeiraSessao = document.querySelector('.left');
            if (primeiraSessao) {
                const parteBaixoSessao = primeiraSessao.getBoundingClientRect().bottom;
                setPaginaRolada(parteBaixoSessao <= 0);
            }
        };

        // Adiciona e remove o evento de scroll
        window.addEventListener('scroll', manipularScroll);
        return () => window.removeEventListener('scroll', manipularScroll);
    }, []);

    // Fecha o menu quando mudar de página
    useEffect(() => {
        setMenuAberto(false);
    }, [location]);

    return (
        // Cabeçalho principal com classes dinâmicas baseadas no scroll
        <header className={`header ${paginaRolada ? 'scrolled' : ''}`}>
            {/* Logo do site */}
            <div className="logo">
                <Link to="/">
                    <img className='logo-mmk' src={Logo} alt="logo" />
                </Link>
            </div>

            {/* Botão do menu hambúrguer para mobile */}
            <button
                className={`hamburger ${menuAberto ? 'active' : ''}`}
                onClick={alternarMenu}
                aria-label="Menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Menu de navegação */}
            <nav className={`nav ${menuAberto ? 'active' : ''}`}>
                <Link to="/" onClick={alternarMenu}>Home</Link>
                <Link to="/carros" onClick={alternarMenu}>Carros</Link>
                <Link to="/sobre" onClick={alternarMenu}>Sobre</Link>
                <Link to="/login" onClick={alternarMenu}>Login</Link>
            </nav>
        </header>
    )
}