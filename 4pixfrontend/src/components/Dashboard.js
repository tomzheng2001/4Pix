import React from "react";
import { Link } from "react-router-dom";
import "../sass/main.scss";

const logo_url =
    "https://mlbzn7n4sphe.i.optimole.com/MU3uIw0-MAWrfCfc/w:auto/h:auto/q:75/https://www.kadencewp.com/wp-content/uploads/2020/10/alogo-1.svg";

const Dashboard = (props) => {
    const user = props.user;
    const userId = props.userId;
    const page = props.page;
    const email = props.email;

    // const redirectToAlbums = () => {
    //     return (
    //         <Redirect
    //             to={{
    //                 pathname: "/albums",
    //                 state: { user: user },
    //             }}
    //         />
    //     );
    // };
    const onProfile = () => {
        return (
            <Link to={{
                pathname: "/profile",
                state: { user: user,
                        userId: userId,
                        email: email,
                        page: "profile"
                     }
            }}
                style={{ background: '#815ff9' }}
                href="#">
                <svg
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="30px"
                    height="30px"
                >
                    {" "}
                    <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z" />
                </svg>
                Profile
            </Link>
        )
    }

    const onAlbum = () => {
        return (
            <Link to={{
                pathname: "/albums",
                state: { user: user,
                        userId: userId,
                        email: email,
                        page: "album" }
            }}  
                style={{ background: '#815ff9' }}
                href="/albums">
                <svg
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                >
                    {" "}
                    <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M5,17l3.5-4.5 l2.5,3.01L14.5,11l4.5,6H5z" />
                </svg>
                Albums
            </Link> )
    }

    const onCategories = () => {
        return (
            <Link to={{
                pathname: "/categories",
                state: { user: user,
                        userId: userId,
                        email: email,
                        page: "categories" }
                }}
                style={{ background: '#815ff9' }}
                href="#">
                <svg
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="30px"
                    height="30px"
                >
                    {" "}
                    <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z" />
                </svg>
                Categories
            </Link>
        )
    }

    const onDetails = () => {
        return (
            <Link 
                    to={{
                        pathname: "/details",
                        state: { user: user,
                                userId: userId,
                                email: window.em,
                                page: "details" }
                    }}
                    style={{ background: '#815ff9' }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        <path d="M 2 3 L 2 18 C 2 19.654 3.346 21 5 21 L 19 21 C 20.64497 21 22 19.64497 22 18 L 22 7 L 20 7 L 20 18 C 20 18.56503 19.56503 19 19 19 C 18.448 19 18 18.551 18 18 L 18 3 L 2 3 z M 6 6 L 14 6 L 14 9 L 6 9 L 6 6 z M 6 12 L 14 12 L 14 14 L 6 14 L 6 12 z M 6 16 L 14 16 L 14 18 L 6 18 L 6 16 z" />
                    </svg>
                    Details
                </Link>
        )
    }

    const onTrash = () => {
        return (
            <Link 
                    to={{
                        pathname: "/trash",
                        state: { user: user,
                                userId: userId,
                                email: window.em,
                                page: "trash" }
                    }}
                    style={{ background: '#815ff9' }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        {" "}
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 7 5 L 17 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z" />
                    </svg>
                    Trash
                </Link>
        )
    }

    return (
        <div className="dashboard">
            <nav className="dashboard__topnav">
                <img src={logo_url} alt="logo" />
                <input placeholder="Search..." type="text" />
                <h3>{user}</h3>
            </nav>

            <nav className="dashboard__sidebar">
                {page === 'profile' ? onProfile() :
                <Link to={{
                    pathname: "/profile",
                    state: { user: user,
                            userId: userId,
                            email: email,
                            page: "profile" }
                }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 30 30"
                        width="30px"
                        height="30px"
                    >
                        {" "}
                        <path d="M 15 2 A 1 1 0 0 0 14.300781 2.2851562 L 3.3925781 11.207031 A 1 1 0 0 0 3.3554688 11.236328 L 3.3183594 11.267578 L 3.3183594 11.269531 A 1 1 0 0 0 3 12 A 1 1 0 0 0 4 13 L 5 13 L 5 24 C 5 25.105 5.895 26 7 26 L 23 26 C 24.105 26 25 25.105 25 24 L 25 13 L 26 13 A 1 1 0 0 0 27 12 A 1 1 0 0 0 26.681641 11.267578 L 26.666016 11.255859 A 1 1 0 0 0 26.597656 11.199219 L 25 9.8925781 L 25 6 C 25 5.448 24.552 5 24 5 L 23 5 C 22.448 5 22 5.448 22 6 L 22 7.4394531 L 15.677734 2.2675781 A 1 1 0 0 0 15 2 z M 18 15 L 22 15 L 22 23 L 18 23 L 18 15 z" />
                    </svg>
                    Profile
                </Link> }
                {page === 'album' ? onAlbum() :
                <Link to={{
                    pathname: "/albums",
                    state: { user: user,
                            userId: userId,
                            email: email,
                            page: "album" }
                }} href="/albums">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        {" "}
                        <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M5,17l3.5-4.5 l2.5,3.01L14.5,11l4.5,6H5z" />
                    </svg>
                    Albums
                </Link> }
                {page === 'categories' ? onCategories() :
                <Link to={{
                    pathname: "/categories",
                    state: { user: user,
                            userId: userId,
                            email: email,
                            page: "categories" }
                    }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        {" "}
                        <path d="M20,6h-8l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z" />
                    </svg>
                    Categories
                </Link> }
                {page === 'details' ? onDetails() :
                <Link 
                    to={{
                        pathname: "/details",
                        state: { user: user,
                                userId: userId,
                                email: email,
                                page: "details" }
                    }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        <path d="M 2 3 L 2 18 C 2 19.654 3.346 21 5 21 L 19 21 C 20.64497 21 22 19.64497 22 18 L 22 7 L 20 7 L 20 18 C 20 18.56503 19.56503 19 19 19 C 18.448 19 18 18.551 18 18 L 18 3 L 2 3 z M 6 6 L 14 6 L 14 9 L 6 9 L 6 6 z M 6 12 L 14 12 L 14 14 L 6 14 L 6 12 z M 6 16 L 14 16 L 14 18 L 6 18 L 6 16 z" />
                    </svg>
                    Details
                </Link> }
                {page === 'trash' ? onTrash() :
                <Link 
                    to={{
                        pathname: "/trash",
                        state: { user: user,
                                userId: userId,
                                email: email,
                                page: "trash" }
                    }}
                    href="#">
                    <svg
                        fill="#000000"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30px"
                        height="30px"
                    >
                        {" "}
                        <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 7 5 L 17 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z" />
                    </svg>
                    Trash
                </Link> }
            </nav>

            <div className="dashboard__content">{props.content}</div>
        </div>
    );
};

export default Dashboard;
