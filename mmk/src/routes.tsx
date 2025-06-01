import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./componentes/login/login";
import { Sobre } from "./pages/sobre/sobre";
import { Carros } from "./pages/carros/carros";



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
        path: "carros",
        element: <Carros />
    }

    
])

export {router}