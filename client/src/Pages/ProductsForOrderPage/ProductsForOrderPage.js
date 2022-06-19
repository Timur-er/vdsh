import React, {useEffect, useState} from 'react';
import styles from './ProductsForOrderPage.module.scss';
import {getAllOrdersForOrder, getProductsForOrderByBrand} from "../../http/orderAPI";
import Button from "../../Components/Button/Button";
import Order from "../../Components/Order/Order";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import OrderTable from "../../Components/OrderTable/OrderTable";

const ProductsForOrderPage = () => {
    const [orders, setOrders] = useState(null);

    useEffect(async () => {
        const fetchedOrders = await getAllOrdersForOrder();
        setOrders(fetchedOrders.data)
    }, [])

    const getOrders = async () => {
        const orders = await getProductsForOrderByBrand();
        setOrders(orders.data)
    }



    const renderOrder = orders !== null && orders.map(order => {
        const {id, brand_name, order_details, order_status, order_date} = order;
        return (
            <Order brandName={brand_name} orderDetails={order_details} orderId={id} orderDate={order_date} orderStatus={order_status} />
        )
    })

    return (
        <div className={styles.pageContainer}>
            <HeaderButtons>
                <Button onClick={() => getOrders()} text={'Закази по брендам'} />
            </HeaderButtons>
            <main>
                {/*{renderOrder}*/}
                <OrderTable orders={orders} forManager={true} forOrder={true}/>
            </main>
        </div>
    );
};

export default ProductsForOrderPage;