import React from 'react';
import CreateItemField from "../CreateItemField/CreateItemField";
import styles from './CreateItem.module.scss';

const CreateItem = () => {
    return (
        <div className={styles.order}>
            <div className={styles.orderWrapper}>
                <CreateItemField/>
            </div>
        </div>
    );
};

export default CreateItem;