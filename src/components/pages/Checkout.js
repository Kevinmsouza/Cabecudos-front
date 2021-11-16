/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import { postPurchase } from "../../services/Cabecudos";
import { sendAlert } from "../shared/Alerts";
import checkout from "../../assets/checkout.gif";
import Load from "../shared/Load";

export default function Checkout({defaultAddress, setDefaultAddress, checkingOut, setCheckingOut}) {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const {cart, setCart} = useContext(CartContext);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(!checkingOut) return history.push('/');
        checkOut();
    }, []);

    function checkOut() {
        const body = {
            cart,
            address_id: defaultAddress,
        };
        postPurchase(user.token, body)
        .then(res => {
            setCheckingOut(false);
            setLoading(false);
            setCart([]);
            setDefaultAddress(null);
        })
        .catch(err => {
            sendAlert('error', 'Oops... :(', 'Ocorreu um erro inesperado ao finalizar sua compra, tente novamente mais tarde.')
            setLoading(false);
            setCheckingOut(false);
            history.push('/cart');
        })
       
    }

    if (loading) {
        return <Load />
    } 

    return (
        <PageStyle>
            <SuccesMsg>
                Obrigado por comprar com a gente! Seus funkos chegarão até você o mais rápido possível.
            </SuccesMsg>
            <SuccessFunko src={checkout}/>
            <SuccesMsg>
                Enquanto isso, você pode clicar <Link to='/history'>aqui</Link> para visualizar seus pedidos.
            </SuccesMsg>
        </PageStyle>
    );
}

const SuccessFunko = styled.img`
    width: 250px;
    border-radius: 20px;
`;

const SuccesMsg = styled.p`
    text-align: center;
    line-height: 30px;
    width: 280px;
    & a {
        color: #00A4C5;
    }
`;

const PageStyle = styled.article`
    margin: 85px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    flex-direction: column;
`;