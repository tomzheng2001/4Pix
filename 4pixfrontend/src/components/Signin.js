import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import "../sass/main.scss";

const Signin = () => {
    const [loginValues, setLoginValues] = useState({
        username: "",
        password: "",
        redirectToReferrer: false,
        error: false,
        loading: false,
    });

    const [userId, setUserId] = useState();

    const [data, setData] = useState();

    const handleLoginChange = (name) => (event) => {
        setLoginValues({
            ...loginValues,
            [name]: event.target.value,
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setLoginValues({ ...loginValues, loading: true });
        signin({
            username: loginValues.username,
            password: loginValues.password,
        }).then((data) => {
            if (data.err) {
                setLoginValues({
                    ...loginValues,
                    error: data.err,
                    loading: false,
                });
            } else {
                authenticate(data, () => {
                    setUserId(data.user.id);
                    setData(loginValues.username);
                    setLoginValues({
                        ...loginValues,
                        username: "",
                        password: "",
                        redirectToReferrer: true,
                        success: true,
                    });
                });
            }
        });
    };

    const redirectToDashboard = () => {
        if (loginValues.redirectToReferrer) {
            return (
                <Redirect
                    to={{
                        pathname: "/profile",
                        state: {
                            user: data,
                            userId: userId,
                            page: "profile"
                        },
                    }}
                />
            );
        }
    };

   
        
        
    

    return (
        <div className="window">
            <div className="bg">
                {redirectToDashboard()}
                <div className="login">
                    <h2 className="login__heading">Login</h2>
                    <div className="login__inputs">
                        <div>
                            <label className="login__label" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                className="login__username"
                                placeholder="Enter your username"
                                autoComplete="off"
                                onChange={handleLoginChange("username")}
                            />
                        </div>
                        <div>
                            <label className="login__label" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="login__password"
                                placeholder="Enter your password"
                                onChange={handleLoginChange("password")}
                            />
                        </div>
                    </div>
                    <button onClick={clickSubmit} className="login__button">
                        Login
                    </button>
                    <p>
                        Not registered yet?{" "}
                        <Link to="/">Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signin;
