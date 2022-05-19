import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import Input from "../UI/input/Input";
import Button from "../UI/button/Button";
import {useDispatch} from "react-redux";
import {login, getUsers} from '../../actions/user';
import { getLogs } from "../../actions/log";

import styles from "./Login.module.css";

const Login = () => {
    const dispatch = useDispatch();
    const [loginField, setLoginField] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    const auth = (e) => {
        e.preventDefault();
        const isValidEmail = validateEmail(loginField);
        if (isValidEmail) {
            setErrorLogin('')
        }
        if (!loginField) {
            setErrorLogin('Поле обязательное')
        }
        if (!password) {
            setErrorPassword('Поле обязательное')
        }
        if (loginField && !isValidEmail) {
            setErrorLogin('Email некорректный')
        }        
        if (!loginField || !password || !isValidEmail) {return;}
        setErrorLogin('')
        setErrorPassword('')
        try {
            dispatch(getUsers())
            dispatch(getLogs())
            dispatch(login(loginField, password))
            setError('')
            setLoginField('');
            setPassword('');
        } catch (e) {
            setError(e);
        }
    };

    return(
        <form className={styles.login} onSubmit={auth}>
            {error && <span className={styles.error}>{error}</span>}
            <h1>Вход в MTwME</h1>
            <Input value={loginField} onChange={e => setLoginField(e.target.value)} type="email" nameField="Email">
                {errorLogin}
            </Input>
            <Input value={password} onChange={e => setPassword(e.target.value)} type="password" nameField="Пароль">
                {errorPassword}
            </Input>
            <NavLink to='/'>
                <Button type="submit" onClick={auth}>Войти</Button>
            </NavLink>
            <div>
                или <NavLink to='/registration'>Зарегистрироваться</NavLink>
            </div>
        </form>
    )
}

export default Login;