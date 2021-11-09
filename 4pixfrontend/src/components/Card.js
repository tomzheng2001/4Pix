import React from "react";

const Card = (props) => {
    return (
        <div className="card" onClick={props.onClick}>
            <div className="card__front">
                {console.log(props.imagesrc)}
                <img
                    className="card__front-image"
                    src={`./../uploads/${props.imagesrc}`}
                    alt="album cover"
                />
                <p className="card__front-heading">{props.heading}</p>
            </div>
            <div className="card__back">
                <p>{props.description}</p>
            </div>
        </div>
    );
};

export default Card;
