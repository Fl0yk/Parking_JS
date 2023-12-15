// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { registration, login } from '../http/userAPI';
import Context from '../Context';
import { PLACE_ROUTE } from '../utils/consts';

const Auth = () => {
    //хук для получения информации об локации (для получения маршрута)
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const { user } = useContext(Context);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = (event) => {
        event.preventDefault();

        if (isLogin) {
            login(email, password)
                .then(curUser => {
                    user.setUser(curUser);
                    user.setIsAuth(true);
                    history.push(PLACE_ROUTE);
                })
                .catch(error => {
                    console.log("Login failed:", error);
                    alert('Login failed');
                });
        }
        else {
            registration(name, email, password)
                .then(curUser => {
                    user.setUser(curUser);
                    user.setIsAuth(true);
                    history.push(PLACE_ROUTE);
                })
                .catch(error => {
                    console.log("Registration failed:", error);
                    alert('Registration failed');
                });
        }
    }

    return (
        <>
        <form>
            <fieldset title="Registration">
                <legend>{isLogin ? "Login" : "Registration"}</legend>
                {
                    isLogin ? <div></div> :
                    <div>
                        <label>Name:
                                <input type='text' maxLength='20' minLength='4' required value={name} onChange={(e) => setName(e.target.value)}></input>
                        </label>
                    </div>
                }
                <div>
                    <label>Email:
                        <input type='text' maxLength='20' minLength='4' required value={email} onChange={(e) => setEmail(e.target.value) }></input>
                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type='password' maxLength='40' minLength='4' required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                    </label>
                </div>
                    <button className='sbm' onClick={click}>
                    {isLogin ? "Login" : "Registration"}
                </button>
                <div>
                    <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                        {isLogin ? 'Registratin' : 'Login'}
                    </NavLink>
                </div>
            </fieldset>
            </form>
        </>
    );
};

export default Auth;