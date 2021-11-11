import styled from "styled-components";
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteAddress } from "../../services/Cabecudos";

export default function Address({oldAddress, defaultAddress, setDefaultAddress, reload, setReload}) {
    // const {token} = useContext(UserContext);
    const token = 'b04c81bc-9701-4794-87fd-eafcd88650a5';
    const {address, postal_code, id, comp} = oldAddress;

    function deleteAddressHandler() {
        deleteAddress(token, id)
        .then(res => {
            setReload(!reload);
        })
        .catch(err => {
            alert(err);
        });
    }
    
    return (
        <AddressOption >
            <CheckCircle chosen={defaultAddress === id} onClick={() => setDefaultAddress(id)}/>
            <InfoWrapper>
                <Info>{postal_code}, {address}</Info><br/>
                <Info>{comp||"(sem complemento)"}</Info>
            </InfoWrapper>
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
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    position: relative;
`;

const CheckCircle = styled.div`
    width: 14px;
    height: 14px;
    max-height: 14px;
    max-width: 14px;
    border-radius: 50px;
    border: ${({chosen}) => chosen ? `none` : `#333 1px solid`};
    background: ${({chosen}) => chosen ? `#3EA4C4` : `#ffffff`};
`;