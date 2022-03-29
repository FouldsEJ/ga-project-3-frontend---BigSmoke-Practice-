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

  const { data } = await axios.request(options);
  return data;
};

export const deleteReview = async (placeId, reviewId) => {
  const options = {
    method: 'DELETE',
    url: `/api/places/${placeId}/reviews/${reviewId}`,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};

export const editReview = async (placeId, reviewId, review) => {
  const options = {
    method: 'PUT',
    url: `/api/places/${placeId}/reviews/${reviewId}`,
    data: review,
    headers: {
      authorization: `Bearer ${window.sessionStorage.getItem('token')}`,
    },
  };

  const { data } = await axios.request(options);
  return data;
};
