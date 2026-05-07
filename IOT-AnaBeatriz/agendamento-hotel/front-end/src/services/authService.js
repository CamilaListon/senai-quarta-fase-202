import api from '../api/api.js';

/*
==================================================
LOGIN
==================================================
*/

export async function loginRequest(data) {

  const response = await api.post(
    '/auth/login',
    data
  );

  return response.data;

}

/*
==================================================
CADASTRO
==================================================
*/

export async function registerRequest(data) {

  const response = await api.post(
    '/auth/register',
    data
  );

  return response.data;

}