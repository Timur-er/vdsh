// import React, {useState} from 'react';
// import Container from "../../Components/Container/Container";
// import styles from "./OrderPage.module.scss";
// import CreateItem from "../../Components/CreateItem/CreateItem";
//
// const OrderPage = () => {
//     const [orders, setOrders] = useState([1])
//
//     const addOrder = () => {
//         let indexValue = orders[orders.length - 1];
//         setOrders([...orders, indexValue + 1])
//     }
//
//     const ordersRender = orders.map(order => {
//         return (
//             <CreateItem/>
//         )
//     })
//
//     return (
//         <Container>
//             <div className={styles.pageWrapper}>
//                 <div className={styles.orderWrapper}>
//                     <span>сделать заказ</span>
//                     {ordersRender}
//                     <div className={styles.addOrder}>
//                         <button onClick={addOrder}>Добавить заказ в другой магазин</button>
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// };
//
// export default OrderPage;