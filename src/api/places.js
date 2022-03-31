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
    url: '/api/places',
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
    url: `/api/places/categories?category=${category}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const getPlaceBySearch = async (text, category, station) => {
  console.log('API DATA: ', text, category, station);
  const options = {
    method: 'GET',
    url: `api/places/search?text=${text}&category=${category}&station=${station}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const getAllStations = async () => {
  const options = {
    method: 'GET',
    url: '/api/stations',
  };
  const { data } = await axios.request(options);
  return data;
};

export const addLike = async (id) => {
  const options = {
    method: 'POST',
    url: `/api/places/${id}/likes`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const removeLike = async (id) => {
  const options = {
    method: 'DELETE',
    url: `/api/places/${id}/likes`,
  };

  const { data } = await axios.request(options);
  return data;
};

export const addToItenerary = async (id) => {
  const options = {
    method: 'POST',
    url: `/api/places/${id}/itenerary`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export const removeFromItenerary = async (id) => {
  const options = {
    method: 'DELETE',
    url: `/api/places/${id}/itenerary`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const getPlacesLiked = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/places/likes?likes=${id}`,
  };
  const { data } = await axios.request(options);

  return data;
};

export const getItinerary = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/places/itenerary?itenerary=${id}`,
  };
  const { data } = await axios.request(options);

  return data;
};
