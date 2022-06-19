import React, {useEffect, useRef, useState} from 'react';
import styles from './ToDeliverPage.module.scss';
import {getAllBrands} from "../../http/productsAPI";
import {getAllShops} from "../../http/shopAPI";
import {getAllOrders, getFilteredOrder} from "../../http/orderAPI";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import SelectInput from "../../Components/SelectInput/SelectInput";
import OrderTable from "../../Components/OrderTable/OrderTable";

const ToDeliverPage = () => {
    const [shopAddresses, setShopAddresses] = useState(null);
    const [brands, setBrands] = useState(null);
    const [orders, setOrders] = useState(null);
    const shopRef = useRef();
    const brandRef = useRef();

    useEffect(() => {
        async function fetchBrands() {
            const brands = await getAllBrands();
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
            <option key={id} value={id}>{address}</option>
        )
    })

    const ordersByBrand = brands !== null && brands.map(brand => {
        const {id, brand_name} = brand;
        return (
            <option key={id} value={id}>{brand_name}</option>
        )
    })

    const handleFilter = async () => {
        const brand_id = brandRef.current.value;
        const shop_id = shopRef.current.value;
        const filteredOrders = await getFilteredOrder(brand_id, shop_id)
        setOrders(filteredOrders.data)
    }

    return (
        <div className={styles.pageContainer}>
            <HeaderButtons>
                <div>
                    <span>Виберіть магазин: </span>
                    <select className={styles.selectField} onChange={() => handleFilter()} ref={shopRef}>
                        <option value='all'>Всі</option>
                        {ordersByShop}
                    </select>
                </div>
                <div>
                    <span>Виберіть бренд</span>
                    <select className={styles.selectField} onChange={() => handleFilter()} ref={brandRef}>
                        <option value='all'>Всі</option>
                        {ordersByBrand}
                    </select>
                </div>
            </HeaderButtons>

            <main className={styles.body}>
                <OrderTable orders={orders} forManager={true} forOrder={false}/>
            </main>
        </div>

    );
};

export default ToDeliverPage;