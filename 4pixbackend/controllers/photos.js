const mysqlConnection = require("../connection");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs");

exports.readPhoto = (req, res) => {
    return res.json(req.photo);
};

exports.listPhotos = (req, res) => {
    mysqlConnection.query(
        `SELECT photo FROM photos a
            INNER JOIN albums b ON a.album_id = b.album_id
            INNER JOIN categories c ON b.category_id = c.category_id
            WHERE c.user_id = ?`,
        [req.params.userId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list photos",
                });
            }
            console.log(results);
            res.json(results);
        }
    );
};

exports.listPhotosByAlbum = (req, res) => {
    mysqlConnection.query(
        `SELECT photo from photos a
        INNER JOIN albums b ON a.album_id = b.album_id
        INNER JOIN categories c ON b.category_id = c.category_id
        WHERE a.album_id = ?`,
        [req.params.albumId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to list photos",
                });
            }
            console.log(results);
            res.json(results);
        }
    );
};

exports.createPhoto = (req, res) => {
    let form = new formidable.IncomingForm();
    let img = undefined;
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded",
            });
        }

        if (files.photo) {
            var oldPath = files.photo.path;
            var newPath =
                path.join(
                    __dirname,
                    "/../..",
                    "4pixfrontend",
                    "public/uploads"
                ) +
                "/" +
                files.photo.name;
            var rawData = fs.readFileSync(oldPath);
            fs.writeFile(newPath, rawData, function (err) {
                if (err) console.log(err);
                console.log("Successfully uploaded");
            });
        } else {
            return res.status(400).json({
                error: "Photo required",
            });
        }
        mysqlConnection.query(
            `INSERT INTO photos SET ?`,
            {
                photo: files.photo.name,
                album_id: req.params.albumId,
            },
            (err, results) => {
                if (err) {
                    return res.status(400).json({
                        error: err.message,
                    });
                }
                console.log(results);
                res.send({
                    message: "Photo created!",
                });
            }
        );
    });
};

exports.removePhoto = (req, res) => {
    mysqlConnection.query(
        `DELETE FROM photos WHERE 
                            photo_id = ?`,
        [req.params.photoId],
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    error: "Failed to delete photo",
                });
            } else if (results.affectedRows === 0) {
                return res.status(400).json({
                    error: "This photo does not exist",
                });
            }
            console.log(results);
            res.send({
                message: "Photo deleted successfully!",
            });
        }
    );
};

exports.photoById = (req, res, next, id) => {
    mysqlConnection.query(
        `SELECT * FROM photos WHERE photo_id = ${id}`,
        (err, results) => {
            if (err) {
                return res.status(400).json({
                    message: "Something went wrong fetching photo by ID",
                });
            } else if (results.length === 0) {
                return res.status(400).json({
                    message: "Photo not found",
                });
            }
            const photo = results[0];
            req.photo = photo;
            next();
        }
    );
};
