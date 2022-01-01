import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import def from '../images/default.png';
import { listAllAlbums } from "../auth/album";
import Card from "./Card";

const Profile = (props) => {

    const [albums, setAlbums] = useState([]);

    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;
    const email = props.location.state.email;
    window.em = email;

    useEffect(() => {
        loadAlbums();
    });

    const loadAlbums = () => {
        listAllAlbums(userId).then((data) => {
            if (!data.err) {
                setAlbums(data);
            }
        });
    };

    const displayProfileContent = () => {
        return (
            <div className="profile">
                    <div className="profile__photobox">
                        <div className="profile__photobox-photo">
                            <img src={def} alt="" />
                        </div>
                        <h2 className="profile__photobox-name">
                            Default Name
                        </h2>
                        <h3 className="profile__photobox-location">
                            Los Angeles, California
                        </h3>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__info-heading">Contact Info</h1>
                        <ul className="profile__info-list">
                            <li className="profile__info-list-name">
                                <label htmlFor="phone">Full Name</label>
                                {/* <input type="text" id="phone" /> */}
                                <h3 id="phone">Default Name</h3>
                            </li>
                            <li className="profile__info-list-email">
                                <label htmlFor="email">Email</label>
                                {/* <input type="text" id="phone" /> */}
                                <h3 id="email">{window.em}</h3>
                            </li>
                            <li className="profile__info-list-phone">
                                <label htmlFor="phone">Phone</label>
                                {/* <input type="text" id="phone" /> */}
                                <h3 id="phone">7077164596</h3>
                            </li>
                            <li className="profile__info-list-location">
                                <label htmlFor="location">Location</label>
                                {/* <input type="text" id="phone" /> */}
                                <h3 id="location">Default, California</h3>
                            </li>
                        </ul>
                        <button>Edit</button>
                    </div>
                <div className="profile__itemsForSale">
                    <div className="profile__itemsForSale-heading">Listings</div>
                    <div className="profile__itemsForSale-albums">
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
                        }
                    </div>
                </div>
            </div>
        );
    }

    return <Dashboard user={user} userId={userId} email={window.em} page={page} content={displayProfileContent()} />;
};

export default Profile;