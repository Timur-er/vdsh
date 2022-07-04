import React, {useEffect, useRef, useState} from 'react';
import {Form, Formik, Field, FieldArray, getIn} from "formik";
import * as Yup from 'yup';
import {addProductBrand, addProducts, getAllBrands} from "../../http/productsAPI";
import Icons from "../Icons/Icons";
import {openModal} from "../../store/modal/actions";
import {useDispatch, useSelector} from "react-redux";
import {getIsModalOpen} from "../../store/modal/selectors";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import {openPopup} from "../../store/Popup/actions";
import styles from './CreateItemField.module.scss';

const CreateItemField = () => {
    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [brands, setBrands] = useState(null);
    const isModalOpen = useSelector(getIsModalOpen);
    const [modalInputValue, setModalInputValue] = useState('');
    const quantityRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchBrands() {
            const brands = await getAllBrands();
            return brands.data;
        }

        fetchBrands().then(data => setBrands(data));
    }, [isModalOpen])

    const handleMouseEnter = (index) => {
        if (typeof index == "number") {
            setIsHoveredIndex(index)
        } else {
            setIsHoveredIndex(false)
        }
    }

    const options = brands !== null && brands.map(brand => {
        return <option key={brand.id} value={brand.brand_name}>{brand.brand_name}</option>
    })

    const handleModalInput = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setModalInputValue(value)
    }

    const handleModalSubmit = async () => {
        const brand = await addProductBrand(modalInputValue);
        console.log(brand);
        dispatch(openPopup('Успішно додано', false))
        setModalInputValue('')
        dispatch(openModal(false))
    }

    const validationSchema = Yup.object().shape({
        brand: Yup.string().required("this is required field"),
        order: Yup.array().of(
            Yup.object().shape({
                color_id:Yup.string().min(4).max(4).required("Last name is required"),
                quantity: Yup.string().min(1).required("First name is required")
            })
        )
    })

    const initialValues = {
        brand: '',
        order: [
            {
                quantity: '',
                color_id: ''
            }
        ]
    }

    const handleEnter = (key) => {
        if (key.key === "Enter" && key.keyCode === 13) {
            key.preventDefault();
        }
    }

    return (
        <>
            <Formik
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    const {brand: brandName, order} = values;
                    const fetchedRopes = await addProducts(order, brandName);
                    dispatch(openPopup(fetchedRopes.data, false));
                    resetForm()
                    setSubmitting(false);
                    }}
            >
                {({values, touched, errors, handleChange, handleBlur, isValid }) => (
                    <Form onKeyDown={handleEnter} className={styles.form}>
                            <div className={styles.selectWrapper}>
                                Производитель:
                                <Field className={errors.brand && touched.brand ? `${styles.selectField} ${styles.errorInput}` : styles.selectField} as='select' name="brand">
                                    <option value="" />
                                    {options}
                                </Field>
                                <Icons type='plusIcon' color='cornflowerblue' width='20px' height='20px' click={() => dispatch(openModal(true))}/>
                            </div>
                        <div className={styles.tableHeader}>
                            <span>Цвет №</span>
                            <span>Количество</span>
                        </div>
                        <FieldArray name='order'>
                            {({push, remove}) => (
                                <div>
                                    <div className={styles.formTable}>
                                        {values.order.map((orderValue, index) => {
                                                const color_id = `order[${index}].color_id`
                                                const touchedColor_id = getIn(touched, color_id)
                                                const errorColor_id = getIn(errors, color_id)

                                                const quantity = `order[${index}].quantity`
                                                const touchedQuantity = getIn(touched, quantity)
                                                const errorQuantity = getIn(errors, quantity)

                                                return (
                                                    <div key={index} className={styles.tableRow}>
                                                        <div className={styles.inputWrapper}>
                                                            <Field
                                                                autoFocus
                                                                name={color_id}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={Boolean(touchedColor_id && errorColor_id) ? `${styles.input} ${styles.errorInput}` : styles.input}
                                                                onKeyDown={(key) => {
                                                                    if (key.key === "Enter" && key.keyCode === 13) {
                                                                        quantityRef.current.focus();
                                                                    }
                                                                }}
                                                            />
                                                        </div>


                                                        <div className={styles.inputWrapper}>
                                                            <Field
                                                                innerRef={quantityRef}
                                                                name={quantity}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={Boolean(touchedQuantity && errorQuantity) ? `${styles.input} ${styles.errorInput}` : styles.input}
                                                                onKeyDown={async (key) => {
                                                                    if (key.key === "Enter" && key.keyCode === 13) {
                                                                        push({quantity: '', color_id: ''})
                                                                    }
                                                                }}
                                                            />
                                                        </div>

                                                        <span onMouseEnter={() => handleMouseEnter(index)}
                                                              onMouseLeave={handleMouseEnter}>
                                                            <Icons
                                                                click={() => remove(index)}
                                                                type={'binIcon'}
                                                                width={'20px'}
                                                                height={'20px'}
                                                                color={isHoveredIndex === index ? 'red' : 'cornflowerblue'}/>
                                                        </span>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={styles.orderButtons}>
                                        <button type={"button"} onClick={() => push({quantity: '', color_id: ''})} className={styles.orderBtn}>
                                            Добавить цвет
                                        </button>
                                        <button type={'submit'} className={styles.orderBtn}>Оформить заказ</button>
                                    </div>
                                </div>
                            )}
                        </FieldArray>

                    </Form>
                )}
            </Formik>
            {isModalOpen && <Modal>
                <div className={styles.modal__contentWrapper}>
                    <input className={styles.modal__input} onChange={(e) => handleModalInput(e)} type="text" placeholder='Виробник'/>
                    <Button text='Додати' onClick={() => handleModalSubmit()}/>
                </div>
            </Modal>}
        </>
    );
};

export default CreateItemField;