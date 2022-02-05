import React, {useEffect, useState} from 'react';
import Container from "../../Components/Container/Container";
import styles from './UserPage.module.scss';
import {useSelector} from "react-redux";
import {getIsActivated, getShopId, getUserId} from "../../store/User/selectors";
import {getOrderByShop, getOrderByUser} from "../../http/orderAPI";
import Order from "../../Components/Order/Order";

const UserPage = () => {
    const isActivated = useSelector(getIsActivated);
    const userId = useSelector(getUserId);
    const shopId = useSelector(getShopId)
    const [orderData, setOrderData] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);
    const [orders, setOrders] = useState(null);


    useEffect(async () => {

    }, [])


    const showOrders = orderData !== null && orderData.map(order => {
        // поменять все переменные которые приходят с сервера на нижние подчеркивание;
        const {brandName, order_date, order_id, order_status, orderDetails} = order;
        return (
            <Order brandName={brandName} orderDate={order_date} orderId={order_id} orderStatus={order_status} orderDetails={orderDetails}/>
        )
    })

    const showMyOrders = async () => {
        const orderData = await getOrderByUser(userId);
        setOrderData(orderData.data)
    }

    const showShopOrders = async () => {
        const orderData = await getOrderByShop(shopId);
        setOrderData(orderData.data)
    }

    return (
        <Container>
            <h1>
                user page
                {
                    !isActivated &&
                        <div>
                            please check your gmail to activate account
                        </div>
                }
            </h1>

            <div className={styles.buttonBlock}>
                <button onClick={() => showMyOrders()} className={styles.button}>Посмотреть мои заказы</button>
                <button onClick={() => showShopOrders()} className={styles.button}>Посмотреть заказы на мой магазин</button>
            </div>

            {showOrders}
        </Container>
    );
};

export default UserPage;