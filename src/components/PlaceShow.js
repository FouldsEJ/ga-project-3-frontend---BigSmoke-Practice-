import React from 'react';
import Map, { Marker } from 'react-map-gl';
import Heart from 'react-heart';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Rating from '@mui/material/Rating';

import {
  getPlaceById,
  getPlaceByCategory,
  addLike,
  removeLike,
} from '../api/places';
import PlaceCard from './PlaceCard';
import { createReview, deleteReview } from '../api/reviews';
import { useParams } from 'react-router-dom';
import { getLoggedInUserId, isAdmin } from '../lib/auth';
import { getAllUsers } from '../api/auth';

const initialReview = {
  comment: '',
  rating: null,
};

function PlaceShow() {
  const [singlePlace, setSinglePlace] = React.useState(null);
  const [tabIsActive, setTabIsActive] = React.useState(true);
  const [heartActive, setHeartActive] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [review, setReview] = React.useState(initialReview);
  const [images, setImages] = React.useState(null);

  const [view, setViewport] = React.useState({
    latitude: 51.507351,
    longitude: -0.127758,
    zoom: 12,
  });
  const { id } = useParams();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  React.useEffect(() => {
    const getData = async () => {
      const place = await getPlaceById(id);
      setSinglePlace(place);

      const categoryData = await getPlaceByCategory(place.category);
      setCategory(categoryData);
      setViewport({ ...view, latitude: place.lat, longitude: place.long });
      setHeartActive(place.likes.includes(getLoggedInUserId()));
      const allUsers = await getAllUsers();
      setImages(allUsers);
    };

    getData();
  }, []);

  function handleTabClick(e) {
    setTabIsActive(!tabIsActive);
  }

  function getImage(user) {
    if (images) {
      const imageUrl = images.find((data) => {
        return data._id === user;
      });
      return imageUrl.image;
    } else {
      console.log('no images');
    }
  }

  function handleReviewChange(e) {
    console.log(e.target.value);
    console.log('ID: ', e.target.name);
    const value = e.target.value;
    const sanitisedVal = e.target.name === 'comment' ? value : parseInt(value);
    setReview({ ...review, [e.target.name]: sanitisedVal });
  }

  async function handleReviewSubmit(e) {
    e.preventDefault();
    const data = await createReview(id, review);
    setReview(initialReview);
    setSinglePlace(data);
  }

  async function handleDeleteReview(reviewId) {
    const data = await deleteReview(id, reviewId);
    setSinglePlace(data);
  }

  async function handleAddOrRemoveLike() {
    if (getLoggedInUserId()) {
      setHeartActive(!heartActive);
      if (singlePlace.likes.includes(getLoggedInUserId())) {
        const data = await removeLike(id);
        setSinglePlace(data);
      } else {
        const data = await addLike(id);
        setSinglePlace(data);
      }
    }
  }
  console.log('Create Review: ', review);

  if (!singlePlace) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className="m-6">
        <h1 className="title has-text-centered">{singlePlace.name}</h1>
        <div className="columns">
          <div className="column is-6 is-centered image-and-map-column">
            <div className="tabs is-boxed">
              <ul>
                <li
                  className={tabIsActive ? 'is-active' : ''}
                  data-target="image"
                  onClick={handleTabClick}
                >
                  <a>Image</a>
                </li>
                <li
                  className={tabIsActive ? '' : 'is-active'}
                  data-target="map"
                  onClick={handleTabClick}
                >
                  <a>Map</a>
                </li>
              </ul>
            </div>
            <div id="image-view" className={tabIsActive ? '' : 'is-hidden'}>
              <figure className="image">
                <img src={singlePlace.image} alt={singlePlace.name} />
              </figure>
            </div>
            {!tabIsActive && (
              <div id="map-view">
                <Map
                  initialViewState={{ ...view }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken={MAPBOX_TOKEN}
                  onViewportChange={(viewport) => setViewport(viewport)}
                >
                  <Marker
                    longitude={singlePlace.long}
                    latitude={singlePlace.lat}
                    color="red"
                  />
                </Map>
              </div>
            )}
            <div className="is-centered">
              <div className="heart is-centered" style={{ width: '3rem' }}>
                <Heart
                  isActive={heartActive}
                  onClick={() => {
                    handleAddOrRemoveLike();
                  }}
                />
                <p
                  id="like-count"
                  onClick={() => {
                    handleAddOrRemoveLike();
                  }}
                >
                  {singlePlace.likes.length}
                </p>
              </div>
            </div>
          </div>
          <div className="column is-6">
            <h2 className="title has-text-centered">About</h2>
            <p>{singlePlace.description}</p>
            <div className="columns has-text-centered">
              <div className="column">
                <p>{singlePlace.openingTimes}</p>
                <p>{singlePlace.contact}</p>
              </div>
              <div className="column">
                <p>{singlePlace.stationName}</p>
                <p>{singlePlace.category}</p>
              </div>
            </div>
            <hr />
            <h2 className="title has-text-centered">Reviews</h2>
            {console.log(getLoggedInUserId())}
            {getLoggedInUserId() && (
              <div className="form">
                <label htmlFor="rating" className="label">
                  Rating:
                </label>
                <Rating
                  name="simple-controlled"
                  id="rating"
                  name="rating"
                  value={review?.rating}
                  onChange={handleReviewChange}
                />
                <label htmlFor="comment" className="label">
                  Review:
                </label>
                <textarea
                  type="text"
                  id="comment"
                  name="comment"
                  className="input"
                  value={review?.comment}
                  onChange={handleReviewChange}
                />
                <button
                  className="button mt-3"
                  type="submit"
                  onClick={handleReviewSubmit}
                >
                  Leave a Review
                </button>
              </div>
            )}
            <div className="container">
              {singlePlace.reviews.map((review) => (
                <div className="box" key={review._id}>
                  <Rating name="read-only" value={review.rating} readOnly />
                  {(getLoggedInUserId() === review.createdBy || isAdmin()) && (
                    <button
                      type="button"
                      className="button is-danger is-small is-outlined"
                      onClick={() => handleDeleteReview(review._id)}
                    >
                      Delete Review
                    </button>
                  )}
                  <p>{review.comment}</p>
                  <p>Reviewed by: {review.createdBy}</p>
                  <div>
                    <img
                      className="reviewPicture"
                      src={getImage(review.createdBy)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hero is-halfheight is-light">
        <div className="hero-body ">
          <div className="container">
            <p className="title">Most popular</p>
            <Splide
              options={{
                perPage: 3,
                rewind: true,
                arrows: true,
                pagination: false,
                drag: 'free',
                gap: '5px',
              }}
            >
              {category ? (
                category.map((place) => (
                  <SplideSlide key={place._id}>
                    <PlaceCard key={place._id} {...place} />
                  </SplideSlide>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </Splide>
          </div>
        </div>
      </section>
    </>
  );
}

export default PlaceShow;
