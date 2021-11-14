import styled from "styled-components"
import { useEffect } from "react";
import { getOrders } from "../../services/Cabecudos";
import { useContext, useState } from "react/cjs/react.development";
import UserContext from "../../contexts/UserContext";
import OrderCard from "../shared/OrderCard";
import { Link } from "react-router-dom";

export default function History() {
    const {user} = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [pageLoad, setPageLoad] = useState(true);

    useEffect(() => {
        getOrders(user.token, user.id)
        .then(res => {
            setOrders(res.data);
            setPageLoad(false);
        })
        .catch(err => {
            console.log(err);
            setPageLoad(false);
        })
    }, [user.id, user.token])

    if (pageLoad) return <PageStyle>Loading...</PageStyle>

    return (
        <PageStyle>
            <Title>Meus pedidos</Title>
            {orders.length ?
                orders.map(order => <OrderCard order={order} key={order.id}/>) :
                user.token ? 
                <EmptyMsg>Você ainda não possui nenhuma compra, clique <Link to="/">aqui</Link> para ver nossos produtos :)</EmptyMsg> :
                <EmptyMsg>
                    Você precisa estar logado para ver seus pedidos, clique <Link to="/sign-in">aqui</Link> para logar, 
                    ou <Link to="/sign-up">aqui</Link> para se cadastrar, caso ainda não seja cliente :)
                </EmptyMsg>
            }
        </PageStyle>
    );
}

const EmptyMsg = styled.p`
    text-align: center;
    line-height: 20px;
    width: 280px;
    margin-top: 200px;
`;

const Title = styled.p`
    font-weight: 700;
    font-size: 25px;
`;

const PageStyle = styled.article`
    margin: 65px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    flex-direction: column;
`;