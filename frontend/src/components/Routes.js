import React from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './user/Login';
import Register from './user/Register';
import Landing from './postauth/Landing';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/register' component={Register}/>
                <Route path='/home' component={Landing}/>
            </Switch>
        </BrowserRouter>
    )
}