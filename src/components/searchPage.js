import React from 'react';
import { getAllPlaces } from '../api/places.js';
import { getPlaceByCategory } from '../api/places.js';
import PlaceCard from './PlaceCard.js';
import MapSearch from './MapSearch.js';

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
        setCategories(placeData);
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
      <section className="search-section">
        <div className="section has-text-centered p-0 ">
          <h1 className="title">Explore London</h1>
          <div className="container">
            <div className="columns mb-3 is-centered">
              <div className="column is-2">
                <div className="field">
                  <label className="label">Search Keyword</label>
                  <p className="control has-icons-left">
                    <input
                      type="text"
                      onChange={nameSearch}
                      placeholder="Search"
                      className="input is-info is-rounded"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>

              <div className="column is-2">
                <div className="field">
                  <label className="label">Category</label>
                  <span className="select">
                    <select
                      name="categories"
                      onChange={getCategories}
                      className="input is-info is-rounded"
                    >
                      <option value="all">All</option>
                      <option value="arts/culture">Arts/Culture</option>
                      <option value="shopping">Shopping</option>
                      <option value="outdoors">Outdoors</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="food/drink">Food/Drink</option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr id="search-page-line" />

        <div className="section search-display-wrapper">
          {!filteredPlace ? (
            <p>Loading ..</p>
          ) : (
            <>
              <div className="columns">
                <div className="column ">
                  <div className="columns is-multiline scroll">
                    {filteredPlace.map((place) => (
                      <div
                        className="column is-one-third-desktop is-half-tablet is-one-mobile mt-6 placecard"
                        key={place._id}
                      >
                        <PlaceCard {...place} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="column is-6">
                  <div className="map-search">
                    <MapSearch filteredPlace={filteredPlace} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchPage;
