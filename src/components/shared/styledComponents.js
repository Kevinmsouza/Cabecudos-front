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
    &:disabled {
        background-color: lightgrey;
    }
`;

export { 
    PageStyle,
    CardButtom,
    SignContainer,
    FormLogo,
};