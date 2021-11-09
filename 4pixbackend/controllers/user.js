const mysqlConnection = require("../connection");

exports.readUser = (req, res) => {
    req.profile.hash_password = undefined;
    return res.json(req.profile);
};

exports.userById = (req, res, next, id) => {
    mysqlConnection.query(
        `SELECT * FROM users WHERE ${id} = id`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching user by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "User not found",
                });
            }

            const user = results[0];
            req.profile = user;
            next();
        }
    );
};
