import "./assets/reset.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Cart from "./components/pages/Cart";
import UserContext from "./contexts/UserContext";
import CartContext from "./contexts/CartContext";
import Home from "./components/pages/Home";
import Menu from "./components/Menu";
import History from "./components/pages/History";
import Checkout from "./components/pages/Checkout";

export default function App() {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart"))||[]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [checkingOut, setCheckingOut] = useState(false);

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
                            <Route path="/cart" exact >
                                <Cart 
                                    defaultAddress={defaultAddress} 
                                    setDefaultAddress={setDefaultAddress} 
                                    checkingOut={checkingOut}
                                    setCheckingOut={setCheckingOut}
                                />
                            </Route>
                            <Route path="/history" exact>
                                <History />
                            </Route>
                            <Route path="/checkout" exact>
                                <Checkout 
                                    defaultAddress={defaultAddress} 
                                    setDefaultAddress={setDefaultAddress}
                                    checkingOut={checkingOut}
                                    setCheckingOut={setCheckingOut}
                                />
                            </Route>
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
