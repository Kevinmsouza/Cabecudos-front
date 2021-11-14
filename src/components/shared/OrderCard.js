import styled from "styled-components";

export default function OrderCard({order}) {
    const {
        address,
        comp,
        date,
        id,
        total_price
    } = order;
    const formattedDate = date.split('T')[0].split('-')[2] + '/' + date.split('T')[0].split('-')[1] + '/' + date.split('T')[0].split('-')[0];
    return (
        <Wrapper>
            <InfoLine>Pedido #{id}</InfoLine>
            <InfoLine>Data: <span>{formattedDate}</span></InfoLine>
            <InfoLine>Endereço de entrega: <span>{address}, {comp === '(Sem complemento)' ? "" : comp}</span></InfoLine>
            <InfoLine>Valor total: <span>R$ {(total_price/100).toFixed(2)}</span></InfoLine>
        </Wrapper>
    );
}

const InfoLine = styled.p`
    font-size: 15px;
    line-height: 20px;
    :nth-child(1) {
        font-weight: 700;
        font-size: 18px;
    }
    :nth-child(2) {
        span {
            font-weight: 300;
        }
    }
    :nth-child(3) {
        span {
            font-weight: 300;
        }
    }
    :nth-child(4) {
        span {
            font-weight: 500;
            letter-spacing: 0.5px;
        }
    }
`;

const Wrapper = styled.div`
    width: calc(100% - 36px);
    max-width: 500px;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.15);
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;