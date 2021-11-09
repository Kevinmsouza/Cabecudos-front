import { useState } from "react";
import styled from "styled-components"


export default function Card ({data}) {
    const {id, name, price, stock, images} = data;
    const [imgIndex, setImgIndex] = useState(0)
    const stockColor = stock < 0 ? '#E44747' : stock <= 10 ? '#E4A647' : '#3EC453';

    function nextImg () {
        setImgIndex((imgIndex + 1) % images.length)
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
`;

const CardStock = styled.div`
    width: 100%;
    height: 50px;
    background: ${props => props.color};
    border-radius: 20px 20px 0px 0px;
    margin-bottom: -30px;
`;