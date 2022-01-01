import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { listPhotosByAlbum } from "../auth/photo";

const Photos = (props) => {
    const [photos, setPhotos] = useState([]);

    const user = props.location.state.user;

    useEffect(() => {
        loadPhotos();
    });

    const loadPhotos = () => {
        listPhotosByAlbum(props.match.params.albumId).then((data) => {
            if (!data.err) {
                setPhotos(data.map((obj) => obj.photo));
            }
        });
    };

    const displayAlbumContent = () => {
        return (
            <div className="photos">
                <div className="photos__header">
                    <button
                        className="photos__header-button"
                        onClick={() => props.history.goBack()}
                    >
                        &#8592; Back
                    </button>
                    <h2 className="photos__heading">
                        {props.location.state.album_name}
                    </h2>
                    <button className="albums_buttons">Upload Image</button>
                </div>
                <div className="photos__display">
                    {photos.map((photo, i) => (
                        <div className="photos__imagebox" key={i}>
                            <img
                                className="photos__image"
                                src={`/uploads/${photo}`}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const displayNone = () => {
        return (
            <div className="photos">
                <div className="photos__header">
                    <button
                        className="photos__header-button"
                        onClick={() => props.history.goBack()}
                    >
                        &#8592; Back
                    </button>
                    <h2 className="photos__heading">
                        {props.location.state.album_name}
                    </h2>
                </div>
                <div className="photos__display">
                    <h2 className="photos__display-none">
                        This Album is empty.
                    </h2>
                </div>
            </div>
        );
    };

    if (!props.location) {
        return null;
    }

    // return <div>{props.match.params.albumId}</div>;
    return (
        <Dashboard
            user={user}
            content={
                photos.length === 0 ? displayNone() : displayAlbumContent()
            }
        />
    );
};

export default Photos;
