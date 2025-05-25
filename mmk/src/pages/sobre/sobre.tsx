import "./sobre.css";
import img from "../../imagem/Captura de Tela (259).png"

export function Sobre(){
    return(
        <div>
            <div className="*"></div>
            <div className="page-wrapper"></div>
            <div className="Foto">
            <div className="overlay" />
            <div className="content-center"></div>
            <h1 className="titulo">NOSSA COMPANHIA</h1>
            <img src={img} alt="" />
            </div>
   
        </div>

    )
}
