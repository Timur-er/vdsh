import React from 'react';
import styles from './SelectInput.module.scss';

const SelectInput = ({children}) => {
    return (
        <select className={styles.selectField} name="" id="">
            {children}
        </select>
    );
};

export default SelectInput;