import React from 'react';
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <div>
            <div className={styles.header}>
                <div>order</div>
                <div>check order</div>
                <div>order3</div>
                <div>order4</div>
            </div>
        </div>
    );
};

export default Header;