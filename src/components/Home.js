import React, { useState } from 'react';
import { getPopular } from '../api/places';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import PlaceCard from './placeCard';

function Home() {
  const [popular, setPopular] = useState([]);

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
      <section className='hero is-halfheight is-light'>
        <div className='hero-head '>
          <a>
            <img src='https://wallpaperaccess.com/full/204300.jpg' />
          </a>
        </div>
      </section>

      <section className='hero is-halfheight is-light'>
        <div className='hero-body '>
          <div className='container'>
            <p className='title'>Most popular</p>
            <Splide
              options={{
                perPage: 3,
                rewind: true,
                arrows: true,
                pagination: false,
                drag: 'free',
                gap: '5px'
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
    </>
  );
}

export default Home;
