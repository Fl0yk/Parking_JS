import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import UserStore from './store/UserStore';
import Context from './Context';
import './styles/index.css';
import PlaceStore from './store/PlaceStore.js';
import NewsStore from './store/NewsStore.js';
import CarStore from './store/CarStore.js';

console.log('main');
ReactDOM.createRoot(document.getElementById('root')).render(
        <Context.Provider value={{
            user: new UserStore(),
            place: new PlaceStore(),
            news: new NewsStore(),
            car: new CarStore(),
        }}>
            <App />
        </Context.Provider>,
);
