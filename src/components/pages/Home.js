import { useEffect, useState } from "react";
import { getProducts } from "../../services/Cabecudos";
import Card from "../shared/Card";
import { PageStyle } from "../shared/styledComponents";


export default function Home () {
    const [products, setProducts] = useState(null)

    useEffect (() => {
        listProducts()
    }, [])

    function listProducts () {
        getProducts()
            .then(res => setProducts(res.data))
            .catch(err => console.log(err))
    }


    if (!products) return 'loading...'

    return (
        <PageStyle>
            {products.map((e) => <Card data={e} key={e.id} />)}
        </PageStyle>
    )
}