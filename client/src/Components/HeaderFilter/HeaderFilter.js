import React, {useEffect, useState} from 'react';
import {getAllOrders, getAllOrdersForOrder, getFilteredOrder, getFilteredOrdersForOrder} from "../../http/orderAPI";
import {getAllBrands} from "../../http/productsAPI";
import {getAllShops} from "../../http/shopAPI";
import Button from "../Button/Button";
import styles from './HeaderFilter.module.scss';

const HeaderFilter = ({brandRef, shopRef, setIsFiltered, setButtonText, setOrders}) => {
    const [shopAddresses, setShopAddresses] = useState(null);
    const [brands, setBrands] = useState(null);
    const [showProductsToOrder, setShowProductsToOrder] = useState(false);

    useEffect(() => {
        async function fetchedData() {
            const brands = await getAllBrands();
            const shops = await getAllShops();
            const orders = await getAllOrders();
            setShopAddresses(shops.data);
            setBrands(brands.data);
            setOrders(orders.data)
        }

        fetchedData();
    }, [])

    const handleFilter = async () => {
        const brand_name = brandRef.current.value;
        const address = shopRef.current.value;

        const filteredOrders = showProductsToOrder ?
            await getFilteredOrdersForOrder(brand_name, address)
            :
            await getFilteredOrder(brand_name, address);
        setOrders(filteredOrders.data);
        setIsFiltered(true);

        if (brand_name !== 'all' && address !== 'all') {
            setButtonText(`Завантажити таблицю. Магазин ${address} виробник ${brand_name}`);
        } else if (address === 'all') {
            setButtonText(`Завантажити таблицю. Всі магазини, виробник ${brand_name}`);
        } else {
            setButtonText(`Завантажити таблицю. Всі виробники на магазин ${address}`);
        }
    }

    const ordersByShop = shopAddresses !== null && shopAddresses.map(shop => {
        const {id, address} = shop;
        return (
            <option key={id} value={address}>{address}</option>
        )
    })

    const ordersByBrand = brands !== null && brands.map(brand => {
        const {id, brand_name} = brand;
        return (
            <option key={id} value={brand_name}>{brand_name}</option>
        )
    })

    const showProductsForOrder = async () => {
        const orders = !showProductsToOrder ?
            await getAllOrdersForOrder()
            :
            await getAllOrders();
        setOrders(orders.data)
        setShowProductsToOrder(prevState => !prevState);
    }

    return (
        <>
            <div>
                <span>Виберіть магазин: </span>
                <select className={styles.selectField} onChange={() => handleFilter()} ref={shopRef}>
                    <option value='all'>Всі</option>
                    {ordersByShop}
                </select>
            </div>
            <div>
                <span>Виберіть бренд</span>
                <select className={styles.selectField} onChange={() => handleFilter()} ref={brandRef}>
                    <option value='all'>Всі</option>
                    {ordersByBrand}
                </select>
            </div>
            <Button text={showProductsToOrder ? 'Для відправки' : 'Для замовлення'} onClick={() => showProductsForOrder()}/>
        </>
    );
};

export default HeaderFilter;