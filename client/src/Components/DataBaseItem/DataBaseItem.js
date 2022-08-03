import React, {useState} from 'react';
import Icons from "../Icons/Icons";
import styles from './DataBaseItem.module.scss';


const DataBaseItem = ({color_id, quantity, open_modal}) => {

    let itemClass = '';

    if (quantity <= 0) {
        itemClass = `${styles.item__unavailable} ${styles.item}`
    } else if (quantity < 20 && quantity > 0) {
        itemClass = `${styles.item__need_to_order} ${styles.item}`
    } else {
        itemClass = `${styles.item}`
    }

    const needToOrder = quantity < 20 ? `${styles.item__need_to_order} ${styles.item}` : `${styles.item}`
    const unavailable = quantity <= 0 ? `${styles.item__unavailable} ${styles.item}` : `${styles.item}`

    return (
        <>
            <div className={itemClass}>
                <div className={styles.item__cell}>
                    <span>
                        {color_id}
                    </span>
                </div>
                <div className={styles.item__cell}>
                    <span>
                    {quantity}
                </span>
                </div>
                <div>
                    <Icons type='pencilIcon' width='20' height='20' color='#6495EDFF' click={() => open_modal(color_id, quantity)}/>
                </div>
            </div>
        </>
    );
};

export default DataBaseItem;