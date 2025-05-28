import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./componentes/login/login";
import { Sobre } from "./pages/sobre/sobre";
import { Modelo } from "./pages/modelos/modelo";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "sobre",
        element: <Sobre />
    },
    {
        path: "modelo",
        element: <Modelo />
    }

    
])

export {router}