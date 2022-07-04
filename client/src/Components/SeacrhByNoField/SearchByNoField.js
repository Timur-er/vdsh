import React, {useRef} from 'react';
import styles from './SearchByNoField.module.scss';

const SearchByNoField = ({ products, getFilteredProducts }) => {
    const searchRef = useRef();

    // может быть удалить этот компонент и перенести всю логику в родительский?
    const handleSearch = () => {
        const value = searchRef.current.value;
        const filtered =  products.filter(product => {
            const { color_id } = product;
            return color_id.includes(value)
        })
        getFilteredProducts(filtered)
    }

    return (
        <input className={styles.search} type="text" ref={searchRef} onChange={handleSearch} placeholder="Пошук по номеру"/>
        );
};

export default SearchByNoField;