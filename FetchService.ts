import fetch from 'node-fetch';

const functions = {
  getSmhiTimes: getSmhiTimes
}

function getSmhiTimes() {
  const url = 'https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/validtime.json';

  const promise = fetch(url);
  return promise
    .then(res => res.json())
    .catch(err => console.log(`error: ${err}`))
};

export const fetchService = functions;
