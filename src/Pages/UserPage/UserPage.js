import React, {useEffect, useState} from 'react';
import styles from './UserPage.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getIsActivated, getShopId, getUserId} from "../../store/User/selectors";
import {getOrderByShop, getOrderByUser} from "../../http/orderAPI";
import Order from "../../Components/Order/Order";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import OrderTable from "../../Components/OrderTable/OrderTable";
import {openPopup} from "../../store/Popup/actions";

const UserPage = () => {
    const dispatch = useDispatch();
    const isActivated = useSelector(getIsActivated);
    const userId = useSelector(getUserId);
    const shopId = useSelector(getShopId)
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        async function fetchData () {
            return await getOrderByUser(userId);
        }
        fetchData().then(data => setOrderData(data.data))
    }, [])

    const showOrders = orderData !== null && orderData.map(order => {
        const {brand_name, order_date, order_id, order_status, orderDetails} = order;
        return (
            <Order brandName={brand_name} orderDate={order_date} orderId={order_id} orderStatus={order_status}
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

            <HeaderButtons>
                <Button text={'Мої замовлення'} onClick={() => showMyOrders()} />
                <Button text={'Закази на мій магазин'} onClick={() => showShopOrders()} />
            </HeaderButtons>

            <main className={styles.body}>
                {/*показывать мои заказы сразу*/}
                {/*{showOrders}*/}
                <OrderTable orders={orderData} forOrder={false}/>
            </main>
        </div>
    );
};

export default UserPage;