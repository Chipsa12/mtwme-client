import React from "react";

import styles from "./Input.module.css";

const Input = ({nameField, ...props}) => {

    return(
        <div className={styles.field}>
            <input name={nameField} {...props} className={styles.input} placeholder=" " required />
            <label >{nameField}</label>
        </div>
    )
}

export default Input;