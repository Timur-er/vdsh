import React from 'react';
import styles from './OrderDetailsTable.module.scss';
import Button from "../Button/Button";
import ChangeStatusSelect from "../ChangeStatusSelect/ChangeStatusSelect";

const OrderDetailsTable = ({orderDetails}) => {

    const renderRows = orderDetails !== null && orderDetails.map(details => {
        const {color_id, quantity} = details;
        return (
            <tr key={color_id}>
                <td className={styles.table__cell}>{color_id}</td>
                <td className={styles.table__cell}>{quantity}</td>
            </tr>
        )
    })
    return (
        <div>
            <table className={styles.table}>
                <thead>
                <tr className={styles.table__headerCell}>
                    <th>Color</th>
                    <th>Quantity</th>
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