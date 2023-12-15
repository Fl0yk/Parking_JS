import User from './pages/User';
import Auth from './pages/Auth';
import News from './pages/News';
import CurNews from './pages/CurNews';
import Places from './pages/Places';
import CurPlace from './pages/CurPlace';

import { USER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, PLACE_ROUTE, CURRENT_PLACE_ROUTE, NEWS_ROUTE } from './utils/consts';

export const authRoutes = [
    {
        path: USER_ROUTE,
        Component: User
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: PLACE_ROUTE,
        Component: Places
    },
    {
        path: CURRENT_PLACE_ROUTE + '/:id',
        Component: CurPlace
    },
    {
        path: NEWS_ROUTE,
        Component: News
    },
    {
        path: NEWS_ROUTE + '/:id',
        Component: CurNews
    }
]