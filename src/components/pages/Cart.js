import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import CartItem from "../shared/CartItem";
import { PageStyle } from "../shared/styledComponents";


export default function Cart () {
    const {cart} = useContext(CartContext)

    return(
        <PageStyle>
            <CartWrapper>
                {cart.map((e, i) => <CartItem key={e.id} id={e.id} qtd={e.qtd} index={i} />)}
            </CartWrapper>
        </PageStyle>
    )
}

const CartWrapper = styled.div`
    width: calc(100% - 36px);
    max-width: 500px;
    min-height: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
`;

