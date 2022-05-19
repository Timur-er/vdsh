import React from 'react';
import CreateItemField from "../../Components/CreateItemField/CreateItemField";
import styles from './AddProductsPage.module.scss';
import Header from "../../Components/Header/Header";
import Loader from "../../Components/Loader/Loader";

const AddProductsPage = () => {
    return (
        <div className={styles.pageContainer}>
            <Header title={'Добавить товар в базу'}/>
            {/*<header className={styles.header}><h1 className={styles.title}>Добавить товар в базу</h1></header>*/}
            <main className={styles.body}>
            <CreateItemField/>
            </main>
        </div>

    );
};

export default AddProductsPage;