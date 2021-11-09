import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authenticate } from "../auth";
import { signup } from "../auth";
import Modal from "./Modal";
import "../sass/main.scss";

const Landing = () => {
    const [registerValues, setRegisterValues] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        loading: false,
        redirectToReferrer: false,
        success: false,
    });

    const [registerIsOpen, setRegisterIsOpen] = useState(false);

    const handleRegisterChange = (name) => (event) => {
        setRegisterValues({
            ...registerValues,
            [name]: event.target.value,
        });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setRegisterValues({ ...registerValues, loading: true });
        signup({
            username: registerValues.username,
            email: registerValues.email,
            password: registerValues.password,
            passwordConfirm: registerValues.confirm_password,
        }).then((data) => {
            if (data) {
                console.log(data);
                authenticate(data, () => {
                    setRegisterValues({
                        username: "",
                        email: "",
                        password: "",
                        confirm_password: "",
                        redirectToReferrer: true,
                        success: true,
                    });
                });
            }
        });
    };

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                setRegisterIsOpen(false);
            }
        };
        window.addEventListener("keydown", close);
    }, []);

    const showSuccess = () => {
        return (
            <div
                className="modal__success"
                style={{ display: registerValues.success ? "" : "none" }}
            >
                Successfully registered! Please <Link to="/signin">Signin</Link>
            </div>
        );
    };

    const title = <h2 className="modal__title">Register</h2>;

    const content = (
        <div className="modal__register">
            <input
                onChange={handleRegisterChange("username")}
                placeholder="Username..."
                type="text"
                autoComplete="off"
            />
            <input
                onChange={handleRegisterChange("email")}
                placeholder="Your email address..."
                type="email"
                autoComplete="off"
            />
            <input
                onChange={handleRegisterChange("password")}
                placeholder="Create password..."
                type="password"
                autoComplete="off"
            />
            <input
                onChange={handleRegisterChange("confirm_password")}
                placeholder="Confirm password..."
                type="password"
                autoComplete="off"
            />
            {showSuccess()}
        </div>
    );

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                setRegisterIsOpen(false);
            }
        };
        window.addEventListener("keydown", close);
    }, []);

    const actions = (
        <div className="modal__actions">
            <button onClick={clickSubmit}>Register</button>
        </div>
    );

    return (
        <div className="landing">
            {/* Main Hero Image and Landing Header */}
            <div className="hero">
                <div className="navigation">
                    <a
                        onClick={() => setRegisterIsOpen(true)}
                        href="#"
                        className="navigation__register"
                    >
                        Register
                    </a>
                    <a href="/signin" className="navigation__login">
                        Login
                    </a>
                </div>
                <div className="hero__headers">
                    <h1>Store your Photos, Expand Your Online Business</h1>
                    <h4>
                        4Pix is your one stop shop to list your product photos
                        and categorize them to help you get customers to shop
                        with you.
                    </h4>
                    <a className="hero__headers-btn">Get Started</a>
                </div>
            </div>

            <Modal
                closeModal={() => setRegisterIsOpen(false)}
                isOpen={registerIsOpen}
                title={title}
                content={content}
                actions={actions}
            />
        </div>
    );
};

export default Landing;
