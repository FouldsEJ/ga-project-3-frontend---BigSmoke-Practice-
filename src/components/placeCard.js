import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ _id, name, image, stationName }) => {
  return (
    <Link to={`/explore/${_id}`}>
      <div className='card placecards'>
        {/* <div className='card-header'>
          <h2 className='card-header-title is-centered'>{name}</h2>
        </div> */}
        <div className='card-image has-text-centered'>
          <figure className='image  is-4by3 '>
            <img className='imagecard' src={image} alt={name} />
          </figure>
        </div>
        <div className='image-card-overlay'>
          <h1>{name}</h1>
        </div>
        {/* <div className='card-content has-text-centered'>
          <p className='subtitle is-6'>
            Nearest station: <br /> <strong>{stationName[0]}</strong>
          </p>
        </div> */}
      </div>
    </Link>
  );
};
export default PlaceCard;
