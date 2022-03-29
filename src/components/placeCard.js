import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ _id, name, image, stationName }) => {
  return (
    <div className='card placecards'>
      <Link to={`/explore/${_id}`}>
        <h2 className='card-header-title'>{name}</h2>
        <div className='card-image'>
          <figure className='image is-4by3'>
            <img src={image} alt={name} />
          </figure>
        </div>
      </Link>
      <p>
        Nearest station: <strong>{stationName}</strong>
      </p>
    </div>
  );
};
export default PlaceCard;
