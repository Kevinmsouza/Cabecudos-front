import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import CartContext from "../../contexts/CartContext";
import { getProducts } from "../../services/Cabecudos";
import Addresses from "../shared/Addresses";
import CartItem from "../shared/CartItem";
import { PageStyle } from "../shared/styledComponents";


export default function Cart () {
    const [products, setProducts] = useState(null)
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [reload, setReload] = useState(false);
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
                <CartItem data={products[0]} />
                <CartItem data={products[0]} />
            </CartWrapper>
            <Addresses defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} reload={reload} setReload={setReload}/>
        </PageStyle>
    );
}

const CartWrapper = styled.div`
    width: calc(100% - 36px);
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
`;