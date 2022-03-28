import React, {useEffect, useState} from 'react';
import styles from './OrdersPage.module.scss';
import {getAllRopesBrand} from "../../http/ropesAPI";
import {getAllShops} from "../../http/shopAPI";

const OrdersPage = () => {
    const [shopAddresses, setShopAddresses] = useState(null);
    const [brands, setBrands] = useState(null);


    useEffect( () => {
        async function fetchBrands () {
            const brands = await getAllRopesBrand();
            const shops = await getAllShops();
            setShopAddresses(shops.data);
            setBrands(brands.data);
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


    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Заказы со склада</h1>
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

            </header>
            <main className={styles.body}>

            </main>
        </div>
    );
};

export default OrdersPage;