import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./header.css"
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"

export function Header() {
    // Estados para controlar o menu e o scroll
    const [menuAberto, setMenuAberto] = useState(false);
    const [paginaRolada, setPaginaRolada] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Função para alternar o estado do menu mobile
    const alternarMenu = () => {
        setMenuAberto(!menuAberto);
    };

    useEffect(() => {
        const userDataStr = localStorage.getItem('user_data');
        const adminToken = localStorage.getItem('admin_token');
        console.log('Admin token:', adminToken);

        if (userDataStr) {
            setUserData(JSON.parse(userDataStr));
        }

        setIsAdmin(!!adminToken);
        console.log('Is admin:', !!adminToken);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('admin_token');
        setUserData(null);
        setIsAdmin(false);
        setUserDropdownOpen(false);
        navigate('/');
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
        setUserDropdownOpen(false);

        // Atualiza o estado de admin quando mudar de página
        const adminToken = localStorage.getItem('admin_token');
        setIsAdmin(!!adminToken);
    }, [location]);

    // Fecha o dropdown quando clicar fora dele
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const userMenu = document.querySelector('.user-menu');
            if (userMenu && !userMenu.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

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

                {isAdmin && (
                    <Link to="/admin" onClick={alternarMenu} className="admin-link">
                        Add Carros
                    </Link>
                )}

                {userData ? (
                    <div className="user-menu">
                        <button
                            className="user-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setUserDropdownOpen(!userDropdownOpen);
                            }}
                        >
                            <span className="user-icon">👤</span>
                        </button>

                        {userDropdownOpen && (
                            <div className="user-dropdown">
                                <div className="user-info">
                                    <strong>{userData.nome}</strong>
                                    <span>{userData.email}</span>
                                </div>
                                <Link to="/historico" className="menu-item">
                                    Meus Aluguéis
                                </Link>

                                <button onClick={handleLogout} className="logout-button">
                                    Sair
                                </button>
                            </div>

                        )}
                    </div>
                ) : (
                    <Link to="/login" onClick={alternarMenu}>Login</Link>
                )}
            </nav>
        </header>
    )
}