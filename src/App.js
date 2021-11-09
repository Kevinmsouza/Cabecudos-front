import "./assets/reset.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CartContext from "./contexts/CartContext";
import Home from "./components/pages/Home";
import Menu from "./components/Menu";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react";

export default function App() {
    const [cart, setcart] = useState([]);

    // Gets cart info from local storage if possible
    useEffect(() => {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
            setcart(JSON.parse(localCart));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <CartContext.Provider value={{cart, setcart}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-up" exact />
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
