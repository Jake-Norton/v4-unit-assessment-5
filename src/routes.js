import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Components/Auth';
import Dash from './Components/Dash';
import Form from './Components/Form';
import Post from './Components/Post';

export default (
    <Switch>
        <Route exact path="/" component={Auth}/>
        <Route exact path="/dash" component={Dash}/>
        <Route path="/post/:id" component={Post}/>
        <Route exact path="/form" component={Form}/>
    </Switch>
)