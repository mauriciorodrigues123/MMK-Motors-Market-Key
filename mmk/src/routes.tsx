import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./componentes/login/login";
import { Sobre } from "./pages/sobre/sobre";
import { Carros } from "./pages/carros/carros";
import { Admin } from "./pages/admin/Admin";
import { AdminLogin } from "./pages/admin/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { UserAuth } from "./pages/user/UserAuth";
import { Checkout } from "./pages/checkout/Checkout";
import { CheckoutSuccess } from "./pages/checkout/Success";
import { Historico } from "./pages/historico/Historico";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "login",
        element: <UserAuth />
    },
    {
        path: "sobre",
        element: <Sobre />
    },
    {
        path: "carros",
        element: <Carros />
    },
    {
        path: "historico",
        element: (
                <Historico />
        )
    },
    {
        path: "checkout",
        element: (
            <PrivateRoute>
                <Checkout />
            </PrivateRoute>
        )
    },
    {
        path: "checkout/sucesso",
        element: <CheckoutSuccess />
    },
    {
        path: "admin/login",
        element: <AdminLogin />
    },
    {
        path: "admin",
        element: (
            <PrivateRoute>
                <Admin />
            </PrivateRoute>
        )
    }, 

    
])

export { router }