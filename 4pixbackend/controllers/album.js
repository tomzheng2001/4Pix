const mysqlConnection = require("../connection");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

exports.readAlbum = (req, res) => {
    req.album.album_cover = undefined;
    return res.json(req.album);
};

exports.listAlbums = (req, res) => {
    mysqlConnection.query(
        `SELECT * FROM albums
                            WHERE category_id = ?`,
        [req.params.categoryId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list albums",
                });
            }
            // for (let i = 0; i < results.length; i++) {
            //     results[i].album_cover = undefined;
            // }
            res.json(results);
        }
    );
};

exports.listAllAlbums = (req, res) => {
    mysqlConnection.query(
        `SELECT a.album_id, a.name, a.description,
        a.category_id, a.album_cover
        FROM albums AS a
        LEFT OUTER JOIN categories AS c
        ON a.category_id = c.category_id
        WHERE user_id = ?`,
        [req.params.userId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list out all the albums",
                });
            }

            res.json(results);
        }
    );
};

exports.createAlbum = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        const { name, description } = fields;
        if (!name) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        if (files.album_cover) {
            var oldPath = files.album_cover.path;
            var newPath =
                path.join(
                    __dirname,
                    "/../..",
                    "4pixfrontend",
                    "public/uploads"
                ) +
                "/" +
                files.album_cover.name;
            var rawData = fs.readFileSync(oldPath);
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err);
                console.log("Successfully uploaded");
            });
        } else {
            return res.status(400).json({
                error: "Album covered required",
            });
        }

        mysqlConnection.query(
            `INSERT INTO albums SET ?`,
            {
                name: name,
                category_id: req.params.categoryId,
                album_cover: files.album_cover.name,
                description: description,
            },
            (err, results) => {
                if (err) {
                    return res.status(400).json({
                        error: err.message,
                    });
                }
                res.json({
                    name,
                    category_id: req.params.categoryId,
                    description: description,
                });
            }
        );
    });
};

exports.albumById = (req, res, next, id) => {
    mysqlConnection.query(
        `SELECT * FROM albums WHERE album_id = ${id}`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching album by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "Album not found",
                });
            }
            const album = results[0];
            req.album = album;
            next();
        }
    );
};

exports.updateAlbum = (req, res) => {
    let form = new formidable.IncomingForm();
    let img = undefined;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }
        const { name, category_id, album_cover } = fields;
        if (!name) {
            return res.status(400).json({
                error: "All fields are required",
            });
        }

        if (files.album_cover) {
            img = fs.readFileSync(files.album_cover.path);
        } else {
            return res.status(400).json({
                error: "Album covered required",
            });
        }

        const changes = {};
        if (name) {
            changes["name"] = name;
        }
        if (category_id) {
            changes["category_id"] = category_id;
        }
        if (album_cover) {
            changes["album_cover"] = album_cover;
        }

        mysqlConnection.query(
            `UPDATE albums SET ?`,
            changes,
            (err, results) => {
                if (err) {
                    return res.status(400).json({
                        error: err.message,
                    });
                }

                res.send({
                    message: "Album updated!",
                });
            }
        );
    });
};

exports.removeAlbum = (req, res) => {
    mysqlConnection.query(
        `DELETE FROM albums WHERE 
                            album_id = ?`,
        [req.params.albumId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to delete album",
                });
            } else if (results.affectedRows === 0) {
                return res.status(400).json({
                    error: "This album does not exist",
                });
            }

            res.send({
                message: "Album deleted successfully!",
            });
        }
    );
};
