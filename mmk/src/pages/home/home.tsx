import './home.css'
import Mustang from "../../imagem/ChatGPT_Image_14_de_mai._de_2025__18_41_19-removebg-preview.png"
import Logo from "../../imagem/ChatGPT Image 14 de mai. de 2025, 09_06_52.png"
import { Header } from '../../componentes/header/header'

export function Home() {
    return (
        <div>
            <header className="header">
                <div className="logo">
                     <img className='logo-mmk' src={Logo} alt="logo" />
                </div>
                <nav className="nav">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Modelos</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sobre</a></li>
                       
                    </ul>
                </nav>
            </header>
            <main className="main">
                <section className="left">
                    
                        <div className="title">Motors Market Key</div>
                        <div className="subtitle">Bem-vindo</div>

                    <p className="description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat porro vel.</p>
                    <nav>
                        <a href="#" className="btn">Saiba mais</a>
                    </nav>
                </section>

                <section className="right">
                    <div className="car-container">
                    <img src={Mustang} alt="Mustang Car" className="car-image" />
                    </div>
                </section>

                

            </main>

        </div>
    )
}