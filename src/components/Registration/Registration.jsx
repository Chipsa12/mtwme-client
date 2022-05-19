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

    const [errorLogin, setErrorLogin] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [error, setError] = useState('');

    const ucFirst = (str) => {
        if (!str) return str;
        return str[0].toUpperCase() + str.slice(1);
    }

    const validateEmail = (email) => {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    const auth = (e) => {
        e.preventDefault();
        const isValidEmail = validateEmail(login);
        if (isValidEmail) {
            setErrorLogin('')
        }
        if (!login) {
            setErrorLogin('Поле обязательное')
        }
        if (!password) {
            setErrorPassword('Поле обязательное')
        }
        if (!firstName) {
            setErrorFirstName('Поле обязательное')
        }
        if (!lastName) {
            setErrorLastName('Поле обязательное')
        }
        if (password && password.length < 3) {
            setErrorPassword('Длина пароля должна быть не меньше 3')
        }
        if (login && !isValidEmail) {
            setErrorLogin('Email некорректный')
        }
        if (!login || !password || !firstName || !lastName || password.length < 3 || !isValidEmail) {return;}
        setError('');
        setErrorLogin('')
        setErrorPassword('')
        setErrorFirstName('')
        setErrorLastName('')
        try {
            registration(login, password, firstName, lastName)
            .then(() => {
                setLogin('');
                setPassword('');
                setFirstName('');
                setLastName('');
                navigate('/login', {replace: true});
            })
            .catch(err => {
                setErrorLogin('')
                setErrorPassword('')
                setErrorFirstName('')
                setErrorLastName('')
                setError(err)
            })
        } catch (e) {
            setError(e);
        }
    };

    return(
        <form className={styles.registration} onSubmit={auth}>
            {error && <span className={styles.error}>Пользователь с таким логином существует</span>}
            <h1>Регистрация в MTwME</h1>
            <Input  value={ucFirst(firstName)} onChange={e => setFirstName(e.target.value)} type="text" nameField="Имя">
                {errorFirstName}
            </Input>
            <Input  value={ucFirst(lastName)} onChange={e => setLastName(e.target.value)} type="text" nameField="Фамилия">
                {errorLastName}
            </Input>
            <Input  value={login} onChange={e => setLogin(e.target.value)} type="email" nameField="Email">
                {errorLogin}
            </Input>
            <Input  value={password} onChange={e => setPassword(e.target.value)} type="password" nameField="Пароль">
                {errorPassword}
            </Input>
            <Button type="submit" onClick={auth}>Регистрация</Button>
        </form>
    )
}

export default Registration;