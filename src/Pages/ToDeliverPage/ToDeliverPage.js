import React, {useEffect, useState} from 'react';
import styles from './ToDeliverPage.module.scss';
import {getAllRopesBrand} from "../../http/ropesAPI";
import {getAllShops} from "../../http/shopAPI";
import Header from "../../Components/Header/Header";
import {getAllOrders} from "../../http/orderAPI";
import Order from "../../Components/Order/Order";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import SelectInput from "../../Components/SelectInput/SelectInput";
import OrderTable from "../../Components/OrderTable/OrderTable";
import Modal from "../../Components/Modal/Modal";
import {useDispatch} from "react-redux";
import {setOrders} from "../../store/Orders/actions";

const ToDeliverPage = () => {
    const [shopAddresses, setShopAddresses] = useState(null);
    const [brands, setBrands] = useState(null);
    // const [orders, setOrders] = useState(null);
    const dispatch = useDispatch()

    useEffect( () => {
        async function fetchBrands () {
            const brands = await getAllRopesBrand();
            const shops = await getAllShops();
            const orders = await getAllOrders();
            dispatch(setOrders(orders.data))
            setShopAddresses(shops.data);
            setBrands(brands.data);
            // setOrders(orders.data);
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

    // const showOrders = orders !== null && orders.map(order => {
    //     const {brandName, order_date, order_id, order_status, orderDetails, shop_address} = order;
    //     return (
    //         <Order brandName={brandName} orderDate={order_date} orderId={order_id} orderStatus={order_status} shop_address={shop_address}
    //                orderDetails={orderDetails}/>
    //     )
    // })
    return (
        <div className={styles.pageContainer}>
            <HeaderButtons>
                <div>
                    <span>Виберіть магазин: </span>
                    <SelectInput>
                        {ordersByShop}
                    </SelectInput>
                </div>
                <div>
                    <span>Виберіть бренд</span>
                    <SelectInput>
                        {orderByBrand}
                    </SelectInput>
                </div>
            </HeaderButtons>
            {/*брать данные в таблицу и в модалку со стора*/}

            <main className={styles.body}>
                {/*{showOrders}*/}
                {/*<OrderTable orders={orders} forManager={true}/>*/}
            </main>
        </div>

    );
};

export default ToDeliverPage;