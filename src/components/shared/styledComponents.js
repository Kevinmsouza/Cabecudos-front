import styled from "styled-components";

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
`;

export { 
    PageStyle,
    CardButtom,
};
