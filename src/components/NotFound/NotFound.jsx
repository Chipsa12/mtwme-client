import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <span>404 Not Found</span>
            <NavLink to="/">Главная страница</NavLink>
        </div>
    )
};

export default NotFound;