import styled from "styled-components";
import {BsInstagram} from 'react-icons/bs'
import {AiOutlineFacebook} from 'react-icons/ai'
import {SiGmail} from 'react-icons/si'
import {ImWhatsapp} from 'react-icons/im'
import {FaTelegramPlane} from 'react-icons/fa'
import logo from "../assets/logo1.png";

export default function Footer() {
    return (
        <Wrapper>
            <Payment>
                <p>Formas de pagamento</p>
                <PaymentIcons>
                    <PaymentImg src="https://xda.com.br/wp-content/uploads/boleto-icone.png" />
                    <PaymentImg src="https://media.discordapp.net/attachments/906322138993164308/910223756629274685/logo-pix-icone-512.png" />
                    <PaymentImg src="https://i.pinimg.com/originals/62/a3/f0/62a3f05f06cac1566abca1281ced0c41.png" />
                </PaymentIcons>
            </Payment>
            <Comm>
                <p>Fale com a gente</p>
                <Icons>
                    <BsInstagram />
                    <AiOutlineFacebook />
                    <SiGmail />
                    <ImWhatsapp />
                    <FaTelegramPlane />               
                </Icons>
            </Comm>
            <Logo>
                <LogoImg src={logo} alt="Cabeçudos"/>
            </Logo>
        </Wrapper>
    );
}

const PaymentImg = styled.img`
    width: 35px;
`;

const PaymentIcons = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 15px;
`;

const Icons = styled.div`
    font-size: 35px;
    display: flex;
    gap: 15px;
    & svg {
        cursor: pointer;
    }
`;

const Comm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 40px;
    font-weight: 500;
    gap: 15px;
    & p {
        text-align: center;
    }

`;

const Payment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-left: 25px;
    width: 220px;
    & p {
        font-size: 18px;
        text-align: center;
    }
    @media (max-width: 580px) {
        margin-left: 0px;
    }
`;

const LogoImg = styled.img`
    width: 140px;
    padding-right: 30px;
    @media (max-width: 580px) {
        padding-right: 0px;
    }
`;

const Logo = styled.div`
    width: 220px;
    display: flex;
    justify-content: right;
    @media (max-width: 580px) {
        justify-content: center;
    }
`;

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    background: #00A4C5;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    color: black;
    align-items: center;
    @media (max-width: 580px) {
        flex-direction: column-reverse;
        height: 100%;
        gap: 20px;
        padding-bottom: 20px;
    }
`;