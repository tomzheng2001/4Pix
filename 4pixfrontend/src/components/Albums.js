import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Modal from "./Modal";
import { listCategories } from "../auth/category";
import { createAlbum, listAllAlbums } from "../auth/album";
import { createPhoto } from "../auth/photo";
import { isAuthenticated } from "../auth";
import Card from "./Card";
import { withRouter } from "react-router";

const Albums = (props) => {
    const [showAlbumModal, setShowAlbumModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [albums, setAlbums] = useState([]);
    const [email, setEmail] = useState();
    const [albumInfo, setAlbumInfo] = useState({
        name: "",
        category: "",
        description: "",
        photo: "",
        error: "",
        loading: false,
    });
    const [photoInfo, setPhotoInfo] = useState({
        album: "",
        photo: "",
        error: "",
        loading: false,
    });

    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setAlbumInfo({
            ...albumInfo,
            error: false,
            [name]: value,
        });
    };

    const handleChangeImage = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        setPhotoInfo({
            ...photoInfo,
            error: false,
            [name]: value,
        });
    };

    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;
    const token = isAuthenticated().token;
    

    useEffect(() => {
        loadCategories();
        setEmail(window.em);
        const close = (e) => {
            if (e.key === "Escape") {
                setShowAlbumModal(false);
                onCancel();
            }
        };
        window.addEventListener("keydown", close);
    }, []);

    useEffect(() => {
        loadAlbums();
    }, [showSuccess]);

    if (!props.location) {
        return null;
    }

    const loadCategories = () => {
        listCategories(userId).then((data) => {
            if (!data.err) {
                setCategories(data);
            }
        });
    };

    const loadAlbums = () => {
        listAllAlbums(userId).then((data) => {
            if (!data.err) {
                setAlbums(data);
            }
        });
    };

    const showSuccessMessage = () => {
        return (
            <div
                className="albums__modal-message"
                style={{ display: showSuccess ? "" : "none" }}
            >
                Album created successfully!
            </div>
        );
    };

    const showSuccessMessageImage = () => {
        return (
            <div
                className="albums__modal-message"
                style={{ display: showSuccess ? "" : "none" }}
            >
                Image created successfully!
            </div>
        );
    };

    const clickConfirm = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("name", albumInfo.name);
        formData.append("album_cover", albumInfo.photo);
        formData.append("description", albumInfo.description);
        createAlbum(formData, albumInfo.category, userId, token).then(
            (data) => {
                if (data.error) {
                    setAlbumInfo({ ...albumInfo, error: data.error });
                } else {
                    setAlbumInfo({
                        ...albumInfo,
                        name: "",
                        category: "",
                        description: "",
                        photo: "",
                        error: "",
                        loading: false,
                    });
                    setShowAlbumModal(false);
                    setShowAlbumModal(true);
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 1500);
                }
            }
        );
    };

    const clickConfirmImage = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", photoInfo.photo);
        createPhoto(formData, photoInfo.album, userId, token).then((data) => {
            if (data.error) {
                setPhotoInfo({ ...photoInfo, error: data.error });
            } else {
                setPhotoInfo({
                    album: "",
                    photo: "",
                    error: "",
                    loading: false,
                });
                setShowImageModal(false);
                setShowImageModal(true);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 1500);
            }
        });
    };

    const modalTitle = (
        <h2 className="albums__modal-heading">Create New Album</h2>
    );

    const imageModalTitle = (
        <h2 className="albums__modal-heading">Upload New Image</h2>
    );

    const modalContent = (
        <form
            className="albums__modal-create"
            encType="multipart/form-data"
            action="/albums/create/:categoryId/:userId"
        >
            {showSuccessMessage()}
            <div>
                <label htmlFor="name">Album Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Enter album name"
                    className="albums__modal-inputname"
                    onChange={handleChange("name")}
                />
            </div>
            <div>
                <label htmlFor="category">Category</label>
                <select
                    name="category"
                    id="category"
                    onChange={handleChange("category")}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, i) => (
                        <option key={i} value={category.category_id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="albums__modal-description">
                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                    onChange={handleChange("description")}
                ></textarea>
            </div>
            <div className="albums__modal-cover">
                <label htmlFor="image">Choose an album cover image</label>
                <input
                    type="file"
                    id="image"
                    name="album_cover"
                    accept=".png,./jpeg,.jpg"
                    required={true}
                    className="albums__modal-uploadimage"
                    onChange={handleChange("photo")}
                />
            </div>
        </form>
    );

    const imagesModalContent = (
        <form
            className="albums__modal-create"
            encType="multipart/form-data"
            action="/photo/create/:albumId/:userId"
        >
            {showSuccessMessageImage()}
            <div className="albums__modal-create--inner">
                <label htmlFor="album">Album</label>
                <select
                    name="album"
                    id="album"
                    onChange={handleChangeImage("album")}
                >
                    <option value="">Select a category</option>
                    {albums.map((album, i) => (
                        <option key={i} value={album.album_id}>
                            {album.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="images__modal-upload">
                <label htmlFor="image">Choose an image to upload</label>
                <input
                    type="file"
                    id="image"
                    name="imageupload"
                    accept=".png,./jpeg,.jpg"
                    required={true}
                    className="albums__modal-uploadimage"
                    onChange={handleChangeImage("photo")}
                />
            </div>
        </form>
    );

    const onCancel = () => {
        setShowAlbumModal(false);
        // this.props.history.push('/albums')
    };

    const onCancelImage = () => {
        setShowImageModal(false);
    };

    const modalActions = (
        <div className="albums__modal-buttons">
            <button onClick={clickConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );

    const imageModalActions = (
        <div className="images__modal-buttons">
            <button onClick={clickConfirmImage}>Confirm</button>
            <button onClick={onCancelImage}>Cancel</button>
        </div>
    );

    // const clickAlbum = (albumId) => {
    //     console.log(albumId);
    // };

    const displayAlbumContent = () => {
        return (
            <div className="albums">
                <Modal
                    title={modalTitle}
                    content={modalContent}
                    actions={modalActions}
                    isOpen={showAlbumModal}
                    closeModal={onCancel}
                />
                <Modal
                    title={imageModalTitle}
                    content={imagesModalContent}
                    actions={imageModalActions}
                    isOpen={showImageModal}
                    closeModal={onCancelImage}
                />
                <div className="albums__menu">
                    <input
                        type="text"
                        className="albums__search"
                        placeholder="Search My Albums..."
                    />
                    <div className="albums__buttons">
                        <button onClick={() => setShowAlbumModal(true)}>
                            Create New Album
                        </button>
                        <button onClick={() => setShowImageModal(true)}>
                            Upload Image
                        </button>
                    </div>
                </div>
                <h2 className="albums__heading">Your Albums</h2>
                {console.log(albums)}
                <div className="albums__display">
                    {
                        albums.map((album, i) => (
                            <Card
                                key={i}
                                heading={album.name}
                                imagesrc={album.album_cover}
                                description={album.description}
                                albumId={album.album_id}
                                onClick={() =>
                                    props.history.push({
                                        pathname: `/albums/${album.album_id}`,
                                        state: {
                                            user: user,
                                            album_name: album.name,
                                        },
                                    })
                                }
                            />
                        ))
                        // <div key={i} className="albums__display-box">
                        //     {/* <p>{album.name}</p>
                        //     <img
                        //         src={`uploads/${album.album_cover}`}
                        //         alt="album cover"
                        //     /> */}
                        //     <Card
                        //         heading={album.name}
                        //         imagesrc={album.album_cover}
                        //         description={album.description}
                        //     />
                        // </div>
                    }
                </div>
            </div>
        );
    };

    return (
        <Dashboard
            user={user}
            userId={userId}
            email={email}
            page={page}
            content={displayAlbumContent()}
        />
    );
};

export default withRouter(Albums);
