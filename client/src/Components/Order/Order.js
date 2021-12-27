import React from 'react';
import OrderField from "../OrderField/OrderField";
import styles from './Order.module.scss';

const Order = () => {
    return (
        <div className={styles.order}>
                <div className={styles.orderWrapper}>
                    <OrderField />
                </div>
        </div>
    );
};

export default Order;