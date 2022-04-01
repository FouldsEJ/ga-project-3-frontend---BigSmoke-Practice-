import React from 'react';
import Map, { Marker } from 'react-map-gl';
import Heart from 'react-heart';
import { v4 as uuidv4 } from 'uuid';
import PlaceCard from './PlaceCard';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import Rating from '@mui/material/Rating';

import {
  getPlaceById,
  getPlaceByCategory,
  addLike,
  removeLike,
  addToItenerary,
  removeFromItenerary,
} from '../api/places';
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
  const [itineraryBut, setItineraryBut] = React.useState(true);
  const [category, setCategory] = React.useState(null);
  const [review, setReview] = React.useState(initialReview);
  const [allUsers, setAllUsers] = React.useState(null);

  const { id } = useParams();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  React.useEffect(() => {
    const getData = async () => {
      window.scrollTo(0, 0);
      const place = await getPlaceById(id);
      setSinglePlace(place);

      const categoryData = await getPlaceByCategory(place.category[0]);
      setCategory(categoryData);

      console.log(id);

      setItineraryBut(place.itenerary.includes(getLoggedInUserId()));
      setHeartActive(localStorage.getItem(id) === id);

      const allUsersData = await getAllUsers();

      setAllUsers(allUsersData);
      setTabIsActive(true);
    };

    getData();
  }, [id]);

  function handleTabClick(e) {
    setTabIsActive(!tabIsActive);
  }

  function getUserInfo(userId) {
    if (allUsers) {
      const userInfo = allUsers.find((data) => {
        return data._id === userId;
      });
      return userInfo;
    } else {
      console.log('No user info');
    }
  }

  function handleReviewChange(e) {
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
    setHeartActive(!heartActive);
    const pressedAlready = localStorage.getItem(id);
    if (pressedAlready) {
      const data = await removeLike(id);
      localStorage.removeItem(id);
      setSinglePlace(data);
    } else {
      const data = await addLike(id);
      localStorage.setItem(id, id);
      setSinglePlace(data);
    }
  }

  async function handleAddOrRemoveItinerary() {
    setItineraryBut(!itineraryBut);
    if (singlePlace.itenerary.includes(getLoggedInUserId())) {
      const data = await removeFromItenerary(id);
      setSinglePlace(data);
    } else {
      const data = await addToItenerary(id);
      setSinglePlace(data);
    }
  }

  if (!singlePlace) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className='section about-section'>
        <h1 className='title is-1 has-text-centered'>{singlePlace.name}</h1>
        <div className='columns'>
          <div className='column is-6 is-centered image-and-map-column'>
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

              <div
                className='heart container has-text-centered'
                style={{ width: '3rem' }}
              >
                <Heart
                  isActive={heartActive}
                  onClick={() => {
                    handleAddOrRemoveLike();
                  }}
                />
                <p
                  id='like-count'
                  onClick={() => {
                    handleAddOrRemoveLike();
                  }}
                >
                  {singlePlace.likes}
                </p>
              </div>
            </div>
            {!tabIsActive && (
              <div id='map-view'>
                <Map
                  initialViewState={{
                    latitude: singlePlace.lat,
                    longitude: singlePlace.long,
                    zoom: 12,
                  }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle='mapbox://styles/mapbox/streets-v9'
                  mapboxAccessToken={MAPBOX_TOKEN}
                >
                  <Marker
                    longitude={singlePlace.long}
                    latitude={singlePlace.lat}
                    color='red'
                  />
                </Map>
              </div>
            )}
          </div>

          {/* About Section */}
          <div className='column is-6'>
            <h2 className='title has-text-centered mt-6'>About</h2>
            <p className='content is-medium mb-6'>{singlePlace.description}</p>
            <div className='box about-details'>
              <div className='columns has-text-centered'>
                <div className='column is-6'>
                  <p className='subtitle'>
                    <span className='icon'>
                      <i className='fa-solid fa-clock'></i>
                    </span>
                    <span>
                      <strong>Opening Times:</strong> <br />
                      {singlePlace.openingTimes}
                    </span>
                  </p>
                  <p className='subtitle'>
                    <span className='icon'>
                      <i className='fa-solid fa-circle-info'></i>
                    </span>
                    <span>
                      <strong>Website</strong>
                      <br />
                      <a href={singlePlace.contact}>Click Here</a>
                    </span>
                  </p>
                </div>
                <div className='column is-6'>
                  <p className='subtitle'>
                    <span className='icon'>
                      <i className='fa-solid fa-train-subway'></i>
                    </span>
                    <span>
                      <strong>Tube Station(s):</strong>
                      <br />
                      {singlePlace.stationName.map((station) => (
                        <React.Fragment key={uuidv4()}>
                          <span key={uuidv4()}>{station} </span> <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </p>

                  <p className='subtitle'>
                    <span className='icon'>
                      <i className='fa-solid fa-file-lines'></i>
                    </span>
                    <span>
                      <strong>Category:</strong>
                      <br />
                      {singlePlace.category.map((category) => (
                        <React.Fragment key={uuidv4()}>
                          <span key={uuidv4()}>{category} </span> <br />
                        </React.Fragment>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {getLoggedInUserId() && (
              <div className='container has-text-centered mt-6'>
                <button
                  className='button has-text-centered is-info is-medium'
                  // className={
                  //   itineraryBut ? 'button is-outlined' : 'button is-info'
                  // }
                  onClick={handleAddOrRemoveItinerary}
                >
                  <span className='icon'>
                    <i className='fa-solid fa-clipboard-list'></i>
                  </span>
                  <span>
                    {itineraryBut
                      ? 'Remove from Itinerary'
                      : 'Add to Itinerary'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <hr className='about-hr' />

      {/* Add a Review */}
      <section className='section review-section'>
        <div className='box review-container'>
          <h2 className='title has-text-centered'>Reviews</h2>
          <div className='columns is-centered'>
            {getLoggedInUserId() && (
              <div className='column is-5'>
                <div className='form'>
                  <label htmlFor='rating' className='label'>
                    Rating:
                  </label>
                  <Rating
                    name='simple-controlled'
                    id='rating'
                    name='rating'
                    value={review?.rating}
                    onChange={handleReviewChange}
                  />
                  <label htmlFor='comment' className='label'>
                    Review:
                  </label>
                  <div className='field'>
                    <div className='control'>
                      <textarea
                        className='textarea'
                        placeholder='Comment here'
                        id='comment'
                        name='comment'
                        value={review?.comment}
                        onChange={handleReviewChange}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    className='button mt-3 is-info'
                    type='submit'
                    onClick={handleReviewSubmit}
                  >
                    <span className='icon'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </span>
                    <span>Leave a Review</span>
                  </button>
                </div>
              </div>
            )}

            <div className='column is-1'></div>
            {/* Displays the Reviews */}
            <div className='column is-5'>
              {!singlePlace.reviews.length && (
                <p>
                  No current reviews for this place. Please log in to leave one.
                </p>
              )}
              {!allUsers ? (
                <p>Loading...</p>
              ) : (
                singlePlace.reviews.map((review) => (
                  <div className='box' key={review._id}>
                    <article className='media'>
                      <div className='media-left'>
                        <figure className='image is-64x64'>
                          <img
                            src={getUserInfo(review.createdBy)?.image}
                            alt='User Profile Image'
                          />
                        </figure>
                      </div>
                      <div className='media-content'>
                        <div className='content'>
                          <Rating
                            name='read-only'
                            value={review.rating}
                            readOnly
                          />
                          <p>
                            <strong>
                              {getUserInfo(review.createdBy)?.name}
                            </strong>
                            <br />
                            {review.comment}
                          </p>
                        </div>
                      </div>
                      <div>
                        {(getLoggedInUserId() === review.createdBy ||
                          isAdmin()) && (
                          <button
                            type='button'
                            className='button is-danger is-small is-outlined'
                            onClick={() => handleDeleteReview(review._id)}
                          >
                            Delete Review
                          </button>
                        )}
                      </div>
                    </article>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <hr className='review-hr' />

      {/* Carousel Section */}
      <section className='section'>
        <p className='title has-text-centered'>Suggestions</p>
        <Splide
          options={{
            type: 'loop',
            perPage: 4,
            arrows: true | 'slider',
            pagination: false,
            drag: 'free',
            gap: '20px',
            breakpoints: {
              1024: {
                perPage: 3,
              },
              768: {
                perPage: 2,
              },
              500: {
                perPage: 1,
              },
            },
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
      </section>
    </>
  );
}

export default PlaceShow;
