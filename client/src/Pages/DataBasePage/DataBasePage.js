import React, {useEffect, useRef, useState} from 'react';
import {changeProductInfo, getAllBrands, getProductsByBrand} from "../../http/productsAPI";
import Button from "../../Components/Button/Button";
import AsideFilter from "../../Components/AsideFilter/AsideFilter";
import DataBaseItem from "../../Components/DataBaseItem/DataBaseItem";
import {useDispatch, useSelector} from "react-redux";
import {getIsModalOpen} from "../../store/modal/selectors";
import Modal from "../../Components/Modal/Modal";
import {openModal} from "../../store/modal/actions";
import {openPopup} from "../../store/Popup/actions";
import styles from './DataBasePage.module.scss';

const DataBasePage = () => {
    const isModalOpen = useSelector(getIsModalOpen);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState(null);
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [isDataChange, setIsDataChange] = useState({productId: false, quantity: false});
    const [brandId, setBrandId] = useState(null);
    const dispatch = useDispatch();
    const idRef = useRef();
    const quantityRef = useRef();


    useEffect(() => {
        async function fetchedBrands() {
            const brands = await getAllBrands();
            return brands.data;
        }

        fetchedBrands().then(data => setBrands(data));
    }, [])

    const getFilteredProducts = (data) => {
        setProducts(data)
    }

    const handleModalForChanges = (color_id, quantity) => {
        quantity = String(quantity);
        setProductId({defaultValue: color_id, value: color_id});
        setQuantity({defaultValue: quantity, value: quantity});
        dispatch(openModal(true));

    }

    const renderProductItems = products !== null && products.map(product => {
        const {color_id, quantity, id} = product;
        return <DataBaseItem
            color_id={color_id}
            quantity={quantity}
            key={id}
            open_modal={handleModalForChanges}
        />
    })

    const handleQuantityInput = () => {
        const inputValue = quantityRef.current.value;
        setQuantity((prevState) => ({...prevState, value: inputValue}))
        setIsDataChange((prevState) => (
                {
                    ...prevState,
                    quantity: quantity.defaultValue !== inputValue
                }
            )
        )
    }

    const handleIdInput = () => {
        const inputValue = idRef.current.value;
        setProductId((prevState) => ({...prevState, value: inputValue}))
        setIsDataChange((prevState) => (
                {
                    ...prevState,
                    productId: productId.defaultValue !== inputValue
                }
            )
        )
    }

    const showConfirmMessage = () => {
        if (isDataChange.productId && !isDataChange.quantity) {
            return <div>Змінити <span className={styles.modal__prevValue}>{productId.defaultValue}</span> на <span className={styles.modal__newValue}>{productId.value}</span></div>
        } else if (isDataChange.quantity && !isDataChange.productId) {
            return <div>Змінити <span className={styles.modal__prevValue}>{quantity.defaultValue}</span> на <span className={styles.modal__newValue}>{quantity.value}</span></div>
        } else if (isDataChange.productId && isDataChange.quantity) {
            return <div>Змінити <span className={styles.modal__prevValue}>{productId.defaultValue}</span> на <span className={styles.modal__newValue}>{productId.value} </span>
                 та <span className={styles.modal__prevValue}>{quantity.defaultValue}</span> на <span className={styles.modal__newValue}>{quantity.value}</span></div>
        } else {
            return null
        }
    }

    const confirmChanges = async () => {
        const newProductId = productId.value;
        const newQuantity = quantity.value;
        const response = await changeProductInfo(productId.defaultValue, newProductId, newQuantity, brandId);
        const newProducts = await getProductsByBrand(brandId);
        setProducts(newProducts.data)
        dispatch(openPopup(response.data, false))
        dispatch(openModal(false));

    }

    return (
        <>
            <main className={styles.main}>
                <div className={styles.filtered}>
                    {renderProductItems}
                </div>
                <div className={styles.filter}>
                    <AsideFilter brands={brands} getFilteredProducts={getFilteredProducts} setBrandId={setBrandId}/>
                </div>
            </main>
            {
                isModalOpen &&
                <Modal>
                    <div className={styles.modal__wrapper}>
                        <div className={styles.modal__inputsWrapper}>
                            <div className={styles.modal__field}>
                                <label>id</label>
                                <input className={styles.modal__input} ref={idRef} onChange={handleIdInput} type="text" placeholder='Create changes'
                                       value={productId.value}/>
                            </div>
                            <div className={styles.modal__field}>
                                <label>кількість</label>
                                <input className={styles.modal__input} ref={quantityRef} onChange={handleQuantityInput} type="text"
                                       placeholder='Create changes' value={quantity.value}/>
                            </div>
                        </div>
                        {showConfirmMessage()}
                        {
                            (isDataChange.productId || isDataChange.quantity) &&
                            <div>
                                <Button text='Підтвердити зміни' onClick={() => confirmChanges()}/>
                            </div>
                        }
                    </div>
                </Modal>
            }
        </>
    );
};

export default DataBasePage;