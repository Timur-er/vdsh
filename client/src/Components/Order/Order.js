import React, {useRef, useState} from 'react';
import OrderTable from "../OrderTable/OrderTable";
import Button from "../Button/Button";
import {getExcelByOrderId} from "../../http/orderAPI";
import styles from './Order.module.scss';

const Order = ({orderStatus, orderDetails, brandName, orderId, orderDate, shopAddress}) => {
    const [isOrderOpen, serIsOrderOpen] = useState(false);
    const [height, setHeight] = useState('0px');
    const orderData = useRef();


    const openDescription = () => {
        serIsOrderOpen(!isOrderOpen);
        setHeight(isOrderOpen ? '0px' : `${orderData.current.scrollHeight}px`)
    }

    const getTable = async () => {
        const data = await getExcelByOrderId(orderId);
    }

    return (
        <div className={styles.orderWrapper}>
            <div className={styles.orderDetails}>
                <div>
                    <span>Заказ номер: </span>
                    <span>{orderId}</span>
                </div>

                <div>
                    <span>Бренд: </span>
                    <span>{brandName}</span>
                </div>

                <div>
                    <span>Магазин: </span>
                    <span>{shopAddress}</span>
                </div>

                <div>
                    <span>Дата заказа: </span>
                    <span>{orderDate}</span>
                </div>

                <div>
                    <span>Статус заказа: </span>
                    <span>{orderStatus}</span>
                </div>
            </div>

            <div style={{height: `${height}`}} ref={orderData} className={styles.order}>
                <OrderTable orderDetails={orderDetails}/>
            </div>

            <div className={styles.buttonBlock}>
                <Button onClick={() => openDescription()} text={isOrderOpen ? 'Скрыть заказ' : 'Посмотреть заказ'} type={'detailsBtn'} />
                <Button onClick={() => getTable()} text={'Скачать таблицу'} type={'detailsBtn'}/>
            </div>

        </div>
    );
};

export default Order;