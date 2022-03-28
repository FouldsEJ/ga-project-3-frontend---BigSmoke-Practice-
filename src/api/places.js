import axios from 'axios';

export const getPopular = async () => {
  const options = {
    method: 'GET',
    url: '/api/places/popular',
  };
  const { data } = await axios.request(options);
  return data;
};

export const getAllPlaces = async () => {
  const options = {
    method: 'GET',
    url: '/api/places',
  };
  const { data } = await axios.request(options);

  return data;
};

export const getPlaceById = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/places/${id}`,
  };

  const { data } = await axios.request(options);

  return data;
};

export const createPlace = async (place) => {
  const options = {
    method: 'POST',
    url: `/api/places`,
    data: place,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);

  return data;
};

export const getPlaceByCategory = async (category) => {
  const options = {
    method: 'GET',
    url: `/places/categories?category=${category}`,
  };
  const { data } = await axios.request(options);

  return data;
};
