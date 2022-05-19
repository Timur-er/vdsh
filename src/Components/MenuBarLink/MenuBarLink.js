import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import styles from './MenuBarLink.module.scss';
import Icons from "../Icons/Icons";

const MenuBarLink = ({icon = 'userIcon', path, name, color, isActive}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [linkStyle, setLinkStyle] = useState(`${styles.link}`)

    useEffect(() => {
        if (isActive) {
            setLinkStyle(`${styles.activeLink}`);
        } else {
            setLinkStyle(`${styles.link}`);
        }
    }, [isActive])

    const handleMouseEnter = () => {
        setIsHovered(!isHovered);
    }

    return (
        <NavLink
            className={linkStyle}
            to={path}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseEnter()}
        >
            <li className={styles.li}>
                    <span className={styles.iconWrapper}>
                        <Icons
                            type={icon}
                            width={'35px'}
                            height={'35px'}
                            color={isHovered || isActive ? '#6495EDFF' : color}
                        />
                    </span>
                <span className={styles.text}>{name}</span>
            </li>
        </NavLink>

    );
};

export default MenuBarLink;