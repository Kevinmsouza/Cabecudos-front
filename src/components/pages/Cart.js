import { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import Addresses from "../shared/Addresses";
import { paymentAlert, sendAlert } from "../shared/Alerts";
import CartItem from "../shared/CartItem";

export default function Cart ({defaultAddress, setDefaultAddress, checkingOut, setCheckingOut}) {
    const {user} = useContext(UserContext);
    const [reload, setReload] = useState(false);
    const {cart} = useContext(CartContext)
    const history = useHistory();

    function calcTotal() {
        if (!cart.length) return 0;
        let total = 0;
        cart.forEach(e => total += e.price * e.qtd / 100)
        return total
    }

    function checkOutHandler() {
        if(!user.token) {
            sendAlert('warning', 'Você precisa estar logado para fazer a compra');
            history.push('/sign-in');
            return;
        }
        if(!defaultAddress) return sendAlert('warning', 'Você precisa informar um endereço de entrega!');
        paymentAlert()
        .then((result) => {
            if(result.isConfirmed) {
                setCheckingOut(true);
                history.push('/checkout');
            } else if(result.isDenied) {
                return;
            }
        });
    }

    return(
        <PageStyle>
            <CartWrapper>
                {cart.length ?
                    cart.map((e, i) => <CartItem 
                            key={e.id} 
                            id={e.id} 
                            qtd={e.qtd} 
                            index={i} 
                        />)
                    :
                    <EmptyCart>Carrinho vazio...</EmptyCart>
                }
                <TotalPrice><p>Total: </p> <PriceSpan>R$ {calcTotal().toFixed(2)}</PriceSpan></TotalPrice>
            </CartWrapper>
            {
                user.token && 
                <Addresses 
                    defaultAddress={defaultAddress} 
                    setDefaultAddress={setDefaultAddress} 
                    reload={reload} 
                    setReload={setReload}
                />
            }
            <CheckoutButton disabled={cart.length === 0} onClick={checkOutHandler}>Finalizar Pedido</CheckoutButton>
        </PageStyle>
    )
}

const CheckoutButton = styled.button`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 65px;
    background: #3EA4C4;
    border: none;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    font-size:25px;
    font-family: "Poppins", sans-serif;
    color: #ffffff;
    font-weight: 700;
    letter-spacing: 2px;
    &:disabled {
        background-color: lightgrey;
    }
`;

const PageStyle = styled.article`
    margin: 65px 0 80px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
`;

const CartWrapper = styled.div`
    width: calc(100% - 36px);
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
`;

const EmptyCart = styled.div`
    color: lightgray;
    text-decoration: underline;
    font-size: 30;
    width: 100%;
    height: 50px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TotalPrice = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    height: 50px;
    width: 100%;
    border-radius: 15px;
    color: #333;
    font-size: 30px;
    font-weight: 700;
    @media (max-width: 320px){
        font-size: 24px;
    }
`;

const PriceSpan = styled.span`
    color: #3EA4C4;
`;