import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import {useDispatch} from "react-redux";
import {login} from '../../actions/user';

import styles from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const [loginField, setLoginField] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = (e) => {
        e.preventDefault();
        if (!loginField || !password) {return;}
        const res = dispatch(login(loginField, password));
        res.then(r => {
            if (r === 'User not found') {
                setError(r)
            }
        })
        setLoginField('');
        setPassword('');
    };

    return(
        <form className={styles.login} onSubmit={auth}>
            {error && <span className={styles.error}>{error}</span>}
            <h1>Вход в MTwME</h1>
            <Input value={loginField} onChange={e => setLoginField(e.target.value)} type="email" nameField="Логин"/>
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" nameField="Пароль"/>
            <NavLink to='/'>
                <Button type="submit" onClick={auth}>Войти</Button>
            </NavLink>
        </form>
    )
}

export default Login;