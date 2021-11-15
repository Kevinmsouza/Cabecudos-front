import styled from "styled-components";
import logo from "../assets/logo2.png";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import UserContext from "../contexts/UserContext";
import CartContext from "../contexts/CartContext";
import { closeSession } from "../services/Cabecudos";
import { sendAlert } from "./shared/Alerts";

export default function Menu() {
    const [showDropDown, setShowDropDown] = useState(false);
    const {cart} = useContext(CartContext);
    const { user} = useContext(UserContext);
    const history = useHistory();

    function relocate(whereTo) {
        history.push(whereTo);
        setShowDropDown(false);
    }

    function logoutHandler() {
        closeSession(user.token)
        .then(res => {
            localStorage.removeItem("user");
            window.location.reload();
        })
        .catch(err => {
            sendAlert("error", "Oops... ;(", "Houve um problema para terminar a sessão, tente novamente.");
        });
    }

    function cartCounter() {
        let counter = 0;
        cart.forEach(item => {
            counter+= item.qtd;
        });
        return counter;
    }
    
    return (
        <>
            <Wrapper>
                <Logo onClick={() => relocate("/")}>
                    <p>Cabeçudos</p>
                    <img src={logo} alt="Cabeçudos"/>
                </Logo>
                <Buttons>
                    <Cart onClick={() => relocate("/cart")}>
                        <RiShoppingCartLine />
                        <Counter>
                            {cartCounter()}
                        </Counter>
                    </Cart>
                    <Avatar showDropDown={showDropDown} onClick={() => setShowDropDown(!showDropDown)}>
                        <img src={user.image||"https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"} alt="Avatar"/>
                        <IoIosArrowDown />
                    </Avatar>
                </Buttons>
            </Wrapper>
            <DropDownMenu showDropDown={showDropDown} token={user.token}>
                {user.token ? 
                    <>
                        <p onClick={() => relocate("/history")}>Histórico</p>
                        <p onClick={logoutHandler}>Sair</p>
                    </>
                    :
                    <>
                        <p onClick={() => relocate("/sign-in")}>Entrar</p>
                        <p onClick={() => relocate("/sign-up")}>Cadastrar</p>
                    </>
                }
            </DropDownMenu>
            {showDropDown ? <Blank onClick={() => setShowDropDown(false)}/> : ""}
        </>
    );
}

const Wrapper = styled.header`
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    height: 50px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
`;

const Blank = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 100%;
`;

const DropDownMenu = styled.div`
    position: fixed;
    z-index: 2;
    top: ${({showDropDown, token}) => showDropDown ? `50px` : token ? `-15px` : `-15px`};    
    right: 0;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    width: 100px;
    background: #FFFFFF;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 0 10px;
    transition: 200ms;
    cursor: pointer;
    & p {
        width: 100%;
        padding: 8px 6px;
        text-align: center;
    }
    p:last-child {
        border-radius: 0 0 0 10px;
    }
    
`;

const Avatar = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 50px;
    padding-right: 8px;
    cursor: pointer;
    & img {
        width: 28px;
        height: 28px;
        border-radius: 100px;
        object-fit: cover;
    }
    svg {
        transform: rotate(${({showDropDown}) => showDropDown ? `180deg` : `0deg`});
        transition: 200ms;
    }
`;

const Buttons = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const Counter = styled.div`
    position: absolute;
    bottom: -5px;
    right: 0;
    background: #00A4C5;
    border-radius: 30px;
    font-size: 12px;
    max-width: 50px;
    min-width: 17px;
`;

const Cart = styled.button`
    position: relative;
    border: none;
    background: inherit;
    font-size: 16px;
    cursor: pointer;
`;

const Logo = styled.div`
    display: flex;
    padding-left: 8px;
    align-items: center;
    gap: 3px;
    font-family: 'Luckiest Guy', cursive;
    cursor: pointer;
    & img {
        width: 30px;
    }
    p {
        margin-top: 8px;
        font-size: 18px;
    }
`;