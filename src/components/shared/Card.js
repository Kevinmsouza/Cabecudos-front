import { useContext, useState } from "react";
import styled from "styled-components"
import CardCounter from "./CardCounter";
import { CardButtom } from "./styledComponents";
import CartContext from "../../contexts/CartContext"
import { sendAlert } from "./Alerts";

export default function Card ({data}) {
    const {id, name, price, stock, images} = data;
    const [imgIndex, setImgIndex] = useState(0)
    const [counterValue, setCounterValue] = useState(stock <= 0 ? 0 : 1)
    const stockColor = stock <= 0 ? '#E44747' : stock <= 10 ? '#E4A647' : '#3EC453';
    const {cart, setCart} = useContext(CartContext)

    function nextImg () {
        setImgIndex((imgIndex + 1) % images.length)
    }

    function addToCart () {
        if (counterValue <= 0) return
        const indexOfProduct = cart.map(e => e.id).indexOf(id)
        if (indexOfProduct < 0){
            setCart([...cart, {id, qtd: counterValue, price}])
            sendAlert('success', '🛒 É pra já!', `
                O produto foi adicionado ao seu carrinho!
                Precione o icone de carrinho no menu para fazer o checkout
                ou continue comprando!
            `)
        } else {
            const newCart = [...cart]
            if (newCart[indexOfProduct].qtd + counterValue > stock){
                newCart[indexOfProduct].qtd = stock;
                sendAlert('success', '💸 E la se vai o estoque!', `
                Alteramos a quantidade desse item no carrinho!
                Infelizmente não temos a quantidade desejada desse produto 
                então colocamos nosso estoque inteiro (${stock} un)! 
                Confira no icone de carrinho no menu!
            `)
            } else {
                newCart[indexOfProduct].qtd += counterValue;
                sendAlert('success', `🛒 Adicionamos + ${counterValue} desse Pop no carrinho!`, `
                Alteramos a quantidade desse item no carrinho!
                Você agora tem ${newCart[indexOfProduct].qtd} desses no carrinho!
            `)
            } 
            setCart(newCart)
        }
    }

    return (
        <CardSC>
            <CardStock color={stockColor} />
            <CardImgBox>
                <CardImg src={images[imgIndex]} onClick={nextImg} color={stockColor} />
                <ImgCounter color={stockColor} >{` ${imgIndex + 1}/${images.length} `}</ImgCounter>
            </CardImgBox>
            <CardName>{name}</CardName>
            <CardPrice>R${(price/100).toFixed(2)}</CardPrice>
            <CardCounter 
                value={counterValue} 
                setValue={setCounterValue} 
                isDisabled={stock <= 0} 
                stock={stock} 
            />
            <CardButtom onClick={addToCart} disabled={stock <= 0} >Colocar no carrinho</CardButtom>
        </CardSC>
    )
}

const CardSC = styled.div`
    width: 280px;
    background-color: #fafafa;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
`;

const CardImg = styled.img`
    width: 250px;
    height: 200px;
    border-radius: 30px;
    object-fit: cover;
    border: 5px solid ${props => props.color};
`;

const CardImgBox = styled.div`
    position: relative;
`;

const ImgCounter = styled.div`
    width: 30px;
    height: 30px;
    font-size: 12px;
    font-weight: 500;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    background-color: ${props => props.color};
    opacity: 0.8;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const CardName = styled.p`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: 0.01em;
    color: #333333;
`;

const CardPrice = styled.div`
    width: 100%;
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.01em;
    color: #333333;
`;

const CardStock = styled.div`
    width: 100%;
    height: 50px;
    background: ${props => props.color};
    border-radius: 20px 20px 0px 0px;
    margin-bottom: -30px;
`;