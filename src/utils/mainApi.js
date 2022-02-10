import { baseURL } from "./constants";

const checkServerResponse = item => item.ok ? item.json() : Promise.reject(item.status);

export function getUsers() {
  return fetch(`${baseURL}/api/v1/users/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`
    },
  })
  .then(res => checkServerResponse(res))
}

export function signIn({ username, password }) {
  return fetch(`${baseURL}/api-token-auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  .then(res => checkServerResponse(res))
}