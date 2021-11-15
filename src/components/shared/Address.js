import styled from "styled-components";
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAddress } from "../../services/Cabecudos";
import { sendAlert, sendConfirm } from "./Alerts";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function Address({setIsLoading, isLoading, oldAddress, defaultAddress, setDefaultAddress, reload, setReload}) {
    const {user} = useContext(UserContext);
    const {address, postal_code, id, comp} = oldAddress;

    function deleteAddressHandler() {
        sendConfirm('warning', 'Deseja remover esse endereço?')
        .then((result) => {
            if(result.isConfirmed) {
                setIsLoading(true);
                deleteAddress(user.token, id)
                .then(res => {
                    if(defaultAddress === id) {
                        setDefaultAddress(null);
                    }
                    setIsLoading(false);
                    setReload(!reload);
                })
                .catch(err => {
                    setIsLoading(false);
                    sendAlert('error', 'Oops... ;(', 'Houve um erro ao remover este endereço, tente novamente.')
                });
            } else if(result.isDenied) {
                return;
            }
        });
    }
    
    return (
        <AddressOption >
            <div onClick={() => setDefaultAddress(id)} >
                <CheckCircle chosen={defaultAddress === id} onClick={() => setDefaultAddress(id)}/>
                <InfoWrapper>
                    <Info>{postal_code}, {address}</Info><br/>
                    <Info>{comp||"(sem complemento)"}</Info>
                </InfoWrapper>
            </div>
            <Close onClick={deleteAddressHandler}><BsFillTrashFill/></Close>
        </AddressOption>
    );
}

const Close = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    background: inherit;
    border: none;
    font-size: 15px;
    opacity: 0.3;
    cursor: pointer;
`;

const Info = styled.span`
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 80%;
    &:first-child {
        white-space: nowrap;
    }
    &:last-child {
        color: grey;
        white-space: nowrap;
    }
`;

const InfoWrapper = styled.p`
    font-size: 14px;
    line-height: 18px;
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const AddressOption = styled.div`
    position: relative;
    & div {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
    }
`;

const CheckCircle = styled.div`
    width: 14px;
    height: 14px;
    max-height: 14px;
    max-width: 14px;
    border-radius: 50px;
    border: ${({chosen}) => chosen ? `none` : `#333 1px solid`};
    background: ${({chosen}) => chosen ? `#3EA4C4` : `#ffffff`};
    cursor: pointer;
`;