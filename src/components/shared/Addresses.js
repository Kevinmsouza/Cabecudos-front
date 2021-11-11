import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAddresses, postAddress } from "../../services/Cabecudos";
import Address from "./Address";
import { GrFormClose } from 'react-icons/gr';
import { useContext } from "react/cjs/react.development";
import UserContext from "../../contexts/UserContext";

export default function Addresses({defaultAddress, setDefaultAddress, reload, setReload}) {
    // const {id, token} = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [comp, setComp] = useState("");

    const token = 'b04c81bc-9701-4794-87fd-eafcd88650a5';
    useEffect(() => {
        getAddresses(token)
        .then(res => {
            setAddresses(res.data);
            setDefaultAddress(res.data[0].id);
        })
        .catch(err => {
            console.log(err);
        });
    },[setDefaultAddress, reload]);

    function newAddressHandler(e) {
        e.preventDefault();
        const body = {
            userId: 7,
            address,
            postalCode,
            comp: comp||"(sem complemento)",
        }
        postAddress(token, body)
        .then(res => {
            setReload(!reload);
            setIsFormOpen(false);
            setPostalCode("");
            setAddress("");
            setComp("");
        })
        .catch(err => console.log(err))
    }

    function onChangeHandler(e) {
        if(e.target.value.length>8) return;
        setPostalCode(e.target.value);
    }

    return (
        <>
        <Wrapper>
            <Title>Endereço de entrega:</Title>
            {addresses.map(address => 
            <Address oldAddress={address} key={address.id} defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} reload={reload} setReload={setReload}/>
            )}
            <Divider />
            {isFormOpen||<Button onClick={() => setIsFormOpen(true)}>Novo endereço</Button>}
            {isFormOpen ? 
                <AddressForm onSubmit={newAddressHandler}>
                    <Close onClick={(e) => {e.preventDefault(); setIsFormOpen(false)}}><GrFormClose/></Close>
                    <p>CEP</p>
                    <Input type="number" maxlength="8" value={postalCode} onChange={onChangeHandler} placeholder="Ex: 85903-320"/>
                    <p>Endereço</p>
                    <Input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: Rua Primavera, 285"/>
                    <p>Complemento<span> (opcional)</span></p>
                    <Input type="text" maxlength="30" value={comp} onChange={e => setComp(e.target.value)} placeholder="Apt. 14"/>
                    <Button type="submit">Registrar endereço</Button>
                </AddressForm>
                :
                ""
            }
        </Wrapper>
        </>
    );
}

const Input = styled.input`
    line-height: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    padding: 5px;
    outline: none;
`;

const Close = styled.button`
    background: inherit;
    border: none;
    font-size: 30px;
    right: 0;
    top: 0;
    font-weight: 700;
    text-align: right;
`;

const AddressForm = styled.form`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 20px;
`;

const Button = styled.button`
    border: none;
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    background: #3EA4C4;
    color: #ffffff;
    border-radius: 6px;
`;

const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: lightgrey;
`;

const Title = styled.p`
    color: #333;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Wrapper = styled.div`
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
