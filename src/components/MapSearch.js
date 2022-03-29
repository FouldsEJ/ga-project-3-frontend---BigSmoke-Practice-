import React from 'react';
import Map, { Marker, FullscreenControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';

import { getAllPlaces } from '../api/places';
import { keys } from '@mui/system';

function MapSearch() {
  const [places, setPlaces] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

  const navigate = useNavigate();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  React.useEffect(() => {
    const getData = async () => {
      try {
        const placeData = await getAllPlaces();
        setPlaces(placeData);
      } catch (err) {
        console.log('Get all places error: ', err);
      }
    };
    getData();
  }, []);

  function handlePopUpClick(placeId) {
    navigate(`/explore/${placeId}`);
  }

  if (!places) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className='section has-text-centered'>
        <Map
          initialViewState={{
            latitude: 51.507351,
            longitude: -0.127758,
            zoom: 10,
          }}
          style={{ width: 800, height: 600 }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
        >
          <FullscreenControl />
          {places.map((place) => (
            <React.Fragment key={place._id}>
              {/* {setShowPopup({ ...showPopup, [place._id]: true })} */}
              <Marker
                longitude={place.long}
                latitude={place.lat}
                color='red'
                onClick={() => setShowPopup(place._id)}
              />

              {showPopup && (
                <Popup
                  longitude={place.long}
                  latitude={place.lat}
                  anchor='bottom'
                  onClose={() => setShowPopup(false)}
                >
                  <h2>{place.name}</h2>
                  <button
                    className='button is-link is-light is-small'
                    onClick={() => handlePopUpClick(place._id)}
                  >
                    See more....
                  </button>
                  <img src={place.image} alt={place.name} />
                </Popup>
              )}
            </React.Fragment>
          ))}
        </Map>
      </div>
    </>
  );
}

export default MapSearch;
