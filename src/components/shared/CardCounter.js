import { useEffect } from "react"
import styled from "styled-components"


export default function CardCounter ({value, setValue, isDisabled, stock}) {
    useEffect(() => {
        if (value < 0) setValue(0)
        if (value > stock) setValue(stock)
    }, [value])

    return(
        <CounterBox>
            <CounterButtom disabled={isDisabled} onClick={() => setValue(value-1)} >-</CounterButtom>
            <QtdBox
                type='number'
                value={value} 
                disabled={isDisabled} 
                onChange={e => {setValue(e.target.value)}}
            />
            <CounterButtom disabled={isDisabled} onClick={() => setValue(value+1)}  >+</CounterButtom>
        </CounterBox>
    )
}

const CounterBox = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const QtdBox = styled.input`
    width: 30px;
    height: 30px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    text-align: center;
    border-radius: 5px;
    border: none;
    background-color: #3EA4C4;
    color: #fff;
    &:focus {
        outline: none;
    }
`;

const CounterButtom = styled.button`
    color: #3EA4C4;
    font-size: 30px;
    font-weight: 700;
    border: none;
    background-color: #ffffff;
    &:disabled {
        color: lightgrey;
    }
`;