import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAddresses } from "../../services/Cabecudos";
import Addres from "./Addres";

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [defaultAddres, setDefaultAddres] = useState([]);
    const token = 'b04c81bc-9701-4794-87fd-eafcd88650a5';
    useEffect(() => {
        getAddresses(token)
        .then(res => {
            setAddresses(res.data);
            setDefaultAddres(res.data[0].id);
        })
        .catch(err => {
            console.log(err);
        });
    },[])
    console.log(addresses)
    console.log(defaultAddres)
    return (
        <>
        <Wrapper>
            <Title>Endereço de entrega:</Title>
            {addresses.map(addres => <Addres addres={addres} key={addres.id} defaultAddres={defaultAddres} setDefaultAddres={setDefaultAddres}/>)}
        </Wrapper>
        </>
    );
}

const Title = styled.p`
    color: #333;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Wrapper = styled.form`
    width: calc(100% - 36px);
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
