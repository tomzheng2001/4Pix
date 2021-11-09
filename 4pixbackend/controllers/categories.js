const mysqlConnection = require("../connection");
const formidable = require("formidable");

exports.readCategory = (req, res) => {
    return res.json(req.category);
};

exports.createCategory = (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        const { name } = fields;
        mysqlConnection.query(
            `SELECT * FROM categories WHERE (name =? && user_id = ?)`,
            [fields.name, req.params.userId],
            (err, results) => {
                if (err) {
                    return res.status(400).json({
                        error: "Failed verify category",
                    });
                } else if (results.length > 0) {
                    return res.status(400).json({
                        error: "This category name already exists",
                    });
                }

                mysqlConnection.query(
                    `INSERT INTO categories SET ?`,
                    {
                        name: fields.name,
                        user_id: req.params.userId,
                    },
                    (err, results) => {
                        if (err) {
                            return res.status(400).json({
                                error: "Failed to create category",
                            });
                        }
                        console.log(results);
                        res.send({
                            message: "Category created!",
                        });
                    }
                );
            }
        );
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    mysqlConnection.query(
        `DELETE FROM categories WHERE 
                            name = ? && user_id = ?`,
        [category.name, req.params.user_id],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to delete category",
                });
            } else if (results.affectedRows === 0) {
                return res.status(400).json({
                    error: "This category does not exist",
                });
            }
            console.log(results);
            res.send({
                message: "Category deleted successfully!",
            });
        }
    );
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    mysqlConnection.query(
        `UPDATE categories 
            SET name = ? 
        WHERE category_id = ?`,
        [req.body.name, req.params.categoryId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to update category",
                });
            }
            console.log(results);
            res.send({
                message: "Category updated successfully!",
            });
        }
    );
};

exports.listCategories = (req, res) => {
    mysqlConnection.query(
        `SELECT * FROM categories
                            WHERE user_id = ?`,
        [req.params.userId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list categories",
                });
            }
            res.json(results);
        }
    );
};

exports.categoryById = (req, res, next, id) => {
    mysqlConnection.query(
        `SELECT * FROM categories WHERE category_id = ${id}`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching category by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "User not found",
                });
            }
            const category = results[0];
            req.category = category;
            next();
        }
    );
};
