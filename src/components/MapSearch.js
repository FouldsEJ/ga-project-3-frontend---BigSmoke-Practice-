import React from 'react';
import Map, { Marker, FullscreenControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';

function MapSearch(props) {
  const [showPopup, setShowPopup] = React.useState(null);

  const navigate = useNavigate();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  // function handlePopUpClick(placeId) {
  //   navigate(`/explore/${placeId}`);
  // }

  // function setColour(category) {
  //   console.log(category);
  //   switch (category) {
  //     case 'arts/culture':
  //       return 'red';
  //     case 'entertainment':
  //       return 'yellow';
  //     case 'food/drink':
  //       return 'green';
  //     case 'outdoors':
  //       return 'orange';
  //     case 'shopping':
  //       return 'pink';
  //     default:
  //       return 'black';
  //   }
  // }

  if (!props.filteredPlace) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Map
        initialViewState={{
          latitude: 51.507351,
          longitude: -0.127758,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        mapboxAccessToken={MAPBOX_TOKEN}
        attributionControl={false}
        onClick={() => setShowPopup(null)}
      >
        <FullscreenControl />
        {props.filteredPlace.map((place) => (
          <Marker
            key={place._id}
            longitude={place.long}
            latitude={place.lat}
            color='#6795c1'
            onClick={() => setShowPopup(place)}
            onMouseOut={() => setShowPopup(null)}
          />
        ))}
        {console.log('SHow pop up: ', showPopup)}
        {showPopup && (
          <Popup
            longitude={showPopup.long}
            latitude={showPopup.lat}
            anchor='bottom'
            // onClose={() => setShowPopup(false)}
          >
            <h2>{showPopup.name}</h2>
            <button
              className='button is-link is-light is-small'
              onClick={() => handlePopUpClick(showPopup._id)}
            >
              See more....
            </button>
            <img src={showPopup.image} alt={showPopup.name} />
          </Popup>
        )}
      </Map>
    </>
  );
}

export default MapSearch;
