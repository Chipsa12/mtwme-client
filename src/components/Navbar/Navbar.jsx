import React, {useState} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/user";

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
        try {
            dispatch(logout(currentUser.id))
        } catch (e) {
            console.log(e);
        }
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img 
                    src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Flogo.png?alt=media&token=3a9a612c-98ff-42da-b50d-7704f9032059' 
                    alt="logo" 
                    className={styles.logoIcon}
                />
                <div className={styles.logoText}>
                    <NavLink className={styles.logoTextLink} to='/'>Map Travel with Me</NavLink>
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
                        <img 
                            src='https://firebasestorage.googleapis.com/v0/b/mtwme-a1870.appspot.com/o/images%2Fgg_menu-grid-o.svg?alt=media&token=cd4ff466-6cb3-481d-8d5c-0c4cf9193233' 
                            alt="icon modal menu" 
                        />
                    </button>
                    <NavLink to={`/profile/${currentUser.id}`}>
                        <img 
                            src={currentUser.avatar} 
                            alt="avatar" 
                            className={styles.avatar}
                        />
                    </NavLink>
                    <div className={!toggle ? styles.modalNoActive : styles.modalActive}>
                        <div className={styles.wrapper}>
                            <NavLink to={`/profile/${currentUser.id}`} className={styles.profileLink}>
                                <div className={styles.userInfo}>
                                    <img 
                                        src={currentUser.avatar} 
                                        alt="avatar" 
                                        className={styles.avatar} 
                                    />
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