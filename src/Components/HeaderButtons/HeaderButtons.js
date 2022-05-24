import React from 'react';
import styles from './HeaderButtons.module.scss';

const HeaderButtons = ({children}) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export default HeaderButtons;