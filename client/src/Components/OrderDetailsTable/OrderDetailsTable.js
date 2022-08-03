import React from 'react';
import styles from './OrderDetailsTable.module.scss';

const OrderDetailsTable = ({orderDetails}) => {

    const renderRows = orderDetails !== null && orderDetails.map(details => {
        const {color_id, quantity, is_available} = details;
        const className = is_available ? styles.table__cell : `${styles.table__cell} ${styles.unavailableProduct}`
        return (
            <tr key={color_id}>
                <td className={className}>{color_id}</td>
                <td className={className}>{quantity}</td>
            </tr>
        )
    })

    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr className={styles.table__headerCell}>
                    <th>Колір</th>
                    <th>Кількість</th>
                </tr>
                </thead>
                <tbody className={styles.table__body}>
                {renderRows}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailsTable;