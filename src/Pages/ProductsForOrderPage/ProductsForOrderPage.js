import React, {useEffect, useState} from 'react';
import styles from './ProductsForOrderPage.module.scss';
import {getAllOrdersForOrder, getProductsForOrderByBrand} from "../../http/orderAPI";
import Button from "../../Components/Button/Button";
import Order from "../../Components/Order/Order";
import Header from "../../Components/Header/Header";

const ProductsForOrderPage = () => {
    const [orders, setOrders] = useState(null);

    useEffect(async () => {
        const fetchedOrders = await getAllOrdersForOrder();
        setOrders(fetchedOrders.data)
        console.log(fetchedOrders.data);
    }, [])

    const getOrders = async () => {
        const orders = await getProductsForOrderByBrand();
        setOrders(orders.data)
        console.log(orders.data);
    }



    const renderOrder = orders !== null && orders.map(order => {
        const {id, brand_name, order_details, order_status, order_date} = order;
        return (
            <Order brandName={brand_name} orderDetails={order_details} orderId={id} orderDate={order_date} orderStatus={order_status} />
        )
    })

    return (
        <div className={styles.pageContainer}>
            <Header title={'Товары для заказа на склад'}/>

            {/*<header className={styles.header}>*/}
            {/*    <h1 className={styles.title}>Товары для заказа на склад</h1>*/}
            {/*   */}
            {/*</header>*/}

            <div>
                <Button onClick={() => getOrders()} text={'Заказы по брендам'} />
            </div>

            <main>
                {renderOrder}
            </main>
        </div>
    );
};

export default ProductsForOrderPage;