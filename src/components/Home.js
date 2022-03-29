import React, { useEffect, useState } from 'react';
import { getPopular } from '../api/places';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import PlaceCard from './placeCard';
import Popup from './Popup';
import { Link } from 'react-router-dom';

function Home() {
  const [popular, setPopular] = useState([]);
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000);
  }, []);

  React.useEffect(() => {
    const getData = async () => {
      const places = await getPopular();
      setPopular(places);
    };
    getData();
  }, []);
  console.log('popular places are', popular);

  return (
    <>
      <main>
        <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
          {' '}
          <h2> Hi there! </h2>
          <p>What are your plans today?</p>
          <hr />
          <p>
            {' '}
            <Link to="/explore">Click here for some ideas.</Link>
          </p>
        </Popup>
        <section className="hero is-medium is-light">
          <div className="hero-head ">
            <a>
              <img src="https://wallpaperaccess.com/full/204300.jpg" />
            </a>
          </div>
        </section>
        <section className="hero is-medium is-light" id="hero-text">
          <div className="container is-max-widescreen">
            <h3 className="title"> Welcome to London!</h3>

            <h2 className="block">
              Discover the best of London with Visit London, the independent
              guide to England’s exciting capital. Find things to do in London,
              from iconic sightseeing spots and fun-filled days out to top
              restaurants, theatre and unmissable London events. If you’re not
              able to visit just yet, plan ahead to make the most of your next
              visit.
            </h2>
          </div>
        </section>

        <section className="hero is-halfheight is-light">
          <div className="hero-body ">
            <div className="container">
              <p className="title">Most popular</p>
              <Splide
                options={{
                  perPage: 3,
                  rewind: true,
                  arrows: true,
                  pagination: false,
                  drag: 'free',
                  gap: '5px',
                }}
              >
                {popular ? (
                  popular.map((place) => (
                    <SplideSlide key={place._id}>
                      <PlaceCard key={place._id} {...place} />
                    </SplideSlide>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </Splide>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
