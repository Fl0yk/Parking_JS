import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const registration = async (name, email, password) => {
    return $host.post('api/user/registration', {
        name, email, password
    })
        .then(function (response) {
            //console.log(response);
            localStorage.setItem('token', response.data.token);
            const token = jwtDecode(response.data.token);
            return token;
        })
        .catch(function (error) {
            console.log('Error during registration:', error);
            throw error;
        });
}

export const login = async (email, password) => {
    return $host.post('api/user/login', {
        email, password
    })
        .then(function (response) {
            //console.log(response);
            const token = jwtDecode(response.data.token);
            localStorage.setItem('token', response.data.token);
            //alert('Add token');
            return token;
        })
        .catch(function (error) {
            console.log('Error during login:', error);
            throw error;
        });
}

export const check = async () => {
    console.log(localStorage.getItem('token'));
    const { data } = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}