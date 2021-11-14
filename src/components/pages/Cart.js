import { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import Addresses from "../shared/Addresses";
import CartItem from "../shared/CartItem";
import { PageStyle } from "../shared/styledComponents";

export default function Cart () {
    // const {token} = useContext(UserContext);
    const token = null;
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [reload, setReload] = useState(false);
    const {cart} = useContext(CartContext)

    function calcTotal() {
        if (!cart.length) return 0;
        let total = 0;
        cart.forEach(e => total += e.price * e.qtd / 100)
        return total
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
            {token?<Addresses defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} reload={reload} setReload={setReload}/>:""}
        </PageStyle>
    )
}

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