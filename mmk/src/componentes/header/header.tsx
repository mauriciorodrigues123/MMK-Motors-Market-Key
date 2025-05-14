import './header.css'


export function Header() {
    return (
        <div>
            <header className="header">
                <div className="logo">MMK</div>
                <nav className="nav">
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Modelos</a></li>
                        <li><a href="#">Inovação</a></li>
                        <li><a href="#">Sobre</a></li>
                    </ul>
                </nav>
            </header>

        </div>
    )
}