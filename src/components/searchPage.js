import React from 'react';
import { getAllPlaces } from '../api/places.js';
import { getPlaceByCategory } from '../api/places.js';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [place, setPlace] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      const placeData = await getAllPlaces();
      setPlace(placeData);
    };
    getData();
  }, []);

  function getCategories(event) {
    console.log(event.target.value);
    const getData = async () => {
      const placeData = await getPlaceByCategory(event.target.value);
      setPlace(placeData);
    };
    getData();
  }

  function nameSearch(event) {
    let newData = [];
    if (place) {
      newData = place.filter((data) => {
        return (
          data.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
    }
    if (event.target.value === '') {
      const getData = async () => {
        const placeData = await getAllPlaces();
        setPlace(placeData);
      };
      getData();
    }
    console.log(event.target.value);
    setPlace(newData);
  }

  if (place) {
    return (
      <>
        <h1 className='title'>What are we calling this?</h1>
        <select name='categories' onChange={getCategories}>
          <option value='arts/culture'>Arts/Culture</option>
          <option value='shopping'>Shopping</option>
          <option value='outdoors'>Outdoors</option>
          <option value='entertainment'>Entertainment</option>
          <option value='food/drink'>Food/Drink</option>
        </select>
        <div className='field'>
          <label className='label'>Search by name</label>
          <input
            type='text'
            onChange={nameSearch}
            value={place.name}
            placeholder=''
          />
        </div>

        <div className='container'>
          <div className='columns'>
            {place.map((place) => (
              <div key={place._id} className='column card m-6'>
                <Link to={`/places/${place._id}`}>
                  <h2 className='title'>{place.name}</h2>
                  <figure className='image'>
                    <img src={place.image} alt={place.name} />
                  </figure>
                </Link>
                <p>
                  Nearest station: <strong>{place.stationName}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return <p className='loading'>Loading...</p>;
  }
};

export default SearchPage;
