import { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import { getProducts } from "../../services/Cabecudos";
import Card from "../shared/Card";
import Load from "../shared/Load";
import { PageStyle } from "../shared/styledComponents";


export default function Home () {
    const [products, setProducts] = useState(null)
    const {cart} = useContext(CartContext)

    useEffect (() => {
        listProducts()
    }, [cart])

    function listProducts () {
        getProducts()
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }


    if (!products) {
        return <Load />
    } 

    return (
        <PageStyle>
            {products.map((e) => <Card data={e} key={e.id} />)}
        </PageStyle>
    )
}