import axios from 'axios';

export const getPlaceById = async (id) => {
  const options = {
    method: 'GET',
    url: `/api/places/${id}`,
  };
  const { data } = await axios.request(options);

  return data;
};
