import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import Context from './Context';
import { useState } from 'react';
import { check } from './http/userAPI';
import Time from './components/time';

const App = observer(() => {
    const { user } = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //console.log('App use effect');
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    });

    if (loading) {
        return <></>;
    }

    return (
        <BrowserRouter>
            <NavBar />
            <main>
                <AppRouter />
            </main>
            <footer>
            <Time/>
            </footer>
        </BrowserRouter>
    );
});

export default App;
