import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { isAuthenticated } from "../auth";
import { createCategory } from "../auth/category";
import Modal from "./Modal";

const Categories = (props) => {
    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;
    const token = isAuthenticated().token;

    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoryInfo, setCategoryInfo] = useState({
        name: "",
        error: "",
        loading: false,
    });

    useEffect(() => {
        const close = (e) => {
            if (e.key === "Escape") {
                setShowCategoryModal(false);
                onCancel();
            }
        };
        window.addEventListener("keydown", close);
    }, []);

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        console.log(value);
        setCategoryInfo({
            ...categoryInfo,
            error: false,
            [name]: value,
        });
    };

    const onCancel = () => {
        setShowCategoryModal(false);
    };

    const clickConfirm = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("name", categoryInfo.name);
        createCategory(formData, userId, token).then((data) => {
            if (data.error) {
                setCategoryInfo({ ...categoryInfo, error: data.error });
            } else {
                setCategoryInfo({
                    ...categoryInfo,
                    name: "",
                    error: "",
                    loading: false,
                });
                setShowCategoryModal(false);
                // setShowSuccess(true);
                // setTimeout(() => setShowSuccess(false), 1500);
            }
        });
    };

    const categoryTitle = (
        <h2 className="category__modal-heading">Create New Category</h2>
    );

    const categoryContent = (
        <form
            className="category__modal-create"
            encType="multipart/form-data"
            action="/category/create/:userId"
        >
            {/* {showSuccessMessage()} */}
            <div>
                <label htmlFor="name">Category Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter category name"
                    className="category__modal-inputname"
                    onChange={handleChange("name")}
                />
            </div>
        </form>
    );

    const categoryActions = (
        <div className="category__modal-buttons">
            <button onClick={clickConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );

    const displayCategoriesContent = () => {
        return (
            <div>
                <Modal
                    title={categoryTitle}
                    content={categoryContent}
                    actions={categoryActions}
                    isOpen={showCategoryModal}
                    closeModal={onCancel}
                />
                <h1>Categories</h1>
                <button onClick={() => setShowCategoryModal(true)}>
                    Create New Category
                </button>
            </div>
        );
    };

    return (
        <Dashboard
            user={user}
            userId={userId}
            page={page}
            content={displayCategoriesContent()}
        />
    );
};

export default Categories;
