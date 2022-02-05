import React from 'react';
import Container from "../../Components/Container/Container";
import CreateItemField from "../../Components/CreateItemField/CreateItemField";
import styles from './AddProductsPage.module.scss';

const AddProductsPage = () => {
    return (
        <Container>
            <div className={styles.pageWrapper}>
                <div className={styles.formWrapper}>
                    <div className={styles.orderWrapper}>
                        <CreateItemField/>
                    </div>
                </div>
            </div>
        </Container>

    );
};

export default AddProductsPage;