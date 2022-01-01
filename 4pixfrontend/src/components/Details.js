import React from "react";
import Dashboard from "./Dashboard";

const Details = (props) => {

    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;

    const displayDetailsContent = () => {
        return (
            <div>
                <h1>Details</h1>
            </div>
            
        );
    }

    return <Dashboard user={user} userId={userId} page={page} content={displayDetailsContent()} />;
};

export default Details;