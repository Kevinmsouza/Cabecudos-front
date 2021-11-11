import { useState } from "react";
import { useHistory } from "react-router";
import { SignContainer, FormLogo } from "../shared/styledComponents.js";
import Logo from '../../assets/logo2.png';
import { sendUserData } from "../../services/Cabecudos.js";
import styled from "styled-components";

export default function SignUp() {

    const [ data, setData ] = useState({ name:"", phone:"", cpf:"", birthdate:"", imageUrl:"" , email:"", password:"", });
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ requesting, setRequesting ]= useState(false);
    const [ birthdateInputType, setBirthdateInputType ] = useState('text');
    const history = useHistory();

    function register(e) {
        e.preventDefault();
        if( !data.name || !data.password || !data.cpf || !confirmPassword || !data.email ) return alert('Preencha os campos obrigatórios!'); // will change to sweetAlert()
        const { cpf, password, } = data;
        let trimmedCpf = cpf.replace(/[-|.]/g,'');
        if (password !== confirmPassword) {
            setData({ ...data, password:"", });
            setConfirmPassword("");
            return alert("As senhas devem ser iguais!"); // will change to sweetAlert()
        }
        if (trimmedCpf.length !== 11) return alert("CPF deve ter 11 dígitos"); // will change to sweetAlert()
        setRequesting(true);
        sendUserData({ ...data, cpf: trimmedCpf })
        .then(answer => {
            console.log(answer.data);
            setRequesting(false);
            setData({ name:"", phone:"", cpf:"", birthdate:"", imageUrl:"", email:"", password:"", });
            setConfirmPassword("");
            alert("Cadastro concluído"); // will change to sweetAlert()
            history.push("/sign-in");
        })
        .catch(answer => {
            console.log(answer.response);
            setRequesting(false);
            setData({ ...data, password:"", });
            setConfirmPassword("");
        });
    }

    return(
        <SignContainer>
            <FormLogo>
                <img alt='logo' src={Logo} onClick={()=>history.push('/')} ></img>
                <p onClick={register} >Cadastrar</p>
            </FormLogo>
            <SignStyles onSubmit={register}>
                <InputWrapper>
                    <PopInput placeholder="Nome" type="text" value={data.name} onChange={(e)=>setData({...data, name: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Telefone" type="text" value={data.phone} onChange={(e)=>setData({...data, phone: e.target.value})} required ></PopInput>
                    <PopInput placeholder="CPF" type="text" value={data.cpf} onChange={(e)=>setData({...data, cpf: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Data de Nascimento" type={birthdateInputType} onFocus={()=>setBirthdateInputType('date')} value={data.birthdate} onChange={(e)=>setData({...data, birthdate: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Imagem do Avatar (Opcional)" type="text" value={data.imageUrl} onChange={(e)=>setData({...data, imageUrl: e.target.value})} ></PopInput>
                    <PopInput placeholder="Email" type="text" value={data.email} onChange={(e)=>setData({...data, email: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Senha" type="password" value={data.password} onChange={(e)=>setData({...data, password: e.target.value})} required ></PopInput>
                    <PopInput placeholder="Confirme sua Senha" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required ></PopInput>
                </InputWrapper>
                <ButtonsWrapper>
                    <PopButton type="submit">{ requesting ? "Cadastrando..." : "Cadastrar" }</PopButton>
                    <p className="switch-sign" onClick={() => history.push('/sign-in')} >Já tem uma conta? Clique aqui para fazer o Login!</p>
                </ButtonsWrapper>
            </SignStyles>
        </SignContainer>
    )
}

const PopButton = styled.button`
    font-family: inherit;
    width: 100%;
    height: 48px;
    border-radius: 15px;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 3px;
    color: #fff;
    background: #3EA4C4;
`;

const PopInput = styled.input`
    font-family: inherit;
    border-radius: 6px;
    height: 10%;
    color: #555;
    offset: none;
    outline-style: none;
    border: none;
    padding: 0px 10px;
    font-size: 14px;
    font-weight: 400;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #3EA4C4;
    width:100%;
    padding: 8px 10px;
    border-radius: 15px;
    height:72%;
    max-height: 400px;
    margin-bottom: 0px;
`;

const SignStyles=styled.form`
    position: relative;
    width:100%;
    height: 500px;
    min-height: 480px;
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

const ButtonsWrapper = styled.div`
    .switch-sign{
        margin-top: 30px;
        font-size: 11px;
        font-weight: 700;
        color: #3EA4C4;
        cursor:pointer;
        &:hover{
            text-decoration:underline;
        }
    }
    @media(max-width:370px){
        .switch-sign{
            font-size: 9.5px;
        }
    }
`;