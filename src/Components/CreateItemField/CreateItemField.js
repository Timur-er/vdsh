import React, {useEffect, useState} from 'react';
import styles from './CreateItemField.module.scss';
import {Form, Formik, Field, FieldArray, getIn} from "formik";
import * as Yup from 'yup';
import {addRopes, getAllRopesBrand} from "../../http/ropesAPI";
import Icons from "../Icons/Icons";

const CreateItemField = () => {
    const [isHoveredIndex, setIsHoveredIndex] = useState(null);
    const [brands, setBrands] = useState(null);

    useEffect(() => {
        async function fetchBrands() {
            const brands = await getAllRopesBrand();
            return brands.data;
        }

        fetchBrands().then(data => setBrands(data));
    }, [])

    const handleMouseEnter = (index) => {
        if (typeof index == "number") {
            setIsHoveredIndex(index)
        } else {
            setIsHoveredIndex(false)
        }
    }

    const options = brands !== null && brands.map(brand => {
        return <option key={brand.id} value={brand.brandName}>{brand.brandName}</option>
    })


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

    return (
        <>
            <Formik
                validateOnChange={false}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    const {brand: brandName, order} = values;
                    const fetchedRopes = await addRopes(order, brandName);
                    alert(fetchedRopes.data)
                    resetForm()
                    setSubmitting(false);
                    }}
            >
                {({values, touched, errors, handleChange, handleBlur, isValid }) => (
                    <Form className={styles.form}>
                        <div className={styles.orderSameData}>
                            <div>
                                Производитель:
                                <Field className={errors.brand && touched.brand ? `${styles.selectField} ${styles.errorInput}` : styles.selectField} as='select' name="brand">
                                    <option value="" />
                                    {options}
                                </Field>
                            </div>
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
                                                                name={color_id}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={Boolean(touchedColor_id && errorColor_id) ? `${styles.input} ${styles.errorInput}` : styles.input}
                                                            />
                                                        </div>


                                                        <div className={styles.inputWrapper}>
                                                            <Field
                                                                name={quantity}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                className={Boolean(touchedQuantity && errorQuantity) ? `${styles.input} ${styles.errorInput}` : styles.input}
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
        </>
    );
};

export default CreateItemField;