import axios from 'axios';

export const registerUser = async (user) => {
  const options = {
    method: 'POST',
    url: '/api/register',
    data: user
  };
  const { data } = await axios.request(options);

  return data;
};

export const loginUser = async (credentials) => {
  const options = {
    method: 'POST',
    url: '/api/login',
    data: credentials
  };

  const { data } = await axios.request(options);
  if (data.token) {
    window.sessionStorage.setItem('token', data.token);
  } else {
    window.sessionStorage.removeItem('token');
  }
  console.log('login data', data);
  return data;
};

//export const getImage = async (userId) => {
//  const options = {
//    method: 'GET',
//    url: `/api/user?user=${userId}`
//  };
//  const { data } = await axios.request(options);
//  return data;
//};

export const getAllUsers = async () => {
  const options = {
    method: 'GET',
    url: `/api/users`
  };
  const { data } = await axios.request(options);
  return data;
};

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`/api/user/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//export const postImage = async (image) => {
//  try {
//    const { data } = await axios.post('/api/images', image);
//    console.log(data);
//  } catch (err) {
//    console.log(err);
//  }
//};
