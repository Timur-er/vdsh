import React, {useEffect, useState} from 'react';
import styles from './UserPage.module.scss';
import {useSelector} from "react-redux";
import {getShopId, getUserId} from "../../store/User/selectors";
import {getOrderByShop, getOrderByUser} from "../../http/orderAPI";
import Button from "../../Components/Button/Button";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import OrderTable from "../../Components/OrderTable/OrderTable";

const UserPage = () => {
    const userId = useSelector(getUserId);
    const shopId = useSelector(getShopId)
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        async function fetchData () {
            return await getOrderByUser(userId);
        }
        fetchData().then(data => setOrderData(data.data))
    }, [])

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

            <HeaderButtons>
                <Button text={'Мої замовлення'} onClick={() => showMyOrders()} />
                <Button text={'Закази на мій магазин'} onClick={() => showShopOrders()} />
            </HeaderButtons>

            <main className={styles.body}>
                <OrderTable orders={orderData} forOrder={false}/>
            </main>
        </div>
    );
};

export default UserPage;