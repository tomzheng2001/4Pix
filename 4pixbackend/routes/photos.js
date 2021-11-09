const express = require("express");
const router = require("./user");

const {
    photoById,
    readPhoto,
    listPhotos,
    createPhoto,
    removePhoto,
    listPhotosByAlbum,
} = require("../controllers/photos");
const { userById } = require("../controllers/user");
const { isAuth, requireSignin } = require("../controllers/auth");
const { albumById } = require("../controllers/album");

router.get("/photo/:photoId", readPhoto);
router.get("/photos/:userId", listPhotos);
router.get("/photoslist/:albumId", listPhotosByAlbum);
router.post(
    "/photo/create/:albumId/:userId",
    requireSignin,
    isAuth,
    createPhoto
);
router.delete("/photo/:photoId/:userId", requireSignin, isAuth, removePhoto);

router.param("userId", userById);
router.param("albumId", albumById);
router.param("photoId", photoById);

module.exports = router;
