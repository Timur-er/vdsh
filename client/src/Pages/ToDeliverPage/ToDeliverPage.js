import React, {useRef, useState} from 'react';
import { getFilteredExcel } from "../../http/orderAPI";
import HeaderButtons from "../../Components/HeaderButtons/HeaderButtons";
import OrderTable from "../../Components/OrderTable/OrderTable";
import Button from "../../Components/Button/Button";
import HeaderFilter from "../../Components/HeaderFilter/HeaderFilter";
import styles from './ToDeliverPage.module.scss';

const ToDeliverPage = () => {
    const [orders, setOrders] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [buttonText, setButtonText] = useState(null);
    const shopRef = useRef();
    const brandRef = useRef();

    const downloadFilteredExcel = async () => {
        await getFilteredExcel(shopRef.current.value, brandRef.current.value)
    }

    return (
        <div className={styles.pageContainer}>
            <HeaderButtons>

                <HeaderFilter
                    brandRef={brandRef}
                    shopRef={shopRef}
                    setButtonText={setButtonText}
                    setOrders={setOrders}
                    setIsFiltered={setIsFiltered}
                    />

            </HeaderButtons>

            <main className={styles.body}>
                <OrderTable orders={orders} forManager={true} forOrder={false}/>
                {
                    isFiltered && orders.length !== 0 &&
                    <Button text={buttonText} onClick={() => downloadFilteredExcel()}/>
                }
            </main>
        </div>

    );
};

export default ToDeliverPage;