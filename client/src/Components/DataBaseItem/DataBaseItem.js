import React from 'react';
import Icons from "../Icons/Icons";
import styles from './DataBaseItem.module.scss';


const DataBaseItem = ({color_id, quantity, open_modal}) => {
    return (
        <>
            <div className={styles.item}>
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