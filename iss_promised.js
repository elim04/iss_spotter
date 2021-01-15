//iss_promised.js

const request = require('request-promise-native');


const fetchMyIP = function() {
  //returning a promise of request for ip data, returned as a JSON string
  return request('https://api.ipify.org?format=json');
  
};

const fetchCoordsByIP = function(body) {
  
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);

};

const fetchISSFlyOverTimes = function(body) {

    const data = JSON.parse(body);
    const latitude = data.latitude;
    const longitude = data.longitude;

    const coordsObj = {
      latitude,
      longitude
    }
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coordsObj.latitude}&lon=${coordsObj.longitude}`);
  
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
    const {response} = JSON.parse(data);
    return response;
  });
};

module.exports = { nextISSTimesForMyLocation };

