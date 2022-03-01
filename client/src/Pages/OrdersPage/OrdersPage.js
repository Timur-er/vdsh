import React from 'react';
import styles from './OrdersPage.module.scss';
import Button from "../../Components/Button/Button";

const OrdersPage = () => {

    const ordersByShop = () => {
        console.log('check shop orders')
    }

    const orderByBrand = () => {
        console.log('check brand orders');
    }

    return (
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <h1 className={styles.title}>Заказы со склада</h1>
                <div className={styles.headerButtons}>
                    <Button text={'Shop Orders'} onClick={() => ordersByShop()} />
                    <Button text={'Brand Orders'} onClick={() => orderByBrand()} />
                </div>

            </header>
            <main className={styles.body}>

            </main>
        </div>
    );
};

export default OrdersPage;