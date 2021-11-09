import React from "react";
import Dashboard from "./Dashboard";
import { isAuthenticated } from "../auth";
import def from '../images/default.png';

const Profile = (props) => {

    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;
    const token = isAuthenticated().token;

    const displayProfileContent = () => {
        return (
            <div className="profile">
                <div className="profile__photobox">
                    <div className="profile__photobox-photo">
                        <img src={def} alt="profile photo" />
                    </div>
                    <h2 className="profile__photobox-name">

                    </h2>
                    <h3 className="profile__photobox-location">

                    </h3>
                </div>
                <div className="profile__info">
                    <div className="profile__info-name">
                        <label htmlFor="full_name">Full Name</label>
                        <input type="text" id="full_name" />
                    </div>
                    <div className="profile__info-username">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="profile__info-email">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" />
                    </div>
                    <div className="profile__info-phone">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" id="phone" />
                    </div>
                    <div className="profile__info-location">
                        <label htmlFor="location">Location</label>
                        <input type="text" id="location" />
                    </div>
                </div>
                <div className="profile__itemsForSale">

                </div>
            </div>
        );
    }

    return <Dashboard user={user} userId={userId} page={page} content={displayProfileContent()} />;
};

export default Profile;