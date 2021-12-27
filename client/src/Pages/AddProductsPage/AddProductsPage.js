import React from 'react';
import Container from "../../Components/Container/Container";
import OrderField from "../../Components/OrderField/OrderField";
import styles from './AddProductsPage.module.scss';

const AddProductsPage = () => {
    return (
        <Container>
            <div className={styles.pageWrapper}>
                <div className={styles.formWrapper}>
                    <div className={styles.orderWrapper}>
                        <OrderField/>
                    </div>
                </div>
            </div>
        </Container>

    );
};

export default AddProductsPage;