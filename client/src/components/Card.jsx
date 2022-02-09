import React from "react";

export default function Card({ name, image, weight, temperament }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image.url} alt="img not found" width="200px" height="250px" />
            <h5>{weight.metric}</h5>
            <h5>{temperament}</h5>
        </div>
    );
}