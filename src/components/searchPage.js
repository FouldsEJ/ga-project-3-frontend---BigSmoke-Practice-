import React from 'react';
import { getAllPlaces } from '../api/places.js';
import { getPlaceByCategory } from '../api/places.js';
import PlaceCard from './placeCard.js';

const SearchPage = () => {
  const [allPlaces, setAllPlaces] = React.useState(null);
  const [filteredPlace, setFilteredPlace] = React.useState(null);
  const [categories, setCategories] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const placeData = await getAllPlaces();
        setAllPlaces(placeData);
        setFilteredPlace(placeData);
      } catch (err) {
        console.log('get all places error: ', err);
      }
    };
    getData();
  }, []);

  function getCategories(event) {
    if (event.target.value === 'all') {
      setCategories(allPlaces);
      setFilteredPlace(allPlaces);
    } else {
      const getData = async () => {
        try {
          const placeData = await getPlaceByCategory(event.target.value);
          setCategories(placeData);
          setFilteredPlace(placeData);
        } catch (err) {
          console.log('get categories error: ', err);
        }
      };
      getData();
    }
  }

  function nameSearch(event) {
    let newData = [];
    if (filteredPlace) {
      newData = categories.filter((data) => {
        return (
          data.name.toLowerCase().search(event.target.value.toLowerCase()) !==
          -1
        );
      });
      setFilteredPlace(newData);
      console.log(filteredPlace);
    }
  }

  return (
    <>
      <h1 className='title'>What are we calling this?</h1>
      <select name='categories' onChange={getCategories}>
        <option value='all'>All</option>
        <option value='arts/culture'>Arts/Culture</option>
        <option value='shopping'>Shopping</option>
        <option value='outdoors'>Outdoors</option>
        <option value='entertainment'>Entertainment</option>
        <option value='food/drink'>Food/Drink</option>
      </select>

      <div className='field'>
        <label className='label'>Search by name</label>
        <input type='text' onChange={nameSearch} placeholder='' />
      </div>

      <div>
        {!filteredPlace ? (
          <p>Loading ..</p>
        ) : (
          <div className='container'>
            <div className='columns is-multiline'>
              {filteredPlace.map((place) => (
                <PlaceCard key={place._id} className='column' {...place} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
