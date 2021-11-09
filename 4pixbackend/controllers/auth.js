const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const mysqlConnection = require("../connection");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    const { username, email, password, passwordConfirm } = req.body;

    console.log(req.body);
    await bcrypt.hash(password, 8, (err, hash) => {
        if (err) {
            console.log(err.message);
        }

        // Check if confirm password is correct
        if (password !== passwordConfirm) {
            return res.send("Passwords do not match");
        }

        // Check if email already exists in DB
        mysqlConnection.query(
            "SELECT username, email FROM users WHERE (email = ?) | (username = ?)",
            [email, username],
            (error, results) => {
                if (error) {
                    return res.status(400).json({
                        err: error.message,
                    });
                } else if (results.length > 0) {
                    return res.send({
                        message: "This username or email is already in use",
                    });
                }

                mysqlConnection.query(
                    `INSERT INTO users SET ?`,
                    {
                        username: username,
                        email: email,
                        hash_password: hash,
                    },
                    (error, results) => {
                        if (error) {
                            return res.status(400).json({
                                err: error.message,
                            });
                        } else {
                            console.log(results);
                            res.json({
                                username: username,
                                email: email,
                            });
                        }
                    }
                );
            }
        );
    });
};

exports.signin = (req, res) => {
    const { username, password } = req.body;
    mysqlConnection.query(
        `SELECT * FROM users WHERE (username = ?)`,
        [username],
        async (error, results) => {
            if (error) {
                return res.status(400).json({
                    err: error.message,
                });
            }
            if (!results[0]) {
                return res.status(400).json({
                    err: "NO results found",
                });
            }

            await bcrypt.compare(
                password,
                results[0].hash_password,
                (err, same) => {
                    if (err) {
                        return res.status(400).json({
                            err: err.message,
                        });
                    }
                    if (!same) {
                        return res.status(400).send({
                            err: "Failed to authenticate",
                        });
                    }
                    const token = jwt.sign(
                        { id: results[0].id },
                        process.env.JWT_SECRET
                    );
                    res.cookie("t", token, { expire: new Date() + 9999 });
                    const { id, username, email } = results[0];
                    return res.json({
                        token,
                        user: {
                            id,
                            username,
                            email,
                        },
                    });
                }
            );
        }
    );
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({
        message: "Successfully Signed Out",
    });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    // getToken: function fromCookie(req) {
    //     console.log(req);
    //     var token = req.cookies.t;
    //     if (token) {
    //         return token;
    //     }
    //     return null;
    // },
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile.id == req.auth.id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};
