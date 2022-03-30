import React from 'react';
import { getPlacesLiked } from '../api/places.js';
import PlaceCard from './PlaceCard.js';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth.js';
import { getImage } from '../api/auth.js';

function ProfilePage() {
  const userName = getLoggedInUserName();
  const userId = getLoggedInUserId();
  const [likedPlace, setlikedPlace] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const likedPlaces = await getPlacesLiked(userId);
      setlikedPlace(likedPlaces);
      const userImage = await getImage(userId);
      setProfilePicture(userImage);
    };
    getData();
  }, []);

  return (
    <>
      <div className='container has-text-centered'>
        <div className='column is-half is-offset-one-quarter profile-text'>
          Welcome back {!userName ? 'Random man' : userName}!
        </div>
        {!profilePicture ? (
          <img
            className='image-card profilePicture'
            src='https://t3.ftcdn.net/jpg/01/12/82/52/360_F_112825244_152xDIhocAe4oEeY5P45yhELTLzIqlSh.jpg'
          />
        ) : (
          <img src={profilePicture.url} className='image-card profilePicture' />
        )}
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
