import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import { getProducts } from "../../services/Cabecudos";
import CartItem from "../shared/CartItem";
import { PageStyle } from "../shared/styledComponents";


export default function Cart () {
    const [products, setProducts] = useState(null)
    const {cart} = useContext(CartContext)

    useEffect (() => {
        listProducts()
    }, [cart])

    function listProducts () {
        getProducts()
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }

    if (!products) return 'Loading...'

    return(
        <PageStyle>
            <CartWrapper>
                <CartItem data={products[0]} />
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

