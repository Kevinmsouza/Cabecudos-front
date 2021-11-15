import styled from "styled-components";

const SignContainer = styled.div`
    overflow: scroll;
    padding: 0px 18px 24px 18px;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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
    background: ${props => props.disabled ? '#ddd' : '#fff' };
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
    min-width: 100%;
    max-width: 285px;
    text-align: center;
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
    }
`;

const PageStyle = styled.article`
    margin: 65px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
`;

const CardButtom = styled.button`
    width: 250px;
    height: 50px;
    background-color: #3EA4C4;
    color: #fff;
    border-radius: 15px;
    border: none;
    font-weight: bold;
    font-size: 18px;
    line-height: 27px;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    &:disabled {
        background-color: lightgrey;
        cursor: initial;
    }
`;

export { 
    PageStyle,
    CardButtom,
    FormLogo,
    SignContainer,
    SignStyles,
    PopInput,
    PopButton,
    InputWrapper,
    ButtonsWrapper,
};