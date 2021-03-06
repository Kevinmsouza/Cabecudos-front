import styled from "styled-components"
import { useEffect } from "react";
import { getOrders } from "../../services/Cabecudos";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import OrderCard from "../shared/OrderCard";
import { Link } from "react-router-dom";
import Load from "../shared/Load";
import Footer from "../Footer";

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

    if (pageLoad) {
        return <Load />
    } 

    return (
        <>
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
            <Footer />
        </>
    );
}

const EmptyMsg = styled.p`
    text-align: center;
    line-height: 20px;
    width: 280px;
    margin-top: 200px;
    & a {
        color: #00A4C5;
    }
`;

const Title = styled.p`
    font-weight: 700;
    font-size: 25px;
`;

const PageStyle = styled.article`
    margin: 85px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    flex-direction: column;
    min-height: calc(100vh - 320px);
`;