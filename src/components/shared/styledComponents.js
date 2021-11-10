import styled from "styled-components";

const SignContainer = styled.div`
    padding: 0 18px;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FormLogo = styled.div`
    position: absolute;
    z-index: 10;
    top:0;
    right:0;
    width:100%;
    font-family: 'Luckiest Guy', cursive;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 24px;
    img{
        width: 70px;
    }
    p{
        font-size: 34px;
        color: #333;
    }
`

export { SignContainer, FormLogo };
