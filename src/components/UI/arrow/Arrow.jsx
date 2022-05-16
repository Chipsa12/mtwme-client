import React from "react";
import cn from 'classnames';
import styles from "./Arrow.module.css";

const Arrow = ({ direction }) => {
    return (
        <button 
            className={ direction === 'right' ? cn(styles.arrow, styles.arrowRight) : cn(styles.arrow, styles.arrowLeft)}>
        </button>
    )
};

export default Arrow;