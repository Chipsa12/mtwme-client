import React from "react";

import styles from "./Input.module.css";

const Input = ({nameField, children, ...props}) => {

    return(
        <div>
            <div className={styles.field}>
                <input name={nameField} {...props} className={styles.input} placeholder=" " required />
                <label >{nameField}</label>
            </div>
            <div className={styles.error}>{children}</div>
        </div>
    )
}

export default Input;