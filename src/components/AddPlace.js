import React from 'react';
import { getAllStations } from '../api/places.js';
import { createPlace } from '../api/places.js';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

function AddPlace() {
  const [stations, setStations] = React.useState(null);
  const [createdPage, setCreatedPage] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const Data = await getAllStations();
        const names = Data.map((station) => {
          return station.name;
        });
        setStations(names);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const [place, setPlace] = React.useState({
    name: '',
    description: '',
    category: [],
    image: '',
    lat: '',
    long: '',
    openingTimes: '',
    contact: '',
    stationName: ''
  });

  const categories = [
    { name: 'entertainment', index: 0 },
    { name: 'shopping', index: 1 },
    { name: 'arts/culture', index: 2 },
    { name: 'outdoors', index: 3 },
    { name: 'food/drink', index: 4 }
  ];
  const [isChecked, setIsChecked] = React.useState(
    new Array(categories.length).fill(false)
  );

  function handleSubmit(event) {
    event.preventDefault();

    const getData = async () => {
      try {
        await createPlace(place);
        console.log('Created: ', place);
        setCreatedPage('New place created!');
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }

  function handleChange(event) {
    setPlace({ ...place, [event.target.name]: event.target.value });
    console.log(place);
  }

  function checkBox(name, position) {
    if (place.category.includes(name)) {
      const newPlace = place;
      const numberInArray = newPlace.category.indexOf(name);
      newPlace.category.splice(numberInArray, 1);
      setPlace(newPlace);
      console.log(place);
      setIsChecked({ ...isChecked, [position]: false });
    } else {
      const newPlace = place;
      newPlace.category.push(name);
      setPlace(newPlace);
      console.log(place);
      setIsChecked({ ...isChecked, [position]: true });
    }
  }
  function onDropdown(event) {
    const newPlace = place;
    newPlace.stationName = event.value;
    setPlace(newPlace);
  }

  return (
    <div className='container has-text-centered place-box'>
      <h1 className='title'>Add Place</h1>
      <form
        className='column is-half is-offset-one-quarter box addplacebox'
        onSubmit={handleSubmit}
      >
        <div className='field name'>
          <label className='label addPlacelabel'>Name</label>
          <div className='control'>
            <input
              className='input'
              placeholder='Name'
              name='name'
              onChange={handleChange}
              value={place.name.value}
            />
          </div>
        </div>
        <div className='field description'>
          <label className='label addPlacelabel'>Description</label>
          <div className='control'>
            <textarea
              className='input'
              placeholder='description'
              name='description'
              onChange={handleChange}
              value={place.description.value}
            />
          </div>
        </div>

        <div name='categories field'>
          <label className='label addPlacelabel'>Categories</label>
          <div className='is-flex category'>
            {categories.map((category) => {
              return (
                <div key={category.name} className='categoryboxes'>
                  <input
                    type='checkbox'
                    id={category.name}
                    onChange={() => checkBox(category.name, category.index)}
                    checked={isChecked[category.index]}
                  />
                  <label htmlFor={category.name}>{category.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <div className='field image'>
          <label className='label addPlacelabel'>Image Url</label>
          <div className='control'>
            <input
              className='input'
              placeholder='image'
              name='image'
              onChange={handleChange}
              value={place.image.value}
            />
          </div>
        </div>
        <div className='field coordinates'>
          <label className='label addPlacelabel'>Coordinates</label>
          <div className='is-flex coordinates-box'>
            <div className='control'>
              <label>Lat</label>
              <input
                type='number'
                className='input'
                placeholder='lat'
                name='lat'
                onChange={handleChange}
                value={place.lat.value}
              />
            </div>
            <div className='control'>
              <label>Long</label>
              <input
                type='number'
                className='input'
                placeholder='long'
                name='long'
                onChange={handleChange}
                value={place.long.value}
              />
            </div>
          </div>
        </div>

        <div className='field openingTimes'>
          <label className='label addPlacelabel'>Opening Times</label>
          <div className='control'>
            <input
              className='input'
              placeholder='opening times'
              name='openingTimes'
              onChange={handleChange}
              value={place.openingTimes.value}
            />
          </div>
        </div>

        <div className='field contact'>
          <label className='label addPlacelabel'>Contact</label>
          <div className='control'>
            <input
              className='input'
              placeholder='contact'
              name='contact'
              onChange={handleChange}
              value={place.contact.value}
            />
          </div>
        </div>
        <div name='stationName field'>
          <label className='label addPlacelabel'>Station Name</label>

          {!stations ? (
            <p>Boarding trains...</p>
          ) : (
            <Dropdown
              options={stations}
              onChange={onDropdown}
              value={''}
              placeholder='Select an option'
            />
          )}
        </div>
        <div className='place-submit'>
          <input type='submit' className='button' />
        </div>
      </form>
      <p>{createdPage}</p>
    </div>
  );
}

export default AddPlace;
