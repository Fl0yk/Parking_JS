// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../Context';
import { NavLink } from 'react-router-dom';
import { USER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PLACE_ROUTE, NEWS_ROUTE } from '../utils/consts';


const NavBar = observer(() => {
    const { user } = useContext(Context);

    const logout = () => {
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
    };
    return (
        <>
            <nav className="navbar">
                <a href="/" className="navbar-brand">
                    Parking
                </a>
                <NavLink to={ PLACE_ROUTE } className="navbar-item">Home</NavLink>
                <NavLink to={NEWS_ROUTE} className="navbar-item">News</NavLink>
                {user.isAuth ?
                    <>
                        <NavLink to={USER_ROUTE} className="navbar-item">My Account</NavLink>
                        <p className="navbar-item">User: { user.user.name }</p>
                        <NavLink to={PLACE_ROUTE} onClick={logout} className="navbar-item">Logout</NavLink>
                    </>
                    :
                    <>
                        <NavLink to={LOGIN_ROUTE} className="navbar-item">LogIn</NavLink>
                        <NavLink to={ REGISTRATION_ROUTE } className="navbar-item">Registration</NavLink>
                    </>
                }
            </nav>
        </>
    );
});

export default NavBar;