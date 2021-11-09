const express = require("express");
// const multer = require("multer");
const {
    readAlbum,
    albumById,
    createAlbum,
    updateAlbum,
    removeAlbum,
    listAlbums,
    listAllAlbums,
} = require("../controllers/album");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//         cb(file.originalname);
//     },
// });

// const upload = multer({
//     storage: storage,
// });

const router = express.Router();
const { userById } = require("../controllers/user");
const { categoryById } = require("../controllers/categories");
const { isAuth, requireSignin } = require("../controllers/auth");

router.get("/albums/:albumId", readAlbum);
router.get("/albums/list/:categoryId", listAlbums);
router.get("/albums/listAll/:userId", listAllAlbums);

router.post(
    "/albums/create/:categoryId/:userId",
    // upload.single("album_cover"),
    requireSignin,
    isAuth,
    createAlbum
);

router.put("/albums/:albumId/:userId", requireSignin, isAuth, updateAlbum);

router.delete("/albums/:albumId/:userId", requireSignin, isAuth, removeAlbum);

router.param("userId", userById);
router.param("categoryId", categoryById);
router.param("albumId", albumById);

module.exports = router;
