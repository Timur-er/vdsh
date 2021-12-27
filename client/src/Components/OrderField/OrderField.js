import React, {useRef, useState} from 'react';
import styles from './OrderField.module.scss';
import {Form, Formik, Field, ErrorMessage, useFormik, FieldArray, getIn} from "formik";
import * as Yup from 'yup';
import {useHttp} from "../../Hooks/http.hook";

const OrderField = () => {
   const {loading, error, request} = useHttp();


    const validationSchema = Yup.object().shape({
        // address: Yup
        //     .string()
        //     .required('укажите адресс'),
        brand: Yup
            .string()
            .required('Укажите марку'),
        order: Yup.array(
            Yup.object({
                quantity: Yup
                    .string()
                    .min(1, 'введите кол-во')
                    .required('это обязатенльое поле'),
                color: Yup
                    .string()
                    .min(4, '4')
                    .max(4, '4')
                    .required('Это обязательное поле')
            }).required()
        )
    })

    const initialValues = {
        // address: 'chreshatyk',
        brand: 'DMC',
        order: [
            {
                quantity: '',
                color: ''
            }
        ]
    }

    const confirmBtn = () => {

    }

    return (
        <>
            <Formik
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting}) => {
                    const {brand, order} = values;
                    const createBrand = await request('http://localhost:5000/api/ropes/addRopeBrand', 'POST', {brand});
                    const addRopesItems = await request('http://localhost:5000/api/ropes/addRopeItem', 'POST', {order, brandId: createBrand})
                    console.log(createBrand);
                    console.log(values);
                    setSubmitting(false);
                }}
            >
                {({values, handleSubmit, errors, touched, setTouched}) => (
                    <Form onSubmit={handleSubmit}>
                        <div className={styles.orderSameData}>
                            {/*<div>*/}
                            {/*    Магазин:*/}
                            {/*    <Field as='select' name="address" id="address">*/}
                            {/*        <option value="creshatyk">Крешатик</option>*/}
                            {/*        <option value="darnitsa">Дарница</option>*/}
                            {/*        <option value="teremki">Теремки</option>*/}
                            {/*    </Field>*/}
                            {/*</div>*/}

                            <div>
                                Производитель:
                                <Field as='select' name="brand" id="brand">
                                    <option value="dmc">DMC</option>
                                    <option value="ideal">IDEAL</option>
                                    <option value="kirovo">KIROVO</option>
                                </Field>
                            </div>
                        </div>

                        <FieldArray name={'order'}>
                            {({push, remove}) => (

                                <>
                                    <div className={styles.formWrapper}>
                                        {
                                            values.order.map((x, index) => {
                                                return (
                                                    <div className={styles.form}>
                                                        <div className={styles.inputsWrapper}>
                                                            <div className={styles.inputLabel}>
                                                                <label>Количество:</label>
                                                                <div className={styles.inputContainer}>
                                                                    <Field className={styles.quantityInput} name={`order.${index}.quantity`}/>
                                                                </div>
                                                                <span className={styles.errorMsg}><ErrorMessage name={`order.${index}.quantity`}/></span>
                                                            </div>
                                                            <div className={styles.inputLabel}>
                                                                <label>Цвет №:</label>
                                                                <div className={styles.inputContainer}>
                                                                    <Field name={`order.${index}.color`}/>
                                                                </div>
                                                                <span className={styles.errorMsg}><ErrorMessage name={`order.${index}.color`}/></span>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => remove(index)}>Удалить</button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={styles.orderButtons}>
                                        <button type={'submit'} className={styles.orderBtn}>Оформить заказ</button>
                                        <button onClick={() => {
                                            push({quantity: '', color: ''})
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

export default OrderField;