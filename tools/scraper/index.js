const axios = require('axios');

async function fetchFromUrl(url, options = {}) {
  const defaultOptions = {
    timeout: 10000,
    headers: { 'User-Agent': 'Mozilla/5.0' },
    ...options
  };
  
  const response = await axios.get(url, defaultOptions);
  return response.data;
}

async function fetchJSON(url) {
  const response = await axios.get(url);
  return response.data;
}

async function postToAPI(url, data, headers = {}) {
  const response = await axios.post(url, data, {
    headers: { 'Content-Type': 'application/json', ...headers }
  });
  return response.data;
}

module.exports = {
  fetchFromUrl,
  fetchJSON,
  postToAPI
};
