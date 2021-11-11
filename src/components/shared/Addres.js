import styled from "styled-components";

export default function Addres({addres, defaultAddres, setDefaultAddres}) {
    const {
        address,
        postal_code,
        id,
        comp
    } = addres;
    console.log(defaultAddres === id)
    return (
        <AddresOption>
            <CheckCircle onClick={() => setDefaultAddres(id)} chosen={defaultAddres === id}/>
            <InfoWrapper>
                <Info>{postal_code}, </Info>
                <Info>{address}</Info><br/>
                <Info>{comp}</Info>
            </InfoWrapper>
        </AddresOption>
    );
}

const Info = styled.span`
    &:last-child {
        color: grey;
    }
`;

const InfoWrapper = styled.p`
    font-size: 14px;
    line-height: 18px;
`;

const AddresOption = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const CheckCircle = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50px;
    border: #333 1px solid;
    background: ${({chosen}) => chosen ? `#3EA4C4` : `#ffffff`};
`;