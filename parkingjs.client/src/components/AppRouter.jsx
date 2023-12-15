console.log('router')
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Context from '../Context';
import { authRoutes, publicRoutes } from '../routes';
import { PLACE_ROUTE } from '../utils/consts';


const AppRouter = () => {
    const { user } = useContext(Context);
    console.log(user);

    console.log('Router method')
    return (
      <Switch>
            {user.isAuth && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={ Component } exact />
            )}

            { publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={ PLACE_ROUTE } />
      </Switch>
  );
}

export default AppRouter;