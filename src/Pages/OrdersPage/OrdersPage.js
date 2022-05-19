import React, {useEffect, useState} from 'react';
import styles from './OrdersPage.module.scss';
import {getAllRopesBrand} from "../../http/ropesAPI";
import {getAllShops} from "../../http/shopAPI";
import Header from "../../Components/Header/Header";
import {getAllOrders} from "../../http/orderAPI";
import Order from "../../Components/Order/Order";

const OrdersPage = () => {
    const [shopAddresses, setShopAddresses] = useState(null);
    const [brands, setBrands] = useState(null);
    const [orders, setOrders] = useState(null);


    useEffect( () => {
        async function fetchBrands () {
            const brands = await getAllRopesBrand();
            const shops = await getAllShops();
            const orders = await getAllOrders();
            setShopAddresses(shops.data);
            setBrands(brands.data);
            setOrders(orders.data);
        }
        fetchBrands();
    }, [])


    const ordersByShop = shopAddresses !== null && shopAddresses.map(shop => {
        const {id, address} = shop;
        return (
            <option key={id} value={address}>{address}</option>
        )
    })

    const orderByBrand = brands !== null && brands.map(brand => {
        const {id, brandName} = brand;
        return (
            <option key={id} value={brandName}>{brandName}</option>
        )
    })

    const showOrders = orders !== null && orders.map(order => {
        console.log('order');
        console.log(order);
        const {brandName, order_date, order_id, order_status, orderDetails, shop_address} = order;
        return (
            <Order brandName={brandName} orderDate={order_date} orderId={order_id} orderStatus={order_status} shop_address={shop_address}
                   orderDetails={orderDetails}/>
        )
    })
    return (
        <div className={styles.pageContainer}>
            {/*<header className={styles.header}>*/}
            {/*    <h1 className={styles.title}>Заказы со склада</h1>*/}
            {/*</header>*/}
            <Header title={'Заказы со склада'}/>


            <div className={styles.headerButtons}>
                <div>
                    <span>Выберете магазин: </span>
                    <select name="" id="">
                        {ordersByShop}
                    </select>
                </div>
                <div>
                    <span>select brand</span>
                    <select name="" id="">
                        {orderByBrand}
                    </select>
                </div>
            </div>

            <main className={styles.body}>
                {showOrders}
            </main>
        </div>
    );
};

export default OrdersPage;