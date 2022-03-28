import axios from 'axios';

export const getPopular = async () => {
  const options = {
    method: 'GET',
    url: '/api/places/popular',
  };
  const { data } = await axios.request(options);
  return data;
};
