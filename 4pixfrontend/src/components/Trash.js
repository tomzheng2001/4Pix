import React from "react";
import Dashboard from "./Dashboard";

const Trash = (props) => {

    const user = props.location.state.user;
    const userId = props.location.state.userId;
    const page = props.location.state.page;

    const displayTrashContent = () => {
        return (
            <div>
                <h1>Trash</h1>
            </div>
            
        );
    }

    return <Dashboard user={user} userId={userId} page={page} content={displayTrashContent()} />;
};

export default Trash;