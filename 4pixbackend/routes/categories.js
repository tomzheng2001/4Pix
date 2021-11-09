const express = require("express");
const {
    readCategory,
    createCategory,
    categoryById,
    updateCategory,
    removeCategory,
    listCategories,
} = require("../controllers/categories");
const { userById } = require("../controllers/user");
const { isAuth, requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/category/:categoryId", readCategory);
router.post("/category/create/:userId", requireSignin, isAuth, createCategory);
router.put(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    updateCategory
);
router.delete(
    "/category/:categoryId/:userId",
    requireSignin,
    isAuth,
    removeCategory
);
router.get("/categories/:userId", listCategories);

router.param("userId", userById);
router.param("categoryId", categoryById);

module.exports = router;
