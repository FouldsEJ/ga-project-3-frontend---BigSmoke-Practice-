import React from 'react';
import { getAllStations, getPlaceBySearch } from '../api/places.js';
import PlaceCard from './PlaceCard.js';
import MapSearch from './MapSearch.js';
const SearchPage = () => {
  const [allPlaces, setAllPlaces] = React.useState(null);
  const [allStations, setAllStations] = React.useState(null);
  const [searchCriteria, setSearchCriteria] = React.useState({
    name: '',
    category: '',
    stationName: ''
  });

  React.useEffect(() => {
    const getData = async () => {
      try {
        console.log(searchCriteria.category);
        const placeData = await getPlaceBySearch(
          searchCriteria.name,
          searchCriteria.category,
          searchCriteria.stationName
        );
        console.log('PLACE DATA: ', placeData);
        setAllPlaces(placeData);
        const stationData = await getAllStations();
        setAllStations(stationData);
      } catch (err) {
        console.log('get all places error: ', err);
      }
    };
    getData();
  }, [searchCriteria]);

  function handleSearch(event) {
    setSearchCriteria({
      ...searchCriteria,
      [event.target.name]: event.target.value
    });
  }

  return (
    <>
      <section className='search-section'>
        <div className='section has-text-centered p-0 '>
          <h1 className='title'>Explore London</h1>
          <div className='container'>
            <div className='columns mb-3 is-centered'>
              <div className='column is-3'>
                <div className='field'>
                  <label className='label'>Search Keyword</label>
                  <p className='control has-icons-left'>
                    <input
                      name='name'
                      type='text'
                      onChange={handleSearch}
                      placeholder='Search'
                      className='input is-info is-rounded'
                    />
                    <span className='icon is-left'>
                      <i className='fas fa-search'></i>
                    </span>
                  </p>
                </div>
              </div>
              <div className='column is-3'>
                <div className='field'>
                  <label className='label'>Category</label>
                  <span className='select'>
                    <select
                      name='category'
                      onChange={handleSearch}
                      className='input is-info is-rounded'
                    >
                      <option value=''>All</option>
                      <option value='Arts/Culture'>Arts/Culture</option>
                      <option value='Shopping'>Shopping</option>
                      <option value='Outdoors'>Outdoors</option>
                      <option value='Entertainment'>Entertainment</option>
                      <option value='Food/drink'>Food/Drink</option>
                    </select>
                  </span>
                </div>
              </div>

              <div className='column is-3'>
                <div className='field'>
                  <label className='label'>nearby stations</label>
                  <span className='select'>
                    {!allStations ? (
                      <p>Loading stations...</p>
                    ) : (
                      <select
                        name='stationName'
                        className='input is-info is-rounded'
                        onChange={handleSearch}
                      >
                        <option value=''>All</option>
                        {allStations.map((station) => (
                          <option key={station._id} value={station.name}>
                            {station.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr id='search-page-line' />
        <div className='section search-display-wrapper'>
          {!allPlaces ? (
            <p>Loading ..</p>
          ) : (
            <>
              <div className='columns'>
                <div className='column '>
                  <div className='columns is-multiline scroll'>
                    {allPlaces.map((place) => (
                      <div
                        className='column is-one-third-desktop is-half-tablet is-one-mobile mt-6 placecard'
                        key={place._id}
                      >
                        <PlaceCard {...place} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className='column is-6'>
                  <div className='map-search'>
                    <MapSearch filteredPlace={allPlaces} />
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
