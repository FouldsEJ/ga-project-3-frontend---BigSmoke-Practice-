import React from 'react';
import { getItinerary, removeFromItenerary } from '../api/places.js';
import PlaceCard from './PlaceCard.js';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth.js';
//import { getImage, postImage } from '../api/auth.js';
import { getUser } from '../api/auth.js';

function ProfilePage() {
  const userName = getLoggedInUserName();
  const userId = getLoggedInUserId();
  const [myPlace, setMyPlace] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const myPlaces = await getItinerary(userId);
      setMyPlace(myPlaces);
      const user = await getUser(userId);
      setProfilePicture(user.image);
    };
    getData();
  }, []);

  function deletePlace(place) {
    const getData = async () => {
      await removeFromItenerary(place);
      const myPlaces = await getItinerary(userId);
      setMyPlace(myPlaces);
    };
    getData();
  }

  if (!myPlace) {
    return <p>Loading places ... </p>;
  } else {
    return (
      <>
        <section>
          <div className='profile-background'>
            <div className='has-text-centered profile-section'>
              <div className='column profile-text'>
                Welcome back {!userName ? 'Random man' : userName}!
              </div>
              {!profilePicture ? (
                <div>
                  <p>No Photo</p>
                </div>
              ) : (
                <img
                  src={profilePicture}
                  className='image-card profilePicture'
                />
              )}
            </div>
            <div className='itinerary-box'>
              <h2 className='subtitle has-text-centered profile-bit'>
                Your Travel Intinerary
              </h2>
              <div>
                <div className='container'>
                  <div className='columns is-multiline travel-itin'>
                    {myPlace.map((place) => (
                      <div
                        className='column is-one-quarter-desktop is-half-tablet is-one-mobile'
                        key={place._id}
                      >
                        <button
                          className='delete'
                          onClick={() => deletePlace(place._id)}
                        ></button>

                        <PlaceCard {...place} />
                      </div>
                    ))}
                    {!myPlace.length && (
                      <div className='container'>
                        <p className='column has-text-centered'>
                          Head to the explore page to add a place to your
                          itinerary
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ProfilePage;
