import React from 'react';
import styles from './OrderDetailsTable.module.scss';
import Button from "../Button/Button";

const OrderDetailsTable = ({orderDetails}) => {

    const renderRows = orderDetails !== null && orderDetails.map(details => {
        const {color_id, quantity} = details;
        return (
            <tr>
                <td className={styles.table__cell}>{color_id}</td>
                <td className={styles.table__cell}>{quantity}</td>
            </tr>
        )
    })
    return (
        <div>
            {/*<Button text={}/>*/}
            <table className={styles.table}>
                <thead>
                <th className={styles.table__headerCell}>Color</th>
                <th className={styles.table__headerCell}>Quantity</th>
                </thead>
                <tbody className={styles.table__body}>
                {renderRows}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailsTable;