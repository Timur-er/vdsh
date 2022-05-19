import React from 'react';
import styles from './OrderTable.module.scss';

const OrderTable = ({orderDetails}) => {
    const showOrderDetails = orderDetails && orderDetails.map(order => {
        const {color_id, quantity} = order;
        return (
            <div className={styles.tableRow}>
                <div className={styles.tableCell}>
                    <span>{quantity}</span>
                </div>

                <div className={styles.tableCell}>
                    <span>{color_id}</span>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.orderTable}>
            <div className={styles.tableHeader}>
                <div className={styles.tableCell}>
                    <span>Количество</span>
                </div>
                <div className={styles.tableCell}>
                    <span>Номер цвета</span>
                </div>
            </div>

            {showOrderDetails}
        </div>
    );
};

export default OrderTable;