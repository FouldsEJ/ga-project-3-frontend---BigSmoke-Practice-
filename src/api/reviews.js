import axios from 'axios';

export const createReview = async (id, review) => {
  const options = {
    method: 'POST',
    url: `/api/places/${id}/reviews`,
    data: review,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = axios.request(options);
  return data;
};
