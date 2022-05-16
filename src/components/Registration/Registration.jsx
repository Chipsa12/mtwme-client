import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import { registration } from "../../actions/user";

import styles from "./Registration.module.css";

const Registration = () => {
    let navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const auth = (e) => {
        e.preventDefault();
        if (!login || !password || !firstName || !lastName) {return;}
        const resp = registration(login, password, firstName, lastName);
        setLogin('');
        setPassword('');
        setFirstName('');
        setLastName('');
        resp.then(r => {
            if (r === 'User created') {
                navigate("/login", { replace: true });
                return;
            }
            setError(r)
        })
    };

    return(
        <form className={styles.registration} onSubmit={auth}>
            {error && <span className={styles.error}>{error}</span>}
            <h1>Регистрация в MTwME</h1>
            <Input value={ucFirst(firstName)} onChange={e => setFirstName(e.target.value)} type="text" nameField="Имя"/>
            <Input value={ucFirst(lastName)} onChange={e => setLastName(e.target.value)} type="text" nameField="Фамилия"/>
            <Input value={login} onChange={e => setLogin(e.target.value)} type="email" nameField="Логин"/>
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" nameField="Пароль"/>
            <Button type="submit" onClick={auth}>Регистрация</Button>
        </form>
    )
}

export default Registration;