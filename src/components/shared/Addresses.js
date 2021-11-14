import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAddresses, postAddress } from "../../services/Cabecudos";
import Address from "./Address";
import { GrFormClose } from 'react-icons/gr';
import { useContext } from "react/cjs/react.development";
import UserContext from "../../contexts/UserContext";
import { sendAlert } from "./Alerts";
import Loader from "react-loader-spinner";

export default function Addresses({defaultAddress, setDefaultAddress, reload, setReload}) {
    const {user} = useContext(UserContext);
    const [addresses, setAddresses] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [comp, setComp] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        getAddresses(user.token)
        .then(res => {
            setAddresses(res.data);
            setDefaultAddress(res.data[0].id);
        })
        .catch(err => {
            console.log(err);
        });
    },[setDefaultAddress, reload, user.token]);

    function newAddressHandler(e) {
        e.preventDefault();

        const body = {
            userId: user.id,
            address,
            postalCode,
            comp: comp||"(sem complemento)",
        }

        setLoading(true);
        postAddress(user.token, body)
        .then(res => {
            setReload(!reload);
            setIsFormOpen(false);
            setPostalCode("");
            setAddress("");
            setComp("");
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
            if(postalCode.length<8) sendAlert('error', 'Preencha os dados corretamente.', "CEP deve ter 8 caracteres");
            else sendAlert('error', 'Preencha os dados corretamente.', "Endereço deve possuir rua e numero");
        })
    }

    function onChangeHandler(e) {
        if(e.target.value.length>8) return;
        setPostalCode(e.target.value);
    }

    return (
        <Wrapper>
            <Title>Endereço de entrega:</Title>
            {addresses.map(address => 
            <Address oldAddress={address} key={address.id} defaultAddress={defaultAddress} setDefaultAddress={setDefaultAddress} reload={reload} setReload={setReload}/>
            )}
            <Divider />
            {isFormOpen||<Button onClick={() => setIsFormOpen(true)}>Novo endereço</Button>}
            {isFormOpen ? 
                <AddressForm onSubmit={newAddressHandler} loading={loading}>
                    <Close onClick={(e) => {e.preventDefault(); setIsFormOpen(false)}}><GrFormClose/></Close>
                    <p>CEP</p>
                    <Input type="number" maxlength="8" value={postalCode} onChange={onChangeHandler} placeholder="Ex: 85903-320"/>
                    <p>Endereço</p>
                    <Input type="text" maxLength="40" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ex: Rua Primavera, 285"/>
                    <p>Complemento<span> (opcional)</span></p>
                    <Input type="text" maxLength="30" value={comp} onChange={e => setComp(e.target.value)} placeholder="Apt. 14"/>
                    <Button loading={loading} type="submit">{loading ? <Loader type="ThreeDots" color="#FFFFFF" height={13} /> : `Registrar endereço`}</Button>
                </AddressForm>
                :
                ""
            }
        </Wrapper>
    );
}

const Input = styled.input`
    line-height: 15px;
    margin-bottom: 15px;
    font-size: 16px;
    padding: 5px 10px;
    outline: none;
    border: 1px black solid;
    border-radius: 3px;
    color: #333;
`;

const Close = styled.div`
    background: inherit;
    border: none;
    font-size: 30px;
    width: 30px;
    font-weight: 700;
    text-align: right;
    margin-left: 90%;
`;

const AddressForm = styled.form`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 20px;
    pointer-events: ${({loading}) => loading?`none`:`initial`};
    & input {
        background-color: ${({loading}) => loading?`#e0e0e0`:`#ffffff`};
        opacity: ${({loading}) => loading?`0.4`:`1`};
    }
`;

const Button = styled.button`
    border: none;
    font-family: "Poppins", sans-serif;
    font-size: 18px;
    background: #3EA4C4;
    color: #ffffff;
    border-radius: 6px;
    opacity: ${({loading}) => loading?`0.7`:`1`};

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
    padding: 15px;
    font-family: "Poppins", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
