import "./assets/reset.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/pages/SignUp.js";
import CartContext from "./contexts/CartContext";
import Home from "./components/pages/Home";
import Menu from "./components/Menu";
import { useEffect, useState } from "react";

export default function App() {
    const [cart, setCart] = useState([]);

    // Gets cart info from local storage if possible
    useEffect(() => {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
            setCart(JSON.parse(localCart));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/sign-in" exact />
                    <>
                        <Menu />
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/cart" exact />
                    </>
                    <Route path="*">
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </CartContext.Provider>
    );
}
