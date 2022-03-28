import React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { getPlaceById } from '../api/places';
import { useParams } from 'react-router-dom';

function PlaceShow() {
  const [singlePlace, setSinglePlace] = React.useState(null);
  const [reviewValues, setReviewValues] = React.useState(null);
  const { id } = useParams();
  const MAPBOX_TOKEN = `${process.env.MAP_BOX_ACCESS_TOKEN}`;
  console.log(process.env.MAP_BOX_ACCESS_TOKEN);
  console.log(process.env.MAP_BOX_TOKEN);

  React.useEffect(() => {
    const getData = async () => {
      const place = await getPlaceById(id);
      setSinglePlace(place);
    };

    getData();
  }, []);

  if (!singlePlace) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section>
        <div className='columns'>
          <div className='column'>
            <figure className='image'>
              <img src={singlePlace.image} alt={singlePlace.name} />
            </figure>
          </div>
          <div className='column'>
            <h1 className='title'>{singlePlace.name}</h1>
            <p>{singlePlace.description}</p>
          </div>
        </div>
      </section>
      <div className='container'>
        <Map
          initialViewState={{
            latitude: 37.8,
            longitude: -122.4,
            zoom: 14,
          }}
          style={{ width: 800, height: 600 }}
          mapStyle='mapbox://styles/mapbox/streets-v9'
          mapboxAccessToken={MAPBOX_TOKEN}
        ></Map>
      </div>
    </>
  );
}

export default PlaceShow;
