import "./assets/reset.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Menu from "./components/Menu";

export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/sign-up" exact />
                <Route path="/sign-in" exact />
                <>
                    <Menu />
                    <Route path="/" exact ></Route>
                    <Route path="/cart" exact />
                </>
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
