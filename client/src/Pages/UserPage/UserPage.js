import React, {useState} from 'react';
import styles from './UserPage.module.scss';
import {useSelector} from "react-redux";
import {getIsActivated, getShopId, getUserId} from "../../store/User/selectors";
import {getOrderByShop, getOrderByUser} from "../../http/orderAPI";
import Order from "../../Components/Order/Order";
import Button from "../../Components/Button/Button";

const UserPage = () => {
    const isActivated = useSelector(getIsActivated);
    const userId = useSelector(getUserId);
    const shopId = useSelector(getShopId)
    const [orderData, setOrderData] = useState(null);

    const showOrders = orderData !== null && orderData.map(order => {
        const {brandName, order_date, order_id, order_status, orderDetails} = order;
        return (
            <Order brandName={brandName} orderDate={order_date} orderId={order_id} orderStatus={order_status}
                   orderDetails={orderDetails}/>
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
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    Страница пользователя
                    {
                        !isActivated &&
                        <div>
                            please check your gmail to activate account
                        </div>
                    }
                </h1>

                <div className={styles.headerButtons}>
                    <Button text={'Посмотреть мои заказы'} onClick={() => showMyOrders()} />
                    <Button text={'Посмотреть заказы на мой магазин'} onClick={() => showShopOrders()} />
                </div>
            </header>


            <main>
                {showOrders}
            </main>
        </div>
    );
};

export default UserPage;