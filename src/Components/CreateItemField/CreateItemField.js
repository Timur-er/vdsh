import React, {isValidElement, useEffect, useState} from 'react';
import styles from './CreateItemField.module.scss';
import {Form, Formik, Field, ErrorMessage, FieldArray} from "formik";
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
        brand: Yup
            .string()
            .required('Укажите марку'),
        order: Yup.array(
            Yup.object({
                quantity: Yup
                    .string()
                    .min(1, "Мінімальне значення 1")
                    .required("Це обовʼязкове поле!"),
                color_id: Yup
                    .string()
                    .min(4, "Повинно бути 4-ох значне число")
                    .max(4, "Повинно бути 4-ох значне число")
                    .required("Це обовʼязкове поле!")
            }).required()
        )
    })

    const initialValues = {
        brand: 'DMC',
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
                validateOnChange={true}
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
                {({values, handleSubmit, errors, isValid, touched }) => (
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.orderSameData}>
                            <div>
                                Производитель:
                                <Field as='select' name="brand" id="brand">
                                    {options}
                                </Field>
                            </div>
                        </div>

                        <div className={styles.tableHeader}>
                            <span>Цвет №</span>
                            <span>Количество</span>
                        </div>

                        <FieldArray name={'order'}>
                            {({push, remove}) => (

                                <>
                                    <div className={styles.formTable}>
                                        {
                                            values.order.map((x, index) => {
                                                return (
                                                    <div key={index} className={styles.tableRow}>

                                                        <div className={styles.inputWrapper}>
                                                            <Field
                                                                name={`order[${index}].color_id`}
                                                                className={`${styles.input}`} />
                                                            <ErrorMessage name={`order[${index}].color_id`} />
                                                        </div>


                                                        <div className={styles.inputWrapper}>
                                                            <Field
                                                                className={`${styles.input}`}
                                                                name={`order[${index}].quantity`}/>
                                                            <ErrorMessage name={`order[${index}].quantity`} />
                                                        </div>

                                                        <span onMouseEnter={() => handleMouseEnter(index)}
                                                              onMouseLeave={handleMouseEnter}>
                                                            <Icons
                                                                click={() => remove(index)}
                                                                type={'binIcon'}
                                                                width={'20px'}
                                                                height={'20px'}
                                                                color={isHoveredIndex === index ? 'red' : 'white'}/>
                                                        </span>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={styles.orderButtons}>
                                        <button type={'submit'} className={styles.orderBtn}>Оформить заказ</button>
                                        <button onClick={() => {
                                            push({quantity: '', color_id: ''})
                                        }} className={styles.orderBtn}>
                                            Добавить цвет
                                        </button>
                                    </div>
                                </>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default CreateItemField;