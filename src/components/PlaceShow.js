import React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Rating from '@mui/material/Rating';

import { getPlaceById } from '../api/places';
import { createReview } from '../api/reviews';
import { useParams } from 'react-router-dom';

function PlaceShow() {
  const [singlePlace, setSinglePlace] = React.useState(null);
  const [tabIsActive, setTabIsActive] = React.useState(true);
  const [review, setReview] = React.useState('');
  const { id } = useParams();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  React.useEffect(() => {
    const getData = async () => {
      const place = await getPlaceById(id);
      setSinglePlace(place);
    };

    getData();
  }, []);

  function handleTabClick(e) {
    setTabIsActive(!tabIsActive);
  }

  function handleReviewChange(e) {
    console.log(e.target.value);
    console.log('ID: ', e.target.id);
    setReview({ ...review, [e.target.id]: e.target.value });
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    await createReview(id, review);
  }

  console.log('Reivew: ', review);

  if (!singlePlace) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className='m-6'>
        <h1 className='title has-text-centered'>{singlePlace.name}</h1>
        <div className='columns'>
          <div className='column is-6'>
            <div className='tabs is-boxed'>
              <ul>
                <li
                  className={tabIsActive ? 'is-active' : ''}
                  data-target='image'
                  onClick={handleTabClick}
                >
                  <a>Image</a>
                </li>
                <li
                  className={tabIsActive ? '' : 'is-active'}
                  data-target='map'
                  onClick={handleTabClick}
                >
                  <a>Map</a>
                </li>
              </ul>
            </div>
            <div id='image-view' className={tabIsActive ? '' : 'is-hidden'}>
              <figure className='image'>
                <img src={singlePlace.image} alt={singlePlace.name} />
              </figure>
            </div>
            <div id='map-view' className={tabIsActive ? 'is-hidden' : ''}>
              <Map
                initialViewState={{
                  latitude: singlePlace.lat,
                  longitude: singlePlace.long,
                  zoom: 14,
                }}
                style={{ width: 800, height: 600 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker
                  longitude={singlePlace.lat}
                  latitude={singlePlace.long}
                  color='red'
                />
              </Map>
            </div>
            <div className='has-text-centered'>
              <p>{singlePlace.likes}</p>
            </div>
          </div>
          <div className='column is-6'>
            <h2 className='title has-text-centered'>About</h2>
            <p>{singlePlace.description}</p>
            <div className='columns has-text-centered'>
              <div className='column'>
                <p>{singlePlace.openingTimes}</p>
                <p>{singlePlace.contact}</p>
              </div>
              <div className='column'>
                <p>{singlePlace.stationName}</p>
                <p>{singlePlace.category}</p>
              </div>
            </div>

            <hr />
            <h2 className='title has-text-centered'>Reviews</h2>
            <div className='form'>
              <label htmlFor='rating' className='label'>
                Rating:
              </label>
              <Rating
                name='simple-controlled'
                id='rating'
                name='rating'
                value={review.rating}
                onChange={handleReviewChange}
              />
              <label htmlFor='comment' className='label'>
                Review:
              </label>
              <textarea
                type='text'
                id='comment'
                className='input'
                value={review.comment}
                onChange={handleReviewChange}
              />
              <button
                className='button mt-3'
                type='submit'
                onClick={handleReviewSubmit}
              >
                Leave a Review
              </button>
            </div>
            <p>{singlePlace.reviews.rating}</p>
            <p>{singlePlace.reviews.comment}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlaceShow;
