import { baseURL } from "./constants";

const checkServerResponse = item => item.ok ? item.json() : Promise.reject(item.status);

export function getUsers() {
  return fetch(`${baseURL}/api/v1/users/`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('emphaToken')}`
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

export function createUser({ username, first_name, last_name, password, is_active = true }) {
  return fetch(`${baseURL}/api/v1/users/`, {
    method:'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('emphaToken')}`
    },
    body: JSON.stringify({
      username,
      first_name,
      last_name, 
      is_active,
      password,
    }),
  })
  .then(res => checkServerResponse(res))
}

export function deleteUser(id) {
  return fetch(`${baseURL}/api/v1/users/${id}/`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('emphaToken')}`
    },
  })
  .then((res) => res.ok ? Promise.resolve(res) : Promise.reject(res.status))
}

export function updateUser({username, first_name, last_name, password, is_active = true, id}) {
  return fetch(`${baseURL}/api/v1/users/${id}/`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem('emphaToken')}`
    },
    body: JSON.stringify({
      username,
      first_name,
      last_name, 
      is_active,
      password,
    })
  })
  .then(res => checkServerResponse(res))
}