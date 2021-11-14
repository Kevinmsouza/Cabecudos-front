import { PageStyle } from "../shared/styledComponents";
import styled from "styled-components"

export default function History() {
    return (
        <PageStyle>
            <Title>Histórico de pedidos</Title>
            <Wrapper>oi</Wrapper>
        </PageStyle>
    );
}

const Title = styled.p`
    font-weight: 700;
    font-size: 20px;
`;

const Wrapper = styled.div`
    width: calc(100% - 36px);
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
`;