import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Landing from "./components/Landing";
import Signin from "./components/Signin";
import Albums from "./components/Albums";
import Photos from "./components/Photos";
import Profile from "./components/Profile";
import Categories from "./components/Categories";
import Details from "./components/Details";
import Trash from "./components/Trash";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/albums" exact component={Albums} />
                <Route path="/profile" exact component={Profile} />
                <Route path="/categories" exact component={Categories} />
                <Route path="/details" exact component={Details} />
                <Route path="/trash" exact component={Trash} />
                <Route path="/albums/:albumId" exact component={Photos} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
