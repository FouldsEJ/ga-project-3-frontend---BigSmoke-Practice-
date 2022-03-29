import React from 'react';
import { getPlacesLiked } from '../api/places.js';
import PlaceCard from './placeCard.js';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth.js';

function ProfilePage() {
  const userName = getLoggedInUserName();
  const userId = getLoggedInUserId();
  const [likedPlace, setlikedPlace] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const likedPlaces = await getPlacesLiked(userId);
      setlikedPlace(likedPlaces);
    };
    getData();
  }, []);

  return (
    <>
      <div className='container has-text-centered'>
        <div className='column is-half is-offset-one-quarter profile-text'>
          Welcome back {!userName ? 'Random man' : userName}!
        </div>
      </div>

      <div className='itinerary-box column is-half is-offset-one-quarter box'>
        <h2>Your Travel Intinerary</h2>
        <div>
          {!likedPlace ? (
            <p>Loading itinerary..</p>
          ) : (
            <div className='container'>
              <div className='columns is-multiline'>
                {likedPlace.map((place) => (
                  <div
                    className='column is-one-quarter-desktop is-half-tablet is-one-mobile'
                    key={place._id}
                  >
                    <PlaceCard {...place} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
