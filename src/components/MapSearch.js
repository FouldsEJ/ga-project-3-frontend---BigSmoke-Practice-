import React from 'react';
import Map, { Marker, FullscreenControl, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';

function MapSearch(props) {
  const [showPopup, setShowPopup] = React.useState(false);

  const navigate = useNavigate();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;

  function handlePopUpClick(placeId) {
    navigate(`/explore/${placeId}`);
  }

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
      >
        <FullscreenControl />
        {props.filteredPlace.map((place) => (
          <React.Fragment key={place._id}>
            {/* {setShowPopup({ ...showPopup, [place._id]: true })} */}
            <Marker
              longitude={place.long}
              latitude={place.lat}
              color='blue'
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
    </>
  );
}

export default MapSearch;
