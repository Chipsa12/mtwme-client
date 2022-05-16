import React, {useState} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user";

import logo from "./img/logo.png";
import modalIcon from "./img/gg_menu-grid-o.svg";
import {API_URL} from "../../config/config"

import styles from "./Navbar.module.css";

const Navbar = () => {
    const dispatch = useDispatch();
    const {isAuth, currentUser} = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);

    const toggleModal = (e) => {
        e.preventDefault();
        setToggle(prevToggle=> !prevToggle);
    }

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(logout(localStorage.getItem('token')))
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" className={styles.logoIcon}/>
                <div className={styles.logoText}>
                    Map Travel with Me
                </div>
            </div>
            {
                !isAuth
                ?
                <div className={styles.groupNavLink}>
                    <NavLink to='/login' className={styles.navLink}>Вход</NavLink>
                    <NavLink to='/registration' className={styles.navLink}>Регистрация</NavLink>
                </div>
                :
                <div className={styles.menu}>
                    <button className={styles.modalMenu} onClick={toggleModal}>
                        <img src={modalIcon} alt="icon modal menu" />
                    </button>
                    <NavLink to={`/profile/${currentUser.id}`}>
                        <img 
                            src={!currentUser.avatar.includes('default') 
                                ? API_URL + currentUser.id + '/' + currentUser.avatar
                                : API_URL + currentUser.avatar
                            } 
                            alt="avatar" 
                            className={styles.avatar}
                        />
                    </NavLink>
                    <div className={!toggle ? styles.modalNoActive : styles.modalActive}>
                        <div className={styles.wrapper}>
                            <NavLink to={`/profile/${currentUser.id}`} className={styles.profileLink}>
                                <div className={styles.userInfo}>
                                    <img 
                                        src={ !currentUser.avatar.includes('default') 
                                            ? API_URL + currentUser.id + '/' + currentUser.avatar
                                            : API_URL + currentUser.avatar
                                        } 
                                        alt="avatar" 
                                        className={styles.avatar} 
                                    />
                                    {/* <div className={localStorage.getItem('token') ? styles.onLineModal : styles.offLineModal}></div> */}
                                    <div className={styles.text}>
                                        <span className={styles.lastName}>{currentUser.surname}</span>
                                        <span className={styles.firstName}>{currentUser.name}</span>
                                    </div>
                                </div>
                            </NavLink>
                            <div className={styles.nav} onClick={toggleModal}>
                                <div className={styles.navList}>
                                    <NavLink to='/'>Главная страница</NavLink>
                                    <NavLink to='/messenger'>Сообщения</NavLink>
                                    <NavLink to='/news'>Новости</NavLink>
                                    <NavLink to='/weather'>Погода</NavLink>
                                </div>
                                <div className={styles.exit} onClick={handleClick}>Выход</div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar;