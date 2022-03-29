import React from 'react';
import Map, { Marker, FullscreenControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useNavigate } from 'react-router-dom';

import { getAllPlaces } from '../api/places';

function MapSearch() {
  const [places, setPlaces] = React.useState(null);
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

  function handleMarkerClick(placeId) {
    console.log(placeId);
    navigate(`/explore/${placeId}`);
  }

  if (!places) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Map Page</h1>
      <div>
        <Map
          initialViewState={{
            latitude: 51.507351,
            longitude: -0.127758,
            zoom: 14,
          }}
          style={{ width: 800, height: 600 }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={MAPBOX_TOKEN}
          attributionControl={false}
        >
          <FullscreenControl />
          {places.map((place) => (
            <Marker
              key={place._id}
              longitude={place.long}
              latitude={place.lat}
              color='red'
              onClick={() => handleMarkerClick(place._id)}
            />
          ))}
        </Map>
      </div>
    </>
  );
}

export default MapSearch;
