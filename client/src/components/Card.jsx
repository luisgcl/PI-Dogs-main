import React from "react";

export default function Card({ name, image, height, weight, temperament }) {
    return (
        <div>
            <h3>{name}</h3>
            <img src={image.url || image} alt="img not found" width="200px" height="250px" />
            <h4>{height.metric || height}</h4>
            <h6>{weight.metric || weight}</h6>
            <h5>{temperament}</h5>
        </div>
    );
}