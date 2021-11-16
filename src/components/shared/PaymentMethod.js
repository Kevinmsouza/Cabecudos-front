
import { useState } from "react";
import styled from "styled-components";

export default function PaymentMethod() {
    const [chosen, setChosen] = useState("pix");

    function paymentHandler(method) {
        setChosen(method);
    }

    return (
        <Wrapper >
            <Option onClick={() => paymentHandler('pix')}>
                <Image src="https://media.discordapp.net/attachments/906322138993164308/910223756629274685/logo-pix-icone-512.png" />
                <CheckCircle chosen={chosen==='pix'} />
            </Option>
            <Option onClick={() => paymentHandler('ticket')}>
                <Image src="https://xda.com.br/wp-content/uploads/boleto-icone.png" />
                <CheckCircle chosen={chosen==='ticket'} />
            </Option>
            <Option onClick={() => paymentHandler('card')}>
                <Image src="https://i.pinimg.com/originals/62/a3/f0/62a3f05f06cac1566abca1281ced0c41.png" />
                <CheckCircle chosen={chosen==='card'}/>
            </Option>
        </Wrapper>
    );
}

const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`;

const Image = styled.img`
    height: 50px;
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