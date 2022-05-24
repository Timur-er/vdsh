import React from 'react';
import styles from './AddBrand.module.scss';

const AddBrand = () => {
    return (
        <div className={styles.addBrandWrapper}>
            <input type="text"/>
            <button>Додати бренд</button>
        </div>
    );
};

export default AddBrand;