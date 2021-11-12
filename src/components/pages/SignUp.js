import { useState } from "react";
import { useHistory } from "react-router";
import { SignContainer, FormLogo, InputWrapper, ButtonsWrapper, PopInput, PopButton  } from "../shared/styledComponents.js";
import { sendUserData } from "../../services/Cabecudos.js";
import { sendAlert } from "../shared/Alerts.js";
import Logo from '../../assets/logo2.png';
import styled from "styled-components";

export default function SignUp() {

    const [ data, setData ] = useState({ name:"", phone:"", cpf:"", birthdate:"", imageUrl:"" , email:"", password:"", });
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ requesting, setRequesting ]= useState(false);
    const [ birthdateInputType, setBirthdateInputType ] = useState('text');
    const history = useHistory();

    function register(e) {
        e.preventDefault();
        if( !data.name || !data.password || !data.cpf || !confirmPassword || !data.email ) return sendAlert('error', 'Oops!', 'Preencha os campos obrigatórios!');
        const { cpf, password, } = data;
        let trimmedCpf = cpf.replace(/[-|.]/g,'');
        if (password !== confirmPassword) {
            setData({ ...data, password:"", });
            setConfirmPassword("");
            return sendAlert('error', '', "As senhas devem ser iguais!");
        }
        if (trimmedCpf.length !== 11) return sendAlert('error', 'Oops!', "CPF deve ter 11 dígitos");
        setRequesting(true);
        sendUserData({ ...data, cpf: trimmedCpf })
        .then(answer => {
            console.log(answer.data);
            setRequesting(false);
            setData({ name:"", phone:"", cpf:"", birthdate:"", imageUrl:"", email:"", password:"", });
            setConfirmPassword("");
            sendAlert('success', 'Oba!', "Cadastro concluído!");
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