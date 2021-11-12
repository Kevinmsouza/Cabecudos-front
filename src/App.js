import "./assets/reset.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import CartContext from "./contexts/CartContext.js";
import SignUp from "./components/pages/SignUp.js";
import SignIn from "./components/pages/SignIn.js";
import Home from "./components/pages/Home.js";
import Menu from "./components/Menu.js";
import UserContext from "./contexts/UserContext";

export default function App() {
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState({});

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
        <UserContext.Provider value={{user, setUser}}>
        <CartContext.Provider value={{cart, setCart}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-up" exact component={SignUp}/>
                    <Route path="/sign-in" exact component={SignIn}/>
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
        </UserContext.Provider>
    );
}
