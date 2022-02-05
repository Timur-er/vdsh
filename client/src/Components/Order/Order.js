import React, {useRef, useState} from 'react';
import styles from './Order.module.scss';
import OrderTable from "../OrderTable/OrderTable";

const Order = ({orderStatus, orderDetails, brandName, orderId, orderDate}) => {
    const [isOrderOpen, serIsOrderOpen] = useState(false);
    const [height, setHeight] = useState('0px');
    const orderData = useRef();


    const openDescription = () => {
        serIsOrderOpen(!isOrderOpen);
        setHeight(isOrderOpen ? '0px' : `${orderData.current.scrollHeight}px`)
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

            <div>
                <button onClick={openDescription}>
                    {isOrderOpen ? 'Скрыть заказ' : 'Посмотреть заказ'}
                </button>
            </div>

        </div>
    );
};

export default Order;