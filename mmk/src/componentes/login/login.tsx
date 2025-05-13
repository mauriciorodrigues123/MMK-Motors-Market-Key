import './login.css'

export function Login(){
    return(
        <div>
            <section className="section-login">
                <div className="login">
                    <label>nome</label>
                    <input type="text" />
                    <label>email</label>
                    <input type="email" />
                    <label>senha</label>
                    <input type="password"/>
                </div>

                <div className="imagem">
                    
                </div>
            </section>
        </div>
    )
}