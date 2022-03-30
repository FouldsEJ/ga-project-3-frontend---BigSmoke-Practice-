import React from 'react';
import { getPlacesLiked } from '../api/places.js';
import PlaceCard from './PlaceCard.js';
import { getLoggedInUserId, getLoggedInUserName } from '../lib/auth.js';
//import { getImage, postImage } from '../api/auth.js';
import { getUser } from '../api/auth.js';
import { removeLike } from '../api/places.js';

function ProfilePage() {
  const userName = getLoggedInUserName();
  const userId = getLoggedInUserId();
  const [likedPlace, setlikedPlace] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [imageData, setImageData] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const likedPlaces = await getPlacesLiked(userId);
      setlikedPlace(likedPlaces);
      const user = await getUser(userId);
      setProfilePicture(user.image);
      //const userImage = await getImage(userId);
      //setProfilePicture(userImage);
    };
    getData();
  }, []);

  function deletePlace(place) {
    const getData = async () => {
      await removeLike(place);
      const likedPlaces = await getPlacesLiked(userId);
      setlikedPlace(likedPlaces);
    };
    getData();
  }

  const handleUpload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: process.env.CLOUD_NAME,
          uploadPreset: process.env.UPLOAD_PRESET,
          cropping: true
        },
        (err, result) => {
          if (result.event !== 'success') {
            return;
          }
          setImageData({
            url: result.info.secure_url,
            user: userId
          });
        }
      )
      .open();
  };

  async function handleSubmit() {
    setProfilePicture(imageData);
  }

  return (
    <>
      <div className='container has-text-centered'>
        <div className='column is-half is-offset-one-quarter profile-text'>
          Welcome back {!userName ? 'Random man' : userName}!
        </div>
        {!profilePicture ? (
          <div>
            <button className='button' onClick={handleUpload}>
              Click to upload an image
            </button>
            <button className='button' onClick={handleSubmit}>
              Submit and return
            </button>
          </div>
        ) : (
          <img src={profilePicture} className='image-card profilePicture' />
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
                    <button
                      className='delete'
                      onClick={() => deletePlace(place._id)}
                    ></button>

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
