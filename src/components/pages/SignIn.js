import { sendAlert } from "../shared/Alerts.js";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { SignContainer, PopButton } from "../shared/styledComponents.js";
import { getUserData } from "../../services/Cabecudos.js";
import UserContext from "../../contexts/UserContext.js";
import Logo from '../../assets/logo2.png';
import styled from "styled-components";

export default function SignIn() {

    const [ data, setData ] = useState({ email:"", password:"", });
    const [ requesting, setRequesting ]= useState(false);
    const { setUser } = useContext(UserContext);
    const history = useHistory();

    function login(e) {
        if (requesting) return;
        e.preventDefault();
        if (!data.email || !data.password) return sendAlert('error', 'Opa! :(', 'Os campos devem estar preenchidos!');
        setRequesting(true);
        getUserData(data)
        .then(answer => {
            setRequesting(false);
            setUser(answer.data);
            localStorage.setItem("user", JSON.stringify(answer.data));
            history.push('/');
        })
        .catch(answer => {
            console.log(answer.response);
            setRequesting(false);
            setData({ ...data, password:"", });
            sendAlert('error', 'Oops! :(', 'Usuario e/ou senha incorreto(s)');
        });    
    }

    return (
        <SignContainer>
            <FormLogo log="in">
                <img alt='logo' src={Logo} onClick={()=>requesting ? '' : history.push('/')} ></img>
                <p onClick={login} >Entrar</p>
            </FormLogo>
            <SignStyles disabled={requesting} onSubmit={login} >
                <InputWrapper>
                    <PopInput placeholder="Email" disabled={requesting} type="email" value={data.email} onChange={(e)=>setData({...data, email: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Senha" disabled={requesting} type="password" value={data.password} onChange={(e)=>setData({...data, password: e.target.value})} required ></PopInput>
                </InputWrapper>
                <ButtonsWrapper>
                    <PopButton disabled={requesting} type="submit" >{ requesting ? "Entrando..." : "Entrar" }</PopButton>
                    <p className="switch-sign" onClick={() => requesting ? '' : history.push('/sign-up')} >Primeira vez? Cadastre-se! </p>
                </ButtonsWrapper>
            </SignStyles>
        </SignContainer>
    )
}

const SignStyles=styled.form`
    margin-top: 20px;
    position: relative;
    width:100%;
    height: 340px;
    max-width: 500px;
    padding: 28px 24px;
    background: #fff;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    row-gap: 5px;
    @media(max-width: 370px){
        padding: 24px 16px;
    }
`;

const PopInput = styled.input`
    font-family: inherit;
    border-radius: 6px;
    height: 42%;
    color: #555;
    offset: none;
    outline-style: none;
    border: none;
    padding: 0px 10px;
    font-size: 18px;
    font-weight: 400;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #3EA4C4;
    width:100%;
    padding: 2px 7px;
    border-radius: 15px;
    height: 100%;
    max-height: 140px;
    margin-bottom: 0px;
`;

const FormLogo = styled.div`
    width:100%;
    font-family: 'Luckiest Guy', cursive;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 12px;
    img{
        width: 70px;
        cursor: pointer;
    }
    p{
        font-size: 34px;
        color: #333;
        cursor: pointer;
        letter-spacing: 0.3ex;
    }
`;

const ButtonsWrapper = styled.div`
    min-width: 100%;
    max-width: 285px;
    text-align: center;
    .switch-sign{
        margin-top: 30px;
        font-size: 12px;
        font-weight: 700;
        color: #3EA4C4;
        cursor:pointer;
        &:hover{
            text-decoration:underline;
        }
    }
    @media(max-width:370px){
        .switch-sign{
            font-size: 11px;
        }
    }
`;
